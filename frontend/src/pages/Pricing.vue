<template>
  <div class="min-h-screen bg-gray-50 font-sans selection:bg-blue-600 selection:text-white pb-20">
    <nav class="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-2 cursor-pointer" @click="$router.push('/')">
           <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-2xl italic shadow-lg shadow-blue-600/20">N</div>
           <span class="text-2xl font-black tracking-tighter text-gray-900 hidden sm:block">NovaLearn.</span>
        </div>
        <div class="flex items-center gap-6">
           <router-link to="/" class="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">Catalog</router-link>
           <template v-if="user">
              <router-link to="/profile" class="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-black hover:bg-blue-600 transition-all shadow-md">My Workspace</router-link>
           </template>
           <template v-else>
              <router-link to="/login" class="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">Sign In</router-link>
           </template>
        </div>
      </div>
    </nav>

    <section class="py-20 text-center px-6">
       <span class="bg-amber-100 text-amber-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block">Unlock The Vault</span>
       <h1 class="text-5xl md:text-6xl font-black tracking-tight text-gray-900 mb-6">Invest in your academic success.</h1>
       <p class="text-xl text-gray-500 font-medium max-w-2xl mx-auto">Get the unfair advantage. Upgrade to Pro Elite to unlock solved papers, HD video masterclasses, and verifiable certificates.</p>
    </section>

    <!-- Payment Success/Error Notifications -->
    <div v-if="successMessage" class="max-w-xl mx-auto mb-8 bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl flex items-center justify-center font-bold animate-in fade-in zoom-in-95 duration-500 shadow-sm">
       <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
       {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="max-w-xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl flex items-center justify-center font-bold animate-in fade-in zoom-in-95 duration-500 shadow-sm">
       <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
       {{ errorMessage }}
    </div>

    <main class="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
       
       <!-- Basic Tier -->
       <div class="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-xl transition-shadow">
          <div class="mb-8">
             <h3 class="text-2xl font-black text-gray-900 mb-2">Basic Access</h3>
             <p class="text-gray-500 font-medium text-sm">Everything you need to get started.</p>
          </div>
          <div class="mb-8">
             <span class="text-5xl font-black text-gray-900">Free</span>
             <span class="text-gray-400 font-bold ml-2">forever</span>
          </div>
          <ul class="space-y-4 mb-10 flex-grow">
             <li class="flex items-center text-gray-600 font-medium"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Access to core curriculum text</li>
             <li class="flex items-center text-gray-600 font-medium"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Community forum access</li>
             <li class="flex items-center text-gray-600 font-medium"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Global leaderboard ranking</li>
             <li class="flex items-center text-gray-400 font-medium opacity-50"><svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> No video masterclasses</li>
             <li class="flex items-center text-gray-400 font-medium opacity-50"><svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> No verifiable certificates</li>
          </ul>
          <button @click="$router.push('/register')" class="w-full bg-gray-50 text-gray-900 border-2 border-gray-200 py-4 rounded-2xl font-black hover:border-gray-900 transition-colors">Get Started Basic</button>
       </div>

       <!-- Pro Elite Tier -->
       <div class="bg-gray-900 rounded-[3rem] p-10 border border-gray-800 shadow-2xl flex flex-col h-full relative overflow-hidden transform md:-translate-y-4">
          <div class="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="mb-8 relative z-10">
             <span class="absolute -top-4 right-0 bg-amber-500 text-gray-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Most Popular</span>
             <h3 class="text-2xl font-black text-white mb-2 flex items-center">Pro Elite <svg class="w-5 h-5 ml-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg></h3>
             <p class="text-gray-400 font-medium text-sm">The ultimate academic unfair advantage.</p>
          </div>
          <div class="mb-8 relative z-10">
             <span class="text-5xl font-black text-white">₹499</span>
             <span class="text-gray-400 font-bold ml-2">/ year</span>
          </div>
          <ul class="space-y-4 mb-10 flex-grow relative z-10">
             <li class="flex items-center text-gray-300 font-medium"><svg class="w-5 h-5 text-amber-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> All Basic Features</li>
             <li class="flex items-center text-white font-bold"><svg class="w-5 h-5 text-amber-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Solved Previous Year Papers</li>
             <li class="flex items-center text-white font-bold"><svg class="w-5 h-5 text-amber-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> HD Video Masterclasses</li>
             <li class="flex items-center text-white font-bold"><svg class="w-5 h-5 text-amber-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Official PDF Certificates</li>
             <li class="flex items-center text-white font-bold"><svg class="w-5 h-5 text-amber-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Priority Ad-Free Environment</li>
          </ul>
          
          <button @click="handleCheckout" :disabled="loading || user?.is_pro" class="relative z-10 w-full bg-amber-400 text-gray-900 py-4 rounded-2xl font-black hover:bg-amber-300 transition-colors shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
             <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
             {{ loading ? 'Initializing Secure Checkout...' : (user?.is_pro ? 'Already Subscribed' : 'Upgrade to Pro Elite') }}
          </button>
       </div>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const route = useRoute();
const user = ref(null);
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const handleCheckout = async () => {
   if (!user.value) {
      router.push('/login');
      return;
   }
   if (user.value.is_pro) return;

   loading.value = true;
   errorMessage.value = '';
   try {
      // Calls the new Stripe endpoint
      const response = await api.createCheckoutSession({});
      // Redirect to Stripe checkout URL (or mock URL if env is local)
      window.location.href = response.data.url;
   } catch (error) {
      errorMessage.value = "Failed to initialize checkout. Please check the payment gateway connection.";
      loading.value = false;
   }
};

onMounted(async () => {
   const savedUser = localStorage.getItem('user');
   if (savedUser) user.value = JSON.parse(savedUser);

   // Check if returning from a successful Stripe checkout
   if (route.query.success && route.query.session_id) {
      loading.value = true;
      try {
         const res = await api.verifyPayment({ session_id: route.query.session_id });
         user.value = res.data.user;
         localStorage.setItem('user', JSON.stringify(res.data.user));
         successMessage.value = "Payment verified successfully! Welcome to Pro Elite.";
         
         // Clean up URL and redirect to workspace
         setTimeout(() => { router.push('/profile'); }, 3000);
      } catch (err) {
         errorMessage.value = "Payment verification failed. Please contact support.";
      } finally {
         loading.value = false;
      }
   } else if (route.query.canceled) {
      errorMessage.value = "Checkout was canceled. Your account has not been charged.";
   }
});
</script>

<style scoped>
.animate-in { animation-duration: 0.5s; animation-fill-mode: both; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.fade-in { animation-name: fadeIn; }
.zoom-in-95 { animation-name: zoomIn; }
</style>