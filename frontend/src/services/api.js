import axios from 'axios';

// SMART API ROUTING: Automatically detects if you are testing locally or on the live Render site.
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_URL = isLocal ? 'http://localhost:5000/api' : 'https://novalearn-dmdf.onrender.com/api';

const apiClient = axios.create({
    baseURL: API_URL,
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
    registerAdmin: (data) => apiClient.post('/auth/register-admin', data),
    forgotPassword: (data) => apiClient.post('/auth/forgot-password', data),
    resetPassword: (data) => apiClient.post('/auth/reset-password', data),
    
    updateProfile: (data) => apiClient.put('/user/profile', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
    upgradeToPro: () => apiClient.post('/user/upgrade'),
    
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
    
    getNote: (id) => apiClient.get(`/notes/${id}`),
    updateNote: (id, data) => apiClient.put(`/notes/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
    
    uploadNote: (data) => apiClient.post('/notes/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
    deleteNote: (id) => apiClient.delete(`/notes/${id}`),

    createQuiz: (data) => apiClient.post('/admin/quizzes', data),
    addQuestionToQuiz: (quizId, data) => apiClient.post(`/admin/quizzes/${quizId}/questions`, data),
    deleteQuiz: (quizId) => apiClient.delete(`/admin/quizzes/${quizId}`),

    createCheckoutSession: (data) => apiClient.post('/payments/create-checkout-session', data),
    verifyPayment: (data) => apiClient.post('/payments/verify', data),
    recordVideoProgress: (noteId, progressData) => apiClient.post(`/user/video-progress/${noteId}`, progressData),
    getUserCertificates: () => apiClient.get('/user/certificates'),
    generateCertificate: (courseId) => apiClient.post(`/courses/${courseId}/certificate`, null, { responseType: 'blob' })
};