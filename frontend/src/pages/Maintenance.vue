<template>
  <div class="min-h-screen w-full tricolor-bg flex items-center justify-center p-4 relative overflow-hidden font-inter">

    <!-- Decorative Tricolor Ribbon Top Bar -->
    <div class="absolute top-0 left-0 right-0 h-3 flex">
        <div class="bg-[#FF9933] flex-1"></div>
        <div class="bg-white flex-1"></div>
        <div class="bg-[#138808] flex-1"></div>
    </div>

    <!-- Background glowing decorative blobs -->
    <div class="absolute -top-32 -left-32 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-green-500/20 rounded-full blur-3xl pointer-events-none"></div>

    <!-- Main Card Container -->
    <div class="max-w-lg w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 text-center relative border border-white/40 z-10">
        
        <!-- Ashoka Chakra Watermark / Decorative SVG -->
        <div class="absolute top-6 right-6 opacity-10 pointer-events-none">
            <svg class="w-24 h-24 text-[#000080] animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M5.636 18.364L18.364 5.636"></path>
            </svg>
        </div>

        <!-- Patriotic Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-[#FF9933]"></span>
            Happy Independence Day
            <span class="w-2 h-2 rounded-full bg-[#138808]"></span>
        </div>

        <!-- Main Heading -->
        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Under <span class="tricolor-text-gradient">Maintenance</span>
        </h1>
        
        <p class="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
            As we celebrate the spirit of freedom, our platform is undergoing scheduled upgrades to serve you better. We will be back online shortly!
        </p>

        <!-- Admin Contact Box -->
        <div class="bg-gradient-to-br from-gray-50 to-orange-50/40 rounded-2xl p-6 border border-orange-100 text-left shadow-inner">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xs font-bold text-gray-500 uppercase tracking-wider">Administrator Contact</h2>
                <div class="flex space-x-1">
                    <span class="w-2 h-2 rounded-full bg-[#FF9933]"></span>
                    <span class="w-2 h-2 rounded-full bg-[#000080]"></span>
                    <span class="w-2 h-2 rounded-full bg-[#138808]"></span>
                </div>
            </div>
            
            <div class="space-y-4">
                <!-- Website Contact -->
                <div class="flex items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm transition-all hover:border-orange-200">
                    <div class="w-10 h-10 rounded-lg bg-orange-50 text-[#FF9933] flex items-center justify-center mr-3 flex-shrink-0">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                    </div>
                    <div>
                        <p class="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Website</p>
                        <a href="https://skmeghwal.in" class="text-sm text-gray-900 font-bold hover:text-orange-600 transition-colors">skmeghwal.in</a>
                    </div>
                </div>

                <!-- Phone Contact -->
                <div class="flex items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm transition-all hover:border-green-200">
                    <div class="w-10 h-10 rounded-lg bg-green-50 text-[#138808] flex items-center justify-center mr-3 flex-shrink-0">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    </div>
                    <div>
                        <p class="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Helpline / Phone</p>
                        <a href="tel:9252145887" class="text-sm text-gray-900 font-bold hover:text-green-600 transition-colors">9252145887</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer Note -->
        <p class="text-xs text-gray-400 mt-6">
            Jai Hind! 🇮🇳 Thank you for your patience and support.
        </p>

    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.font-inter {
    font-family: 'Inter', sans-serif;
}

/* Tricolor gradient animation or background effects */
.tricolor-bg {
    background: linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%);
}

.tricolor-text-gradient {
    background: linear-gradient(90deg, #FF9933, #000080, #138808);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

@keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.animate-spin-slow {
    animation: spin-slow 20s linear infinite;
}
</style>
