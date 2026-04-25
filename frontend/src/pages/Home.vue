<template>
  <div class="min-h-screen bg-gray-50/50 font-sans flex flex-col">
    
    <!-- ADVANCED HERO SECTION -->
    <div class="relative bg-gray-950 overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div class="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen animate-pulse"></div>
      <div class="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen animate-pulse delay-1000"></div>
      <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20 pointer-events-none"></div>

      <!-- Header / Nav -->
      <header class="relative z-20 border-b border-white/10">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div class="flex items-center gap-3">
             <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
             </div>
             <div>
                <h1 class="font-black text-xl tracking-tight text-white leading-none">Suru <span class="text-gray-500 font-medium px-1">x</span> DP</h1>
                <p class="text-[9px] font-black text-blue-400 uppercase tracking-widest mt-0.5">Elite Tech Academy</p>
             </div>
          </div>
          <div class="flex items-center space-x-4">
            <router-link v-if="!user" to="/login" class="text-sm font-bold text-gray-300 hover:text-white transition-colors">Sign In</router-link>
            <router-link v-if="!user" to="/register" class="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">Enroll Now</router-link>
            <router-link v-if="user" to="/profile" class="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-white hover:text-gray-900 transition-all">My Vault &rarr;</router-link>
          </div>
        </div>
      </header>

      <!-- Hero Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
           <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
           <span class="text-xs font-black text-gray-300 uppercase tracking-widest">Admissions Open for 2026-2027</span>
        </div>
        
        <h2 class="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight mb-6">
          Dominate the Boards with<br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">CS with Suru & IP with DP</span>
        </h2>
        
        <p class="text-lg md:text-xl text-gray-400 font-medium max-w-3xl mb-10 leading-relaxed">
          The premier local institute for 11th & 12th graders. Master Computer Science and Informatics Practices with highly interactive labs, rich-text notes, mock exams, and personalized mentorship.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md mx-auto">
           <a href="#programs" class="bg-white text-gray-950 px-8 py-4 rounded-2xl font-black shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform flex items-center justify-center">
              Explore Programs
           </a>
           <router-link v-if="!user" to="/register" class="bg-gray-800/50 backdrop-blur-md border border-gray-700 text-white px-8 py-4 rounded-2xl font-black hover:bg-gray-800 hover:border-blue-500 transition-all flex items-center justify-center group">
              Start Learning Free 
              <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
           </router-link>
        </div>

        <!-- Live Stats Banner -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-20 w-full max-w-4xl border-t border-white/10 pt-10">
           <div class="text-center">
              <h4 class="text-3xl font-black text-white mb-1">100/100</h4>
              <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Highest Scorers</p>
           </div>
           <div class="text-center">
              <h4 class="text-3xl font-black text-white mb-1">500+</h4>
              <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Students</p>
           </div>
           <div class="text-center">
              <h4 class="text-3xl font-black text-white mb-1">Interactive</h4>
              <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Lab Sessions</p>
           </div>
           <div class="text-center">
              <h4 class="text-3xl font-black text-white mb-1">24/7</h4>
              <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Doubt Support</p>
           </div>
        </div>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <main class="flex-grow max-w-7xl mx-auto px-6 py-20 w-full" id="programs">
      
      <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
         <div>
            <h3 class="text-3xl font-black text-gray-900 tracking-tight mb-2">Our Academic Programs</h3>
            <p class="text-gray-500 font-medium text-sm">Select your stream to access the complete curriculum.</p>
         </div>
         <div class="relative w-full md:w-auto">
            <svg class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input v-model="searchQuery" @input="handleSearch" placeholder="Search syllabus or topics..." class="w-full md:w-80 bg-white border-2 border-gray-100 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-bold text-sm shadow-sm">
         </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <div v-for="i in 3" :key="i" class="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm h-72 animate-pulse flex flex-col justify-between">
            <div>
               <div class="w-20 h-6 bg-gray-200 rounded-md mb-4"></div>
               <div class="w-3/4 h-8 bg-gray-200 rounded-lg mb-2"></div>
               <div class="w-1/2 h-8 bg-gray-200 rounded-lg"></div>
            </div>
            <div class="w-full h-12 bg-gray-100 rounded-xl mt-8"></div>
         </div>
      </div>

      <!-- Course Grid -->
      <div v-else-if="courses.length > 0 && !searchQuery" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="course in courses" :key="course.id" class="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-blue-200 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
          <div>
            <div class="flex items-center justify-between mb-6">
               <span class="bg-blue-50 text-blue-700 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-blue-100">{{ course.short_name }}</span>
               <span class="text-gray-400 bg-gray-50 text-xs font-black px-3 py-1.5 rounded-lg">{{ course.total_semesters }} Chapters</span>
            </div>
            <h4 class="text-2xl font-black text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">{{ course.course_name }}</h4>
            <p class="text-sm text-gray-500 font-medium mt-4 line-clamp-2">Complete access to rich-text notes, video lectures, and active discussions.</p>
          </div>
          <button @click="$router.push(`/course/${course.id}`)" class="mt-8 w-full bg-gray-50 group-hover:bg-gray-900 group-hover:text-white text-gray-700 py-4 rounded-2xl font-black transition-colors flex items-center justify-center text-sm uppercase tracking-widest">
            Enter Workspace <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>

      <!-- Search Results Grid -->
      <div v-else-if="searchQuery" class="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
         <div v-if="searchResults.length === 0" class="text-center py-20 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
            <div class="text-5xl mb-4 grayscale opacity-50">🔍</div>
            <h4 class="font-black text-gray-900 text-xl">No topics found</h4>
            <p class="text-gray-500 font-medium text-sm mt-2">Try adjusting your search terms.</p>
         </div>
         <div v-for="res in searchResults" :key="res.id" @click="$router.push(`/course/${res.course_id}`)" class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer transition-all flex items-center justify-between group">
            <div class="flex items-center gap-4">
               <div class="w-12 h-12 bg-blue-50 rounded-xl text-blue-600 flex items-center justify-center text-xl border border-blue-100">📄</div>
               <div>
                  <h4 class="font-black text-gray-900 group-hover:text-blue-600 transition-colors">{{ res.subject_name }}</h4>
                  <div class="flex gap-2 mt-1">
                     <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded">{{ res.short_name }}</span>
                     <span class="text-[10px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 border border-amber-100 px-2 py-0.5 rounded" v-if="res.is_pro">Pro Exclusive</span>
                  </div>
               </div>
            </div>
            <svg class="w-5 h-5 text-gray-300 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
         </div>
      </div>

      <div v-else class="text-center py-20 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
         <p class="font-black text-gray-400">No programs currently available in the database.</p>
      </div>

      <!-- FACULTY / MENTORS SECTION -->
      <section class="mt-32 border-t border-gray-200 pt-20">
         <div class="text-center mb-16">
            <h3 class="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Meet the Masters</h3>
            <p class="text-gray-500 font-medium mt-4 max-w-2xl mx-auto">Learn directly from the local legends. Years of experience crafting board toppers and tech enthusiasts.</p>
         </div>

         <div class="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <!-- Suru Card -->
            <div class="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group hover:border-blue-300 transition-colors">
               <div class="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
               <div class="w-32 h-32 flex-shrink-0 bg-blue-600 rounded-full flex items-center justify-center font-black text-5xl text-white shadow-2xl border-4 border-white z-10">
                  S
               </div>
               <div class="text-center md:text-left z-10">
                  <h4 class="text-2xl font-black text-gray-900">Suru Sir</h4>
                  <p class="text-blue-600 font-black text-xs uppercase tracking-widest mt-1 mb-4">PGT - CS & IP </p>
                  <p class="text-gray-500 text-sm font-medium leading-relaxed">Expert in Python, SQL, and core CS concepts. Suru Sir's logical approach makes complex programming feel like a game. Guaranteed logic builder.</p>
               </div>
            </div>

            <!-- DP Card -->
            <div class="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group hover:border-purple-300 transition-colors">
               <div class="absolute top-0 right-0 w-40 h-40 bg-purple-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
               <div class="w-32 h-32 flex-shrink-0 bg-purple-600 rounded-full flex items-center justify-center font-black text-5xl text-white shadow-2xl border-4 border-white z-10">
                  DP
               </div>
               <div class="text-center md:text-left z-10">
                  <h4 class="text-2xl font-black text-gray-900">DP Sir</h4>
                  <p class="text-purple-600 font-black text-xs uppercase tracking-widest mt-1 mb-4">PGT - IP</p>
                  <p class="text-gray-500 text-sm font-medium leading-relaxed">Master of Pandas, DataFrames, and Data Handling. DP Sir simplifies data science concepts for 12th graders, ensuring 100% board readiness.</p>
               </div>
            </div>
         </div>
      </section>

    </main>

    <!-- ADVANCED MEGA FOOTER -->
    <footer class="bg-gray-950 text-white mt-auto pt-24 pb-12 relative overflow-hidden">
      <!-- Background Footer Accents -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
      
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
         
         <!-- Brand Column -->
         <div class="lg:pr-8">
            <div class="flex items-center gap-3 mb-6">
               <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
               </div>
               <h3 class="font-black text-xl tracking-tight leading-none">Suru <span class="text-gray-500 font-medium px-1">x</span> DP</h3>
            </div>
            <p class="text-gray-400 text-sm font-medium leading-relaxed mb-6">
               The premier local institute dedicated to dominating board exams. We transform local students into global tech leaders through expert CS & IP mentorship.
            </p>
            <div class="flex space-x-4">
               <a href="#" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
               <a href="#" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-600 transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            </div>
         </div>

         <!-- Academics Column -->
         <div>
            <h4 class="font-black text-white text-lg mb-6">Academics</h4>
            <ul class="space-y-4">
               <li><a href="#" class="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center"><svg class="w-3 h-3 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg> Class 11 - Computer Science</a></li>
               <li><a href="#" class="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center"><svg class="w-3 h-3 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg> Class 12 - Computer Science</a></li>
               <li><a href="#" class="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center"><svg class="w-3 h-3 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg> Class 11 - Info. Practices</a></li>
               <li><a href="#" class="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center"><svg class="w-3 h-3 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg> Class 12 - Info. Practices</a></li>
            </ul>
         </div>

         <!-- Platform Column -->
         <div>
            <h4 class="font-black text-white text-lg mb-6">Digital Platform</h4>
            <ul class="space-y-4">
               <li><router-link to="/login" class="text-sm font-bold text-gray-400 hover:text-white transition-colors">Student Login</router-link></li>
               <li><router-link to="/register" class="text-sm font-bold text-gray-400 hover:text-white transition-colors">New Registration</router-link></li>
               <li><router-link to="/profile" class="text-sm font-bold text-gray-400 hover:text-white transition-colors">Student Vault (Dashboard)</router-link></li>
               <li><router-link to="/pricing" class="text-sm font-bold text-amber-500 hover:text-amber-400 transition-colors">Pro Elite Features</router-link></li>
            </ul>
         </div>

         <!-- Contact Column -->
         <div>
            <h4 class="font-black text-white text-lg mb-6">Contact Us</h4>
            <ul class="space-y-5">
               <li class="flex items-start text-gray-400">
                  <svg class="w-5 h-5 mr-3 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span class="text-sm font-bold">Makrana, 341505</span>
               </li>
               <li class="flex items-center text-gray-400 hover:text-white transition-colors">
                  <svg class="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <a href="tel:+919876543210" class="text-sm font-bold">+91 9252145887</a>
                  <a href="tel:+919876543210" class="text-sm font-bold">+91 7427099478</a>
               </li>
               <li class="flex items-center text-gray-400 hover:text-white transition-colors">
                  <svg class="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <a href="mailto:admissions@surudpacademy.com" class="text-sm font-bold">admissions@surudpacademy.com</a>
               </li>
            </ul>
         </div>

      </div>

      <div class="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
         <p class="text-xs font-bold text-gray-500 uppercase tracking-widest">© {{ new Date().getFullYear() }} Suru x DP Academy. All rights reserved.</p>
         <div class="flex space-x-6">
            <a href="#" class="text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">Privacy Policy</a>
            <a href="#" class="text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">Terms of Service</a>
         </div>
      </div>
    </footer>
  </div>
  <div class="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
         <p class="text-xs font-bold text-gray-500 uppercase tracking-widest">© {{ new Date().getFullYear() }} Made with &hearts; by Suru;</p>
   </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const user = ref(null);
const courses = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const searchResults = ref([]);
let searchTimeout;

const handleSearch = () => {
    clearTimeout(searchTimeout);
    if (!searchQuery.value) {
        searchResults.value = [];
        return;
    }
    searchTimeout = setTimeout(async () => {
        try {
            const res = await api.search(searchQuery.value);
            searchResults.value = res.data.data;
        } catch (error) {
            console.error("Search failed", error);
        }
    }, 300);
};

onMounted(async () => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) user.value = JSON.parse(savedUser);
  
  try {
    const res = await api.getCourses();
    courses.value = res.data.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Smooth scrolling for anchor links */
html { scroll-behavior: smooth; }
</style>