<template>
  <div class="min-h-screen bg-gray-950 flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
    
    <!-- Deep System Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" style="background-image: radial-gradient(circle at 10% 20%, rgba(220, 38, 38, 0.1) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 40%);"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-md w-full relative z-10 animate-in zoom-in-95 duration-500">
      
      <!-- System Warning Badge -->
      <div class="flex justify-center mb-6">
         <span class="bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] flex items-center shadow-lg shadow-red-500/10">
            <span class="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
            Restricted System Access
         </span>
      </div>

      <div class="bg-gray-900 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
        
        <!-- Subtle Scanline effect -->
        <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20 pointer-events-none"></div>

        <div class="text-center mb-8 relative z-10">
          <h2 class="text-3xl font-black text-white tracking-tight mb-2">Vault Initialization</h2>
          <p class="text-gray-400 text-sm font-medium">Register the master administrative identity.</p>
        </div>

        <form @submit.prevent="handleAdminRegister" class="space-y-5 relative z-10">
          
          <!-- Identity -->
          <div>
             <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Admin Identity</label>
             <input v-model="form.name" type="text" required placeholder="Master Administrator" class="w-full bg-gray-950/50 border border-gray-800 p-4 rounded-2xl focus:border-red-500 focus:bg-gray-900 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white font-bold placeholder-gray-700">
          </div>
          
          <!-- Secure Email -->
          <div>
             <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Secure Email</label>
             <input v-model="form.email" type="email" required placeholder="admin@novalearn.edu" class="w-full bg-gray-950/50 border border-gray-800 p-4 rounded-2xl focus:border-red-500 focus:bg-gray-900 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white font-bold placeholder-gray-700">
          </div>
          
          <!-- Password -->
          <div>
             <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Master Password</label>
             <input v-model="form.password" type="password" required placeholder="••••••••" class="w-full bg-gray-950/50 border border-gray-800 p-4 rounded-2xl focus:border-red-500 focus:bg-gray-900 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white font-bold placeholder-gray-700">
          </div>

          <!-- Secret Key -->
          <div class="pt-2">
             <label class="block text-[10px] font-black text-red-500 uppercase tracking-widest mb-2 ml-1">Authorization Secret</label>
             <input v-model="form.admin_secret" type="password" required placeholder="Enter Backend Secret Code" class="w-full bg-red-950/20 border border-red-500/30 p-4 rounded-2xl focus:border-red-500 focus:bg-red-900/20 focus:ring-1 focus:ring-red-500 outline-none transition-all text-red-100 font-bold placeholder-red-900/50">
             <p class="text-[9px] text-gray-500 font-bold mt-2 ml-1 uppercase tracking-widest">Requires Render Env Variable (ADMIN_SECRET)</p>
          </div>

          <div v-if="errorMessage" class="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-bold text-center mt-4">
            {{ errorMessage }}
          </div>

          <button type="submit" :disabled="loading" class="w-full bg-red-600 text-white font-black py-4 rounded-2xl hover:bg-red-500 transition-all shadow-xl shadow-red-600/20 mt-6 disabled:opacity-50 text-sm tracking-widest uppercase flex items-center justify-center">
            <span v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
            {{ loading ? 'Authenticating...' : 'Establish Override Protocol' }}
          </button>
        </form>
        
      </div>
      
      <div class="text-center mt-8 relative z-10">
         <router-link to="/login" class="text-gray-500 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors">Return to Standard Portal</router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const form = ref({ name: '', email: '', password: '', admin_secret: '' });
const loading = ref(false);
const errorMessage = ref('');

const handleAdminRegister = async () => {
  loading.value = true;
  errorMessage.value = '';
  
  try {
    const res = await api.registerAdmin(form.value);
    if (res.data.success) {
      alert("System Administrator initialized. You may now log in.");
      router.push('/login');
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Access Denied. Check your connection or secret code.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.animate-in { animation-duration: 0.5s; animation-fill-mode: both; }
@keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.zoom-in-95 { animation-name: zoomIn; }
</style>