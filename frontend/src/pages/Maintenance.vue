<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans selection:bg-blue-600 selection:text-white">
    <div class="max-w-2xl w-full bg-white rounded-[3rem] p-12 border border-gray-100 shadow-xl text-center relative overflow-hidden">
      <!-- Decorative background elements -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mt-32 -mr-32"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mb-32 -ml-32"></div>
      
      <div class="relative z-10">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
        
        <h1 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">We'll be back soon!</h1>
        
        <p class="text-xl text-gray-500 font-medium mb-10 max-w-lg mx-auto leading-relaxed">
          We are currently performing scheduled maintenance to upgrade NovaLearn. Everything will be back up and running shortly.
        </p>
        
        <div class="inline-flex items-center justify-center space-x-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-full font-bold text-sm">
          <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>System Upgrading</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
