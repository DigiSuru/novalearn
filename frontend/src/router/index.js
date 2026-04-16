import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import CourseDetails from '../pages/CourseDetails.vue';
import Upload from '../pages/Upload.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import ForgotPassword from '../pages/ForgotPassword.vue';
import Career from '../pages/Career.vue';
import Profile from '../pages/Profile.vue';
import Pricing from '../pages/Pricing.vue';
import Quiz from '../pages/Quiz.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/course/:id', name: 'CourseDetails', component: CourseDetails },
    { path: '/career', name: 'Career', component: Career },
    { path: '/pricing', name: 'Pricing', component: Pricing },
    { 
        path: '/login', 
        name: 'Login', 
        component: Login,
        meta: { guestOnly: true }
    },
    { 
        path: '/register', 
        name: 'Register', 
        component: Register,
        meta: { guestOnly: true }
    },
    { 
        path: '/forgot-password', 
        name: 'ForgotPassword', 
        component: ForgotPassword,
        meta: { guestOnly: true }
    },
    { 
        path: '/profile', 
        name: 'Profile', 
        component: Profile, 
        meta: { requiresAuth: true } 
    },
    { 
        path: '/quiz/:id', 
        name: 'Quiz', 
        component: Quiz, 
        meta: { requiresAuth: true } 
    },
    { 
        path: '/upload', 
        name: 'Upload', 
        component: Upload,
        meta: { requiresAdmin: true } 
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const user = userStr ? JSON.parse(userStr) : null;
    const isAuthenticated = user && token;

    if (to.meta.requiresAdmin) {
        if (isAuthenticated && user.role === 'admin') {
            next();
        } else {
            next('/');
        }
    } else if (to.meta.requiresAuth) {
        if (isAuthenticated) {
            next();
        } else {
            next('/login');
        }
    } else if (to.meta.guestOnly) {
        if (isAuthenticated) {
            next('/profile');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;