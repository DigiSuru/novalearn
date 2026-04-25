# 🎓 NovaLearn Elite LMS

**The ultimate, community-driven Learning Management System.**

NovaLearn Elite LMS is a full-stack educational platform designed to deliver modern, interactive, and scalable online learning experiences. It combines rich curriculum delivery, real-time analytics, gamification, and monetization into a single enterprise-grade system.

---

## ✨ Key Features

### 📚 Interactive Curriculum Matrix

* Rich-text lessons with structured formatting
* Downloadable PDFs and streaming video lectures (MP4)
* Seamless content navigation

### 🎥 Video Progress Tracking

* Tracks student watch percentage in real-time
* Auto-completes lessons at 90% viewing threshold

### 📝 Assessment & MCQ Engine

* Create dynamic mock exams
* Track attempts and scores
* Automatic pass/fail evaluation
* XP-based reward system

### 🏆 Gamification & Leaderboard

* Global rankings based on:

  * Assessments → 100 XP
  * Curriculum reads → 50 XP
* Competitive learning environment

### 💳 Nova Pro Elite (Monetization)

* Stripe integration for subscriptions
* Premium content gating (notes, solved papers, etc.)

### 📜 Automated Certification

* Dynamic PDF certificates generated using PDFKit
* Instant issuance on course completion

### 💬 Community Forums

* Course-specific discussion boards
* Peer-to-peer learning & faculty interaction

### 🛡️ Identity Vault & RBAC

* Secure JWT authentication
* Password recovery system
* Role-Based Access Control (Admin / Student)

---

## 🛠️ Technology Stack

### Frontend

* Vue 3 (Composition API)
* Vite
* Vue Router
* Tailwind CSS v4
* Axios

### Backend

* Node.js
* Express.js
* MySQL
* JSON Web Tokens (JWT)
* Bcrypt
* Multer
* PDFKit
* Stripe API

---

## 🚀 Local Development Setup

### 1. Prerequisites

Make sure you have installed:

* Node.js (v16 or higher)
* XAMPP or MySQL Server
* Git

---

### 2. Clone Repository

```bash
git clone https://github.com/YourUsername/novalearn.git
cd novalearn
```

---

### 3. Database Setup

* Start Apache & MySQL in XAMPP
* Open: `http://localhost/phpmyadmin`
* Create database: `student_platform`
* Import `init.sql`

---

### 4. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=student_platform
JWT_SECRET=your_super_secret_jwt_key
ADMIN_SECRET=supersecret123
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

Run backend:

```bash
npm run dev
```

---

### 5. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🔐 Master Admin Setup

To access admin features:

1. Ensure `.env` has:

```env
ADMIN_SECRET=supersecret123
```

2. Visit:

```
http://localhost:5173/admin-setup
```

3. Register using the secret key

4. Login to access:

* CMS
* Content Matrix
* Admin Dashboard

---

## 🌍 Production Deployment

### 🗄 Database

* Use: Aiven / PlanetScale
* Import `init.sql`
* Get DB credentials

---

### ⚙ Backend Deployment

* Platforms: Render / Heroku
* Root Directory: `backend`

**Commands:**

```
Build: npm install
Start: node server.js
```

Add Environment Variables:

* Replace local DB with cloud credentials
* Set:

```env
DB_SSL=true
```

---

### 🌐 Frontend Deployment

* Platforms: Vercel / Netlify / Render
* Root Directory: `frontend`

**Commands:**

```
Build: npm install && npm run build
Publish: dist
```

⚠️ Important:

* Add rewrite rule:

```
/* → /index.html
```

* Update API base URL in:

```
frontend/src/services/api.js
```

---

## 📁 Project Structure

```
novalearn/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── views/
│   └── services/
│
└── init.sql
```

---

## 📌 Future Enhancements

* Live classes (WebRTC / Zoom integration)
* AI-based learning recommendations
* Mobile app (Flutter / React Native)
* Multi-language support

---

## 📄 License

This project is proprietary and intended for educational deployment.
All rights reserved.

---

## 🤝 Contributing

Currently private. For collaboration or licensing inquiries, contact the author.

---

## 💡 Author Note

NovaLearn Elite LMS is built to empower educators, institutions, and developers to create scalable, modern learning ecosystems.

---
