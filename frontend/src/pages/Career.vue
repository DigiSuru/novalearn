<template>
  <div class="min-h-screen bg-gray-50 font-sans pb-20 selection:bg-blue-600 selection:text-white">
    
    <!-- Navigation -->
    <nav class="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-2 cursor-pointer" @click="$router.push('/')">
           <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-2xl italic shadow-lg shadow-blue-600/20">N</div>
           <span class="text-2xl font-black tracking-tighter text-gray-900 hidden sm:block">NovaLearn.</span>
        </div>
        <div class="flex items-center gap-6">
           <router-link to="/" class="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">Back to Catalog</router-link>
           <router-link to="/profile" class="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-black hover:bg-blue-600 transition-all shadow-md">My Workspace</router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="bg-gray-900 py-24 relative overflow-hidden text-center text-white">
       <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
       <div class="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
       <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

       <div class="relative z-10 max-w-3xl mx-auto px-6">
          <span class="bg-white/10 border border-white/20 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm mb-6 inline-block">Industry Verified</span>
          <h1 class="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">Your roadmap to a <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">six-figure career.</span></h1>
          <p class="text-xl text-gray-400 font-medium leading-relaxed">Don't just pass your exams. Follow our step-by-step guides designed by industry experts to land your dream role.</p>
       </div>
    </section>

    <!-- Roadmaps Grid -->
    <main class="max-w-7xl mx-auto px-6 mt-20">
       <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <!-- Roadmap 1: Full Stack -->
          <div class="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 group">
             <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-3xl font-black mb-8 group-hover:scale-110 transition-transform">💻</div>
             <h3 class="text-2xl font-black text-gray-900 mb-2">Full Stack Engineer</h3>
             <p class="text-gray-500 text-sm font-medium mb-8">Master both frontend and backend development to build scalable web applications.</p>
             
             <div class="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                   <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                   </div>
                   <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h4 class="font-black text-gray-900 text-sm">Frontend Basics</h4>
                      <p class="text-[10px] text-gray-500 uppercase font-bold mt-1">HTML, CSS, JS</p>
                   </div>
                </div>
                <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                   <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                   </div>
                   <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h4 class="font-black text-gray-900 text-sm">Modern Frameworks</h4>
                      <p class="text-[10px] text-gray-500 uppercase font-bold mt-1">Vue.js, React</p>
                   </div>
                </div>
                <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                   <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gray-200 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                   </div>
                   <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                      <h4 class="font-black text-gray-900 text-sm">Backend & DB</h4>
                      <p class="text-[10px] text-gray-500 uppercase font-bold mt-1">Node.js, SQL</p>
                   </div>
                </div>
             </div>
             
             <button @click="$router.push('/')" class="mt-10 w-full bg-gray-900 text-white py-4 rounded-xl font-black hover:bg-blue-600 transition-colors">Start This Path</button>
          </div>

          <!-- Roadmap 2: Data Science -->
          <div class="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 group">
             <div class="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 text-3xl font-black mb-8 group-hover:scale-110 transition-transform">📊</div>
             <h3 class="text-2xl font-black text-gray-900 mb-2">Data Scientist</h3>
             <p class="text-gray-500 text-sm font-medium mb-8">Learn Python, machine learning, and data visualization to analyze complex datasets.</p>
             
             <div class="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                   <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-purple-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                   </div>
                   <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h4 class="font-black text-gray-900 text-sm">Programming</h4>
                      <p class="text-[10px] text-gray-500 uppercase font-bold mt-1">Python, R</p>
                   </div>
                </div>
                <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                   <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gray-200 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                       <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                   </div>
                   <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                      <h4 class="font-black text-gray-900 text-sm">Data Manipulation</h4>
                      <p class="text-[10px] text-gray-500 uppercase font-bold mt-1">Pandas, SQL</p>
                   </div>
                </div>
                <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                   <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gray-200 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                   </div>
                   <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                      <h4 class="font-black text-gray-900 text-sm">Machine Learning</h4>
                      <p class="text-[10px] text-gray-500 uppercase font-bold mt-1">Scikit, TensorFlow</p>
                   </div>
                </div>
             </div>
             
             <button @click="$router.push('/')" class="mt-10 w-full bg-gray-900 text-white py-4 rounded-xl font-black hover:bg-purple-600 transition-colors">Start This Path</button>
          </div>

          <!-- Roadmap 3: Cyber Security -->
          <div class="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 group">
             <div class="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 text-3xl font-black mb-8 group-hover:scale-110 transition-transform">🛡️</div>
             <h3 class="text-2xl font-black text-gray-900 mb-2">Cyber Security</h3>
             <p class="text-gray-500 text-sm font-medium mb-8">Protect networks and data. Master ethical hacking and cryptography.</p>
             
             <div class="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                   <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-red-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                   </div>
                   <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h4 class="font-black text-gray-900 text-sm">Networking Basics</h4>
                      <p class="text-[10px] text-gray-500 uppercase font-bold mt-1">TCP/IP, Linux</p>
                   </div>
                </div>
                <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                   <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gray-200 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                       <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                   </div>
                   <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                      <h4 class="font-black text-gray-900 text-sm">Ethical Hacking</h4>
                      <p class="text-[10px] text-gray-500 uppercase font-bold mt-1">Kali, Metasploit</p>
                   </div>
                </div>
                <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                   <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gray-200 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                   </div>
                   <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                      <h4 class="font-black text-gray-900 text-sm">Cryptography</h4>
                      <p class="text-[10px] text-gray-500 uppercase font-bold mt-1">Encryption, Auth</p>
                   </div>
                </div>
             </div>
             
             <button @click="$router.push('/')" class="mt-10 w-full bg-gray-900 text-white py-4 rounded-xl font-black hover:bg-red-600 transition-colors">Start This Path</button>
          </div>

       </div>
    </main>
  </div>
</template>

<script setup>
// Static layout demonstrating premium UI for career roadmaps
</script>