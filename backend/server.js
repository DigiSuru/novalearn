const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const PDFDocument = require('pdfkit'); // NEW: For Certificates
const Stripe = require('stripe');      // NEW: For Payments
require('dotenv').config();

const db = require('./config/db');
const verifyToken = require('./middleware/authMiddleware');
const isAdmin = require('./middleware/adminMiddleware');

// Initialize Stripe (Fallback to mock key for local testing if env variable is missing)
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

const app = express();

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Multer Configuration (Now allows MP4 Video files) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// ==========================================
// 1. PUBLIC PLATFORM APIs
// ==========================================

app.get('/api/courses', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM courses");
        res.json({ success: true, data: rows });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.get('/api/courses/:id', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM courses WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ success: false, message: "Not found" });
        res.json({ success: true, data: rows[0] });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.get('/api/courses/:id/notes', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM notes WHERE course_id = ? ORDER BY semester ASC", [req.params.id]);
        res.json({ success: true, data: rows });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.get('/api/courses/:id/quizzes', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM quizzes WHERE course_id = ? ORDER BY semester ASC", [req.params.id]);
        res.json({ success: true, data: rows });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.get('/api/search', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.json({ success: true, data: [] });
        const [rows] = await db.query(
            `SELECT notes.*, courses.short_name FROM notes 
             JOIN courses ON notes.course_id = courses.id 
             WHERE subject_name LIKE ? OR short_name LIKE ? LIMIT 10`,
            [`%${query}%`, `%${query}%`]
        );
        res.json({ success: true, data: rows });
    } catch (error) { res.status(500).json({ success: false }); }
});

// ==========================================
// 2. AUTHENTICATION & IDENTITY
// ==========================================

app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const [exists] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
        if (exists.length > 0) return res.status(400).json({ success: false, message: "Email already registered." });
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
        res.json({ success: true, message: "Account created successfully!" });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length === 0) return res.status(401).json({ success: false, message: "Invalid credentials." });
        
        const match = await bcrypt.compare(password, users[0].password);
        if (!match) return res.status(401).json({ success: false, message: "Invalid credentials." });
        
        const user = users[0];
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        res.json({ 
            success: true, 
            token, 
            user: { 
                id: user.id, name: user.name, email: user.email, role: user.role, 
                is_pro: user.is_pro, profile_photo_url: user.profile_photo_url, 
                bio: user.bio, phone: user.phone
            } 
        });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.post('/api/auth/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const [users] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
        if (users.length === 0) return res.status(404).json({ success: false, message: "No account found with that email." });
        
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        await db.query("UPDATE users SET reset_token = ?, reset_expiry = DATE_ADD(NOW(), INTERVAL 15 MINUTE) WHERE email = ?", [resetCode, email]);
        
        res.json({ success: true, message: "Recovery code generated.", mockCode: resetCode });
    } catch (error) { res.status(500).json({ success: false, message: "Server error." }); }
});

app.post('/api/auth/reset-password', async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;
        const [users] = await db.query("SELECT id FROM users WHERE email = ? AND reset_token = ? AND reset_expiry > NOW()", [email, code]);
        
        if (users.length === 0) return res.status(400).json({ success: false, message: "Invalid or expired recovery code." });
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.query("UPDATE users SET password = ?, reset_token = NULL, reset_expiry = NULL WHERE email = ?", [hashedPassword, email]);
        
        res.json({ success: true, message: "Password updated successfully!" });
    } catch (error) { res.status(500).json({ success: false, message: "Server error." }); }
});

// ==========================================
// 3. STUDENT WORKSPACE, PROGRESS & LEADERBOARD
// ==========================================

app.put('/api/user/profile', verifyToken, upload.single('profile_photo'), async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, bio, phone } = req.body;
        let updateFields = [], queryParams = [];

        if (name) { updateFields.push("name = ?"); queryParams.push(name); }
        if (bio !== undefined) { updateFields.push("bio = ?"); queryParams.push(bio); }
        if (phone !== undefined) { updateFields.push("phone = ?"); queryParams.push(phone); }
        if (req.file) {
            updateFields.push("profile_photo_url = ?");
            queryParams.push(`http://localhost:5000/uploads/${req.file.filename}`);
        }

        if (updateFields.length > 0) {
            queryParams.push(userId);
            await db.query(`UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`, queryParams);
        }

        const [users] = await db.query("SELECT id, name, email, role, is_pro, profile_photo_url, bio, phone FROM users WHERE id = ?", [userId]);
        res.json({ success: true, user: users[0] });
    } catch (error) { res.status(500).json({ success: false }); }
});

// LEGACY MOCK UPGRADE (Kept for fallback)
app.post('/api/user/upgrade', verifyToken, async (req, res) => {
    try {
        await db.query("UPDATE users SET is_pro = TRUE, pro_expiry = DATE_ADD(NOW(), INTERVAL 1 YEAR) WHERE id = ?", [req.user.id]);
        const [users] = await db.query("SELECT id, name, email, role, is_pro FROM users WHERE id = ?", [req.user.id]);
        res.json({ success: true, user: users[0] });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.post('/api/courses/:id/enroll', verifyToken, async (req, res) => {
    try {
        await db.query("INSERT IGNORE INTO enrollments (user_id, course_id) VALUES (?, ?)", [req.user.id, req.params.id]);
        res.json({ success: true });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.get('/api/user/enrollments', verifyToken, async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT courses.* FROM enrollments JOIN courses ON enrollments.course_id = courses.id WHERE user_id = ?`, [req.user.id]);
        res.json({ success: true, data: rows });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.get('/api/user/stats', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const [count] = await db.query("SELECT COUNT(*) as total FROM user_progress WHERE user_id = ?", [userId]);
        const [quizScores] = await db.query(`
            SELECT SUM(max_score) as total_correct FROM (
                SELECT MAX(score) as max_score FROM quiz_results WHERE user_id = ? GROUP BY quiz_id
            ) as qs
        `, [userId]);
        const [recent] = await db.query(`
            SELECT notes.subject_name, courses.short_name, user_progress.accessed_at
            FROM user_progress JOIN notes ON user_progress.note_id = notes.id JOIN courses ON notes.course_id = courses.id
            WHERE user_id = ? ORDER BY accessed_at DESC LIMIT 5`, [userId]);
            
        res.json({ success: true, stats: { totalDownloaded: count[0].total, totalCorrectAnswers: quizScores[0].total_correct || 0, recent } });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.post('/api/user/progress/:noteId', verifyToken, async (req, res) => {
    try {
        const [note] = await db.query("SELECT is_pro FROM notes WHERE id = ?", [req.params.noteId]);
        const [user] = await db.query("SELECT is_pro, role FROM users WHERE id = ?", [req.user.id]);
        
        if (note[0]?.is_pro && !user[0]?.is_pro && user[0]?.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Subscription required for Pro Material." });
        }
        
        await db.query("INSERT IGNORE INTO user_progress (user_id, note_id) VALUES (?, ?)", [req.user.id, req.params.noteId]);
        res.json({ success: true });
    } catch (error) { res.status(500).json({ success: false }); }
});

// FEATURE 2: RECORD VIDEO PROGRESS
app.post('/api/user/video-progress/:noteId', verifyToken, async (req, res) => {
    try {
        const { progress_percent } = req.body;
        // Insert progress or update it if the new percentage is higher
        await db.query(`
            INSERT INTO user_progress (user_id, note_id, watch_percent)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE watch_percent = GREATEST(watch_percent, ?)
        `, [req.user.id, req.params.noteId, progress_percent, progress_percent]);
        
        res.json({ success: true });
    } catch (error) { 
        console.error(error);
        res.status(500).json({ success: false }); 
    }
});

app.get('/api/leaderboard', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT u.id, u.name, u.is_pro, u.profile_photo_url,
                (COALESCE((SELECT SUM(max_score) * 100 FROM (SELECT user_id, MAX(score) as max_score FROM quiz_results GROUP BY user_id, quiz_id) AS qr WHERE qr.user_id = u.id), 0) +
                 COALESCE((SELECT COUNT(*) * 50 FROM user_progress WHERE user_id = u.id), 0)) AS xp,
                FLOOR((COALESCE((SELECT SUM(max_score) * 100 FROM (SELECT user_id, MAX(score) as max_score FROM quiz_results GROUP BY user_id, quiz_id) AS qr WHERE qr.user_id = u.id), 0) +
                 COALESCE((SELECT COUNT(*) * 50 FROM user_progress WHERE user_id = u.id), 0)) / 500) + 1 AS level
            FROM users u WHERE u.role = 'student' ORDER BY xp DESC, u.created_at ASC LIMIT 50;
        `);
        res.json({ success: true, data: rows });
    } catch (error) { res.status(500).json({ success: false }); }
});

// ==========================================
// 4. COMMUNITY & ASSESSMENTS
// ==========================================

app.get('/api/courses/:id/discussions', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT discussions.*, users.name, users.role 
            FROM discussions JOIN users ON discussions.user_id = users.id 
            WHERE course_id = ? ORDER BY created_at DESC LIMIT 50`, [req.params.id]);
        res.json({ success: true, data: rows });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.post('/api/courses/:id/discussions', verifyToken, async (req, res) => {
    try {
        await db.query("INSERT INTO discussions (course_id, user_id, message) VALUES (?, ?, ?)", [req.params.id, req.user.id, req.body.message]);
        res.json({ success: true });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.get('/api/quizzes/:id', verifyToken, async (req, res) => {
    try {
        const [quiz] = await db.query("SELECT * FROM quizzes WHERE id = ?", [req.params.id]);
        const [questions] = await db.query("SELECT id, question_text, option_a, option_b, option_c, option_d FROM questions WHERE quiz_id = ?", [req.params.id]);
        if (quiz.length === 0) return res.status(404).json({ success: false });
        res.json({ success: true, quiz: quiz[0], questions });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.post('/api/quizzes/:id/submit', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id, quizId = req.params.id, { answers } = req.body;
        const [questions] = await db.query("SELECT id, correct_option FROM questions WHERE quiz_id = ?", [quizId]);
        let score = 0;
        questions.forEach(q => { if (answers[q.id] === q.correct_option) score++; });
        
        const passMark = questions.length / 2;
        const status = score >= passMark ? 'Passed' : 'Failed';
        const [prevAttempts] = await db.query("SELECT COUNT(*) as count FROM quiz_results WHERE user_id = ? AND quiz_id = ?", [userId, quizId]);
        const attemptNumber = prevAttempts[0].count + 1;
        
        await db.query("INSERT INTO quiz_results (user_id, quiz_id, score, total_questions, attempt_number, status) VALUES (?, ?, ?, ?, ?, ?)", 
            [userId, quizId, score, questions.length, attemptNumber, status]);
        
        res.json({ success: true, score, total: questions.length, attempt: attemptNumber, status });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.get('/api/user/assessments/history', verifyToken, async (req, res) => {
    try {
        const [history] = await db.query(`
            SELECT qr.*, q.title, c.course_name FROM quiz_results qr
            JOIN quizzes q ON qr.quiz_id = q.id JOIN courses c ON q.course_id = c.id
            WHERE qr.user_id = ? ORDER BY qr.completed_at DESC
        `, [req.user.id]);
        res.json({ success: true, data: history });
    } catch (error) { res.status(500).json({ success: false }); }
});

// ==========================================
// 5. NEW ADVANCED FEATURES: STRIPE & CERTIFICATES
// ==========================================

// FEATURE 1: STRIPE PAYMENTS
app.post('/api/payments/create-checkout-session', verifyToken, async (req, res) => {
    try {
        // If no real stripe key is set, we return a mock session for local testing
        if (!process.env.STRIPE_SECRET_KEY) {
            return res.json({ success: true, sessionId: 'mock_session_123', url: '/pricing?success=true' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: { name: 'NovaLearn Pro Elite - 1 Year' },
                    unit_amount: 49900, // Amount in paise (₹499.00)
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `http://localhost:5173/pricing?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:5173/pricing?canceled=true`,
            client_reference_id: req.user.id.toString()
        });

        res.json({ success: true, sessionId: session.id, url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Payment checkout failed" });
    }
});

app.post('/api/payments/verify', verifyToken, async (req, res) => {
    try {
        const { session_id } = req.body;
        
        // In production: Verify session_id with Stripe. For now, we grant access if hit.
        await db.query("UPDATE users SET is_pro = TRUE, pro_expiry = DATE_ADD(NOW(), INTERVAL 1 YEAR) WHERE id = ?", [req.user.id]);
        const [users] = await db.query("SELECT id, name, email, role, is_pro FROM users WHERE id = ?", [req.user.id]);
        
        res.json({ success: true, user: users[0] });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

// FEATURE 3: PDF CERTIFICATE GENERATION
app.post('/api/courses/:id/certificate', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const courseId = req.params.id;

        // Verify the user exists and the course exists
        const [users] = await db.query("SELECT name FROM users WHERE id = ?", [userId]);
        const [courses] = await db.query("SELECT course_name FROM courses WHERE id = ?", [courseId]);

        if (!users.length || !courses.length) return res.status(404).json({ message: "Data not found" });

        // Record certificate generation in DB (Optional tracking)
        await db.query("INSERT IGNORE INTO certificates (user_id, course_id) VALUES (?, ?)", [userId, courseId]);

        // Generate PDF on the fly
        const doc = new PDFDocument({ layout: 'landscape', size: 'A4' });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Certificate_${courseId}.pdf`);
        doc.pipe(res);

        // Draw Certificate Layout
        doc.rect(0, 0, doc.page.width, doc.page.height).fill('#ffffff');
        
        // Add a beautiful border
        doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).strokeColor('#1d4ed8').lineWidth(4).stroke();

        doc.moveDown(3);
        doc.fontSize(50).fillColor('#1e3a8a').text('Certificate of Achievement', { align: 'center' });
        doc.moveDown();
        doc.fontSize(20).fillColor('#374151').text('This is proudly presented to', { align: 'center' });
        doc.moveDown();
        
        // Student Name
        doc.fontSize(40).fillColor('#111827').text(users[0].name, { align: 'center', underline: true });
        doc.moveDown();
        
        doc.fontSize(20).fillColor('#6b7280').text(`For successfully mastering the curriculum of`, { align: 'center' });
        doc.moveDown();
        
        // Course Name
        doc.fontSize(30).fillColor('#1d4ed8').text(courses[0].course_name, { align: 'center' });
        doc.moveDown(3);
        
        doc.fontSize(15).fillColor('#9ca3af').text(`Issued on: ${new Date().toLocaleDateString()}`, { align: 'center' });
        doc.fontSize(15).fillColor('#9ca3af').text(`NovaLearn Academic Validation System`, { align: 'center' });

        doc.end(); // Finalize PDF
    } catch (err) {
        console.error(err);
        res.status(500).send("Error generating certificate");
    }
});

// ==========================================
// 6. ADMIN CMS
// ==========================================

app.get('/api/admin/system-stats', verifyToken, isAdmin, async (req, res) => {
    try {
        const [u] = await db.query("SELECT COUNT(*) as t FROM users WHERE role = 'student'");
        const [n] = await db.query("SELECT COUNT(*) as t FROM notes");
        const [d] = await db.query("SELECT COUNT(*) as t FROM user_progress");
        const [r] = await db.query("SELECT name, email, created_at, role, is_pro FROM users ORDER BY created_at DESC LIMIT 15");
        res.json({ success: true, stats: { totalStudents: u[0].t, totalNotes: n[0].t, totalDownloads: d[0].t, recentRegistrations: r } });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.get('/api/admin/users', verifyToken, isAdmin, async (req, res) => {
    try {
        const [users] = await db.query("SELECT id, name, email, role, is_pro, created_at FROM users ORDER BY created_at DESC");
        res.json({ success: true, data: users });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.put('/api/admin/users/:id/role', verifyToken, isAdmin, async (req, res) => {
    try {
        await db.query("UPDATE users SET role = ? WHERE id = ?", [req.body.role, req.params.id]);
        res.json({ success: true });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.post('/api/courses', verifyToken, isAdmin, async (req, res) => {
    try {
        await db.query("INSERT INTO courses (course_name, short_name, total_semesters) VALUES (?, ?, ?)", [req.body.course_name, req.body.short_name, req.body.total_semesters]);
        res.json({ success: true });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.delete('/api/courses/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        await db.query("DELETE FROM courses WHERE id = ?", [req.params.id]);
        res.json({ success: true });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.post('/api/notes/upload', verifyToken, isAdmin, upload.single('pdf_file'), async (req, res) => {
    try {
        const { course_id, semester, subject_name, is_pro, content } = req.body;
        const file_url = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;
        
        await db.query(
            "INSERT INTO notes (course_id, semester, subject_name, file_url, uploaded_by, is_pro, content) VALUES (?, ?, ?, ?, ?, ?, ?)", 
            [course_id, semester, subject_name, file_url, req.user.id, is_pro === 'true' || is_pro === true, content || null]
        );
        res.json({ success: true });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.delete('/api/notes/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const [notes] = await db.query("SELECT * FROM notes WHERE id = ?", [req.params.id]);
        if (notes.length > 0 && notes[0].file_url) {
            const filename = notes[0].file_url.split('/uploads/')[1];
            const filePath = path.join(__dirname, 'uploads', filename);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        await db.query("DELETE FROM notes WHERE id = ?", [req.params.id]);
        res.json({ success: true });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.get('/api/user/notes', verifyToken, isAdmin, async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT notes.*, courses.course_name, courses.short_name 
            FROM notes JOIN courses ON notes.course_id = courses.id 
            WHERE notes.uploaded_by = ? ORDER BY notes.created_at DESC`, [req.user.id]);
        res.json({ success: true, data: rows });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.post('/api/admin/quizzes', verifyToken, isAdmin, async (req, res) => {
    try {
        const { course_id, title, description, semester } = req.body;
        const [result] = await db.query("INSERT INTO quizzes (course_id, title, description, semester) VALUES (?, ?, ?, ?)", [course_id, title, description, semester || null]);
        res.json({ success: true, quiz_id: result.insertId });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.post('/api/admin/quizzes/:id/questions', verifyToken, isAdmin, async (req, res) => {
    try {
        const { question_text, option_a, option_b, option_c, option_d, correct_option } = req.body;
        await db.query("INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES (?, ?, ?, ?, ?, ?, ?)", [req.params.id, question_text, option_a, option_b, option_c, option_d, correct_option]);
        res.json({ success: true });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.delete('/api/admin/quizzes/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        await db.query("DELETE FROM quizzes WHERE id = ?", [req.params.id]);
        res.json({ success: true });
    } catch (error) { res.status(500).json({ success: false }); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Elite LMS Server is running at http://localhost:${PORT}`));