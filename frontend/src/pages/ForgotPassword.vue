<template>
  <div class="min-h-screen flex bg-white font-sans selection:bg-blue-600 selection:text-white">
    
    <!-- Left Side: Reset Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative z-10 bg-white">
      <!-- Mobile/Desktop logo -->
      <div class="absolute top-8 left-8 flex items-center gap-2 cursor-pointer" @click="$router.push('/')">
         <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xl italic shadow-lg">N</div>
         <span class="text-xl font-black tracking-tighter text-gray-900 hidden sm:block">NovaLearn.</span>
      </div>

      <div class="max-w-md w-full mt-12 lg:mt-0">
        <div class="mb-10">
          <h2 class="text-4xl font-black text-gray-900 tracking-tight mb-2">Account Recovery</h2>
          <p class="text-gray-500 font-medium">
             {{ step === 1 ? 'Enter your email to receive a secure recovery code.' : 'Enter your recovery code and a new password.' }}
          </p>
        </div>

        <!-- Step 1: Request Code -->
        <form v-if="step === 1" @submit.prevent="handleRequestReset" class="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Account Email</label>
            <div class="relative">
              <input type="email" v-model="form.email" required placeholder="you@university.edu" class="w-full bg-gray-50 border-2 border-gray-100 p-4 pl-12 rounded-2xl outline-none focus:border-blue-600 focus:bg-white font-bold text-gray-900 transition-all">
              <svg class="w-5 h-5 absolute left-4 top-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
            </div>
          </div>

          <div v-if="message" :class="isSuccess ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'" class="border p-4 rounded-xl text-sm font-bold flex items-center animate-in fade-in zoom-in-95 duration-300">
            <svg v-if="isSuccess" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            <svg v-else class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            {{ message }}
          </div>

          <button type="submit" :disabled="loading" class="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-gray-900 transition-all shadow-xl hover:shadow-gray-900/20 disabled:opacity-50 transform hover:-translate-y-1">
            {{ loading ? 'Searching Vault...' : 'Send Recovery Code' }}
          </button>
        </form>

        <!-- Step 2: Reset Password -->
        <form v-if="step === 2" @submit.prevent="handleResetPassword" class="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
          <div>
            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">6-Digit Recovery Code</label>
            <div class="relative">
              <input type="text" v-model="form.code" required placeholder="123456" maxlength="6" class="w-full bg-gray-50 border-2 border-gray-100 p-4 pl-12 rounded-2xl outline-none focus:border-blue-600 focus:bg-white font-black text-gray-900 transition-all tracking-[0.5em]">
              <svg class="w-5 h-5 absolute left-4 top-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
            </div>
          </div>

          <div>
            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">New Password</label>
            <div class="relative">
              <input :type="showPassword ? 'text' : 'password'" v-model="form.newPassword" required minlength="6" placeholder="••••••••" class="w-full bg-gray-50 border-2 border-gray-100 p-4 pl-12 pr-12 rounded-2xl outline-none focus:border-blue-600 focus:bg-white font-bold text-gray-900 transition-all">
              <svg class="w-5 h-5 absolute left-4 top-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              <button type="button" @click="showPassword = !showPassword" class="absolute right-4 top-4 text-gray-400 hover:text-blue-600 transition-colors">
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
              </button>
            </div>
            <p class="text-[10px] font-bold text-gray-400 mt-2">Must be at least 6 characters long.</p>
          </div>

          <div v-if="message" :class="isSuccess ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'" class="border p-4 rounded-xl text-sm font-bold flex items-center">
            {{ message }}
          </div>

          <button type="submit" :disabled="loading" class="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-gray-900 transition-all shadow-xl hover:shadow-gray-900/20 disabled:opacity-50 transform hover:-translate-y-1">
            {{ loading ? 'Updating...' : 'Update Password' }}
          </button>
        </form>

        <!-- DEMO PURPOSES ONLY: Display the mock code so the user doesn't actually need to check their email -->
        <div v-if="mockCodeDisplay" class="mt-6 p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center animate-in zoom-in-95 duration-500">
           <p class="text-xs font-black text-amber-600 uppercase tracking-widest mb-1">Demo Recovery Code</p>
           <p class="text-4xl font-black text-amber-700 tracking-[0.2em] my-2">{{ mockCodeDisplay }}</p>
           <p class="text-[10px] text-amber-600/80 font-bold uppercase">(In production, this is sent via email)</p>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-100 text-center">
          <p class="text-gray-500 font-medium">
            Remembered your password? 
            <router-link to="/login" class="text-blue-600 font-black hover:underline ml-1">Sign In</router-link>
          </p>
        </div>
      </div>
    </div>

    <!-- Right Side: Graphic (Hidden on mobile) -->
    <div class="hidden lg:flex w-1/2 bg-gray-50 relative overflow-hidden items-center justify-center p-12 border-l border-gray-100">
       <div class="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
       <div class="absolute top-20 right-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
       <div class="absolute bottom-20 left-20 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>
       
       <div class="relative z-10 text-center max-w-md">
          <div class="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 mb-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
             <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-xl font-black">🔐</div>
                <div class="text-left">
                   <p class="font-black text-gray-900">Secure Identity Vault</p>
                   <p class="text-xs text-gray-400 font-bold uppercase tracking-widest">End-to-End Encryption</p>
                </div>
             </div>
             <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div class="bg-gradient-to-r from-red-400 to-blue-500 w-full h-full"></div>
             </div>
          </div>
          
          <h2 class="text-3xl font-black text-gray-900 tracking-tight mb-4">We've got you covered.</h2>
          <p class="text-gray-500 font-medium leading-relaxed">It happens to the best of us. Regain access to your academic profile safely and securely.</p>
       </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const step = ref(1);
const form = ref({ email: '', code: '', newPassword: '' });
const message = ref('');
const isSuccess = ref(false);
const loading = ref(false);
const showPassword = ref(false);
const mockCodeDisplay = ref('');

const handleRequestReset = async () => {
  loading.value = true;
  message.value = '';
  try {
    const response = await api.forgotPassword({ email: form.value.email });
    isSuccess.value = true;
    message.value = "Secure code generated successfully!";
    mockCodeDisplay.value = response.data.mockCode; // For demo purposes
    step.value = 2; // Move to next step
  } catch (err) {
    isSuccess.value = false;
    message.value = err.response?.data?.message || "No account found with that email.";
  } finally {
    loading.value = false;
  }
};

const handleResetPassword = async () => {
  loading.value = true;
  message.value = '';
  try {
    await api.resetPassword({ email: form.value.email, code: form.value.code, newPassword: form.value.newPassword });
    isSuccess.value = true;
    mockCodeDisplay.value = '';
    message.value = "Password updated securely! Redirecting to login...";
    setTimeout(() => { router.push('/login'); }, 2000);
  } catch (err) {
    isSuccess.value = false;
    message.value = err.response?.data?.message || "Invalid code or reset failed.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.animate-in { animation-duration: 0.4s; animation-fill-mode: both; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
@keyframes slideInFromBottom { from { transform: translateY(1rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slideInFromRight { from { transform: translateX(2rem); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
.fade-in { animation-name: fadeIn; }
.zoom-in-95 { animation-name: zoomIn; }
.slide-in-from-bottom-4 { animation-name: slideInFromBottom; }
.slide-in-from-right-8 { animation-name: slideInFromRight; }
</style>