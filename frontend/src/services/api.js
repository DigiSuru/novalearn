import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            if(error.response.data.message === "Invalid Token" || error.response.data.message === "Invalid credentials.") {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default {
    loginUser: (data) => apiClient.post('/auth/login', data),
    registerUser: (data) => apiClient.post('/auth/register', data),
    forgotPassword: (data) => apiClient.post('/auth/forgot-password', data),
    resetPassword: (data) => apiClient.post('/auth/reset-password', data),
    
    updateProfile: (data) => apiClient.put('/user/profile', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
    upgradeToPro: () => apiClient.post('/user/upgrade'), // Legacy mock upgrade
    
    getCourses: () => apiClient.get('/courses'),
    getCourseDetails: (id) => apiClient.get(`/courses/${id}`),
    getCourseNotes: (id) => apiClient.get(`/courses/${id}/notes`),
    search: (q) => apiClient.get(`/search?q=${q}`),
    
    enrollInCourse: (id) => apiClient.post(`/courses/${id}/enroll`),
    getUserEnrollments: () => apiClient.get('/user/enrollments'),
    recordProgress: (noteId) => apiClient.post(`/user/progress/${noteId}`),
    getUserStats: () => apiClient.get('/user/stats'),
    
    getLeaderboard: () => apiClient.get('/leaderboard'),
    getAssessmentHistory: () => apiClient.get('/user/assessments/history'),
    
    getDiscussions: (id) => apiClient.get(`/courses/${id}/discussions`),
    postMessage: (id, data) => apiClient.post(`/courses/${id}/discussions`, data),
    
    getCourseQuizzes: (courseId) => apiClient.get(`/courses/${courseId}/quizzes`),
    getQuizDetails: (quizId) => apiClient.get(`/quizzes/${quizId}`),
    submitQuiz: (quizId, data) => apiClient.post(`/quizzes/${quizId}/submit`, data),
    
    getAdminSystemStats: () => apiClient.get('/admin/system-stats'),
    getAdminUsers: () => apiClient.get('/admin/users'),
    updateUserRole: (id, role) => apiClient.put(`/admin/users/${id}/role`, { role }),
    
    getUserNotes: () => apiClient.get('/user/notes'),
    addCourse: (data) => apiClient.post('/courses', data),
    deleteCourse: (id) => apiClient.delete(`/courses/${id}`),
    
    // Note: This endpoint inherently supports video files (MP4) now via FormData!
    uploadNote: (data) => apiClient.post('/notes/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
    deleteNote: (id) => apiClient.delete(`/notes/${id}`),

    createQuiz: (data) => apiClient.post('/admin/quizzes', data),
    addQuestionToQuiz: (quizId, data) => apiClient.post(`/admin/quizzes/${quizId}/questions`, data),
    deleteQuiz: (quizId) => apiClient.delete(`/admin/quizzes/${quizId}`),

    // ==========================================
    // --- NEW: FEATURE 1 (PAYMENTS) ---
    // ==========================================
    createCheckoutSession: (data) => apiClient.post('/payments/create-checkout-session', data),
    verifyPayment: (data) => apiClient.post('/payments/verify', data),

    // ==========================================
    // --- NEW: FEATURE 2 (VIDEO TRACKING) ---
    // ==========================================
    recordVideoProgress: (noteId, progressData) => apiClient.post(`/user/video-progress/${noteId}`, progressData),

    // ==========================================
    // --- NEW: FEATURE 3 (CERTIFICATES) ---
    // ==========================================
    getUserCertificates: () => apiClient.get('/user/certificates'),
    // Note: We use responseType 'blob' to handle binary PDF file downloads directly from the server
    generateCertificate: (courseId) => apiClient.post(`/courses/${courseId}/certificate`, null, { responseType: 'blob' })
};