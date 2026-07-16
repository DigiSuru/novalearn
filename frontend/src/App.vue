<template>
  <div class="pb-16 md:pb-0 min-h-screen relative flex flex-col bg-gray-50">
    <div class="flex-grow">
      <router-view></router-view>
    </div>

    <!-- Mobile Bottom Navigation (Visible only on small screens) -->
    <nav v-if="!hideBottomNav" class="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 z-50 flex justify-around items-center h-16 px-2 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-safe">
      
      <!-- Home Tab -->
      <router-link to="/" class="flex flex-col items-center justify-center w-full h-full text-gray-400 transition-colors" active-class="text-blue-600">
         <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
         </svg>
         <span class="text-[10px] font-black uppercase tracking-widest">Home</span>
      </router-link>

      <!-- Dashboard / Vault Tab -->
      <router-link to="/profile" class="flex flex-col items-center justify-center w-full h-full text-gray-400 transition-colors" active-class="text-blue-600">
         <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
         </svg>
         <span class="text-[10px] font-black uppercase tracking-widest">Vault</span>
      </router-link>
      
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Hide bottom nav on auth screens so it doesn't clutter the login/register flow
const hideBottomNav = computed(() => {
  return ['Login', 'Register'].includes(route.name)
})
</script>

<style>
/* Safe area padding for iPhones with bottom notch */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>