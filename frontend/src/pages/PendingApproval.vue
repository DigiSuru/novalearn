<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans p-4">
    <div class="bg-white rounded-[2rem] shadow-xl border border-gray-100 max-w-lg w-full p-8 md:p-12 text-center">
      
      <div class="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 text-4xl mx-auto mb-6 shadow-inner border border-amber-100">
        ⏳
      </div>
      
      <h2 class="text-3xl font-black text-gray-900 tracking-tight mb-2">Approval Pending</h2>
      <p class="text-gray-500 font-medium mb-8">
        Your account has been registered successfully, but an administrator must review and approve your access before you can enter the platform.
      </p>

      <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-left mb-8">
        <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Contact Administrator</h3>
        
        <div class="flex items-center gap-4 mb-4">
          <img src="https://ui-avatars.com/api/?name=Suru+Sir&background=2563eb&color=fff&size=128" alt="Admin" class="w-14 h-14 rounded-full border-2 border-white shadow-md">
          <div>
            <h4 class="font-black text-gray-900">Suresh Kumar (Suru Sir)</h4>
            <a href="https://github.com/DigiSuru" target="_blank" class="text-xs font-bold text-blue-600 hover:underline">CSwithSuru</a>
          </div>
        </div>

        <ul class="space-y-3 mt-4 border-t border-gray-200 pt-4">
          <li class="flex items-center text-gray-600">
            <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            <a href="tel:+919252145887" class="text-sm font-bold hover:text-blue-600 transition-colors">+91 92521 45887</a>
          </li>
          <li class="flex items-center text-gray-600">
            <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <a href="mailto:suru7392@gmail.com" class="text-sm font-bold hover:text-blue-600 transition-colors">suru7392@gmail.com</a>
          </li>
        </ul>
      </div>

      <button @click="logout" class="w-full bg-gray-900 text-white font-black py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg text-sm uppercase tracking-widest">
        Logout Securely
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};
</script>
