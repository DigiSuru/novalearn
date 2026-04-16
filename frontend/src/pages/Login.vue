<template>
  <div class="min-h-screen flex bg-white font-sans selection:bg-blue-600 selection:text-white">
    <!-- Left Side: Branding/Visuals -->
    <div class="hidden lg:flex w-1/2 bg-gray-900 relative overflow-hidden items-center justify-center p-12">
      <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div class="absolute -top-20 -left-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"></div>
      
      <div class="relative z-10 text-white max-w-lg">
        <div class="flex items-center gap-3 mb-8 cursor-pointer" @click="$router.push('/')">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center font-black text-3xl italic shadow-lg">N</div>
          <span class="text-3xl font-black tracking-tighter">NovaLearn.</span>
        </div>
        <h1 class="text-5xl font-black tracking-tight leading-tight mb-6">Welcome back to your academic vault.</h1>
        <p class="text-gray-400 text-lg font-medium">Log in to access your curated curriculum, continue your study streak, and engage with your learning community.</p>
        
        <div class="mt-12 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
          <div class="flex text-amber-400 mb-3"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" v-for="i in 5" :key="i"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg></div>
          <p class="text-white font-medium italic">"NovaLearn completely changed my study habits. The pro resources are unmatched."</p>
          <p class="text-gray-400 text-sm font-bold mt-4 uppercase tracking-widest">— Top 1% Learner</p>
        </div>
      </div>
    </div>

    <!-- Right Side: Login Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative z-10">
      <!-- Mobile logo -->
      <div class="absolute top-8 left-8 lg:hidden flex items-center gap-2 cursor-pointer" @click="$router.push('/')">
         <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xl italic shadow-lg">N</div>
         <span class="text-xl font-black tracking-tighter text-gray-900">NovaLearn.</span>
      </div>

      <div class="max-w-md w-full mt-12 lg:mt-0">
        <div class="mb-10">
          <h2 class="text-4xl font-black text-gray-900 tracking-tight mb-2">Sign In</h2>
          <p class="text-gray-500 font-medium">Enter your credentials to access your account.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
            <div class="relative">
              <input type="email" v-model="form.email" required placeholder="you@university.edu" class="w-full bg-gray-50 border-2 border-gray-100 p-4 pl-12 rounded-2xl outline-none focus:border-blue-600 focus:bg-white font-bold text-gray-900 transition-all">
              <svg class="w-5 h-5 absolute left-4 top-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
            </div>
          </div>
          
          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-xs font-black text-gray-400 uppercase tracking-widest">Password</label>
              <router-link to="/forgot-password" class="text-xs font-bold text-blue-600 hover:underline">Forgot password?</router-link>
            </div>
            <div class="relative">
              <input :type="showPassword ? 'text' : 'password'" v-model="form.password" required placeholder="••••••••" class="w-full bg-gray-50 border-2 border-gray-100 p-4 pl-12 pr-12 rounded-2xl outline-none focus:border-blue-600 focus:bg-white font-bold text-gray-900 transition-all">
              <svg class="w-5 h-5 absolute left-4 top-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              <button type="button" @click="showPassword = !showPassword" class="absolute right-4 top-4 text-gray-400 hover:text-blue-600 transition-colors">
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
              </button>
            </div>
          </div>

          <!-- Error State -->
          <div v-if="errorMsg" class="bg-red-50 text-red-600 border border-red-100 p-4 rounded-xl text-sm font-bold flex items-center animate-in fade-in zoom-in-95 duration-300">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            {{ errorMsg }}
          </div>

          <button type="submit" :disabled="loading" class="w-full bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-500/20 disabled:opacity-50 transform hover:-translate-y-1">
            {{ loading ? 'Authenticating...' : 'Sign In Securely' }}
          </button>
        </form>

        <div class="mt-8 pt-8 border-t border-gray-100 text-center">
          <p class="text-gray-500 font-medium">
            New to NovaLearn? 
            <router-link to="/register" class="text-blue-600 font-black hover:underline ml-1">Create an account</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const form = ref({ email: '', password: '' });
const errorMsg = ref('');
const loading = ref(false);
const showPassword = ref(false);

const handleLogin = async () => {
  loading.value = true;
  errorMsg.value = '';
  try {
    const response = await api.loginUser(form.value);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    router.push('/profile');
  } catch (err) {
    errorMsg.value = err.response?.data?.message || "Invalid credentials. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.animate-in { animation-duration: 0.3s; animation-fill-mode: both; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.fade-in { animation-name: fadeIn; }
.zoom-in-95 { animation-name: zoomIn; }
</style>