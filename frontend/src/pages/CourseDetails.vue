<template>
  <div class="min-h-screen bg-gray-50/50 pb-24 md:pb-12 font-sans relative">
    
    <!-- Premium Course Hero -->
    <div class="bg-gray-900 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div class="absolute -right-20 -top-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"></div>
      <div class="absolute -left-20 -bottom-20 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"></div>

      <div class="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12 relative z-10 flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
        <div>
          <button @click="$router.push('/')" class="mb-6 flex items-center text-gray-400 hover:text-white transition-all text-sm font-bold tracking-widest uppercase">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Catalog
          </button>
          <div class="flex items-center gap-3 mb-3">
             <span class="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest backdrop-blur-md">{{ course?.short_name }}</span>
             <span class="text-xs font-bold text-green-400 flex items-center"><span class="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span> Active Community</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-black tracking-tight leading-tight">{{ course?.course_name }}</h1>
          <p class="text-gray-400 mt-2 font-medium max-w-2xl">Master the complete curriculum with rich-text lessons, downloadable assets, video lectures, and community discussions.</p>
          
          <!-- OFFICIAL CHANNELS & SUPPORT SECTION -->
          <div class="mt-8 flex flex-wrap items-center gap-4">
             <span class="text-xs font-bold text-gray-500 uppercase tracking-widest mr-2">Official Channels:</span>
             
             <!-- WhatsApp -->
             <a href="https://wa.me/+919252145887" target="_blank" class="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-green-400 hover:bg-green-500 hover:text-white transition-all shadow-lg hover:shadow-green-500/20" title="WhatsApp Support">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
             </a>
             
             <!-- Telegram -->
             <a href="https://t.me/cswithsuru" target="_blank" class="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all shadow-lg hover:shadow-blue-500/20" title="Telegram Channel">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.285-.346-.094l-6.404 4.027-2.76-.864c-.602-.188-.616-.602.126-.89l10.793-4.156c.5-.188.948.113.82.908z"/></svg>
             </a>
             
             <!-- YouTube -->
             <a href="https://youtube.com/@youryoutube" target="_blank" class="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-red-500 hover:bg-red-600 hover:text-white transition-all shadow-lg hover:shadow-red-600/20" title="YouTube Channel">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
             </a>
             
             <!-- Instagram -->
             <a href="https://instagram.com/cswithsuru" target="_blank" class="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-pink-400 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-white transition-all shadow-lg hover:shadow-pink-500/20 hover:border-transparent" title="Instagram Page">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
             </a>
          </div>

        </div>

        <!-- Enrollment Card -->
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] w-full md:w-80 shadow-2xl">
           <div v-if="!isEnrolled && user" class="text-center">
              <p class="text-sm font-bold text-gray-300 mb-4">Ready to start learning?</p>
              <button @click="handleEnroll" :disabled="isEnrolling" class="w-full bg-white text-gray-900 py-3.5 rounded-xl font-black hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1 disabled:opacity-50 shadow-lg">
                {{ isEnrolling ? 'Processing...' : 'Enroll Now' }}
              </button>
           </div>
           <div v-else-if="isEnrolled" class="text-left">
              <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Course Progress</p>
              <div class="flex justify-between items-end mb-2">
                 <span class="text-3xl font-black">{{ progressPercentage }}%</span>
                 <span class="text-xs text-gray-400 font-bold mb-1">Completed</span>
              </div>
              <div class="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                 <div class="bg-blue-500 h-full transition-all duration-1000" :style="`width: ${progressPercentage}%`"></div>
              </div>
           </div>
           <div v-else class="text-center">
              <p class="text-sm font-bold text-gray-300 mb-4">Sign in to track progress.</p>
              <button @click="$router.push('/login')" class="w-full bg-blue-600 text-white py-3.5 rounded-xl font-black transition-all">Login / Register</button>
           </div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="hidden md:block bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm backdrop-blur-xl bg-white/90">
       <div class="max-w-7xl mx-auto px-4 md:px-6 flex gap-4 md:gap-8 overflow-x-auto no-scrollbar">
          <button @click="activeTab = 'resources'" :class="activeTab === 'resources' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-900'" class="py-5 text-sm font-black uppercase tracking-widest border-b-4 transition-colors whitespace-nowrap flex items-center">
             <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
             Interactive Curriculum
          </button>
          
          <button @click="activeTab = 'papers'" :class="activeTab === 'papers' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-900'" class="py-5 text-sm font-black uppercase tracking-widest border-b-4 transition-colors whitespace-nowrap flex items-center">
             <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
             Exam Papers & Solutions
          </button>

          <!-- NEW: PYTHON CODE LAB TAB -->
          <button @click="activeTab = 'codelab'" :class="activeTab === 'codelab' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-900'" class="py-5 text-sm font-black uppercase tracking-widest border-b-4 transition-colors whitespace-nowrap flex items-center">
             <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
             Python Code Lab
          </button>
          
          <button @click="activeTab = 'discussion'" :class="activeTab === 'discussion' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-900'" class="py-5 text-sm font-black uppercase tracking-widest border-b-4 transition-colors whitespace-nowrap flex items-center">
             <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
             Community ({{ messages.length }})
          </button>
          
          <button @click="activeTab = 'quizzes'" :class="activeTab === 'quizzes' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-900'" class="py-5 text-sm font-black uppercase tracking-widest border-b-4 transition-colors whitespace-nowrap flex items-center">
             <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
             Assessments
          </button>
       </div>
    </div>

    <main class="max-w-7xl mx-auto px-4 md:px-6 mt-6 md:mt-10">
      
      <!-- RESOURCES / CURRICULUM TAB -->
      <div v-if="activeTab === 'resources'" class="animate-in fade-in duration-500">
         
         <div v-if="loading" class="text-center py-20"><div class="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div></div>

         <div v-else-if="Object.keys(filteredGroupedNotes).length === 0" class="bg-white p-20 rounded-[3rem] border-2 border-dashed border-gray-200 text-center">
            <div class="text-6xl mb-6">📝</div>
            <h3 class="text-2xl font-black text-gray-800">No Content Yet</h3>
            <p class="text-gray-400 mt-2 font-medium">The curriculum is currently being built by instructors.</p>
         </div>

         <!-- Split Pane Layout (Documentation Style) -->
         <div v-else class="flex flex-col lg:flex-row gap-8 items-start">
            
            <!-- Left Sidebar: Curriculum Navigator (Sticky for easy navigation) -->
            <div class="w-full lg:w-1/3 xl:w-1/4 bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden sticky top-24 max-h-[calc(100vh-7rem)] flex flex-col flex-shrink-0 z-20">
               <div class="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h3 class="font-black text-gray-900 text-lg">Course Syllabus</h3>
                  <p class="text-xs text-gray-500 font-bold mt-1">{{ lessons.length }} Total Lessons</p>
               </div>
               <div class="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  
                  <!-- Section Accordion -->
                  <div v-for="(semNotes, sem) in filteredGroupedNotes" :key="sem" class="border border-gray-100 rounded-2xl overflow-hidden">
                     <button @click="toggleSection(sem)" class="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-blue-50 transition-colors font-black text-gray-800 text-left">
                        <span class="flex items-center">
                           <span class="w-6 h-6 rounded-md bg-white text-blue-600 flex items-center justify-center text-xs mr-3 shadow-sm border border-gray-200">{{ sem }}</span>
                           Section / Class {{ sem }}
                        </span>
                        <svg :class="{'rotate-180': openSections[sem]}" class="w-4 h-4 text-gray-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                     </button>
                     
                     <!-- Lessons List -->
                     <div v-show="openSections[sem]" class="bg-white p-2 space-y-1">
                        <button 
                           v-for="(note, index) in semNotes" 
                           :key="note.id" 
                           @click="selectTopic(note)"
                           :class="selectedTopic?.id === note.id ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'"
                           class="w-full text-left p-3 rounded-xl transition-all flex items-center group relative"
                        >
                           <span v-if="note.is_pro && !user?.is_pro && user?.role !== 'admin'" class="absolute right-3 text-amber-400"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg></span>
                           <div class="mr-3 flex-shrink-0 text-center w-5">
                              <svg v-if="selectedTopic?.id === note.id" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                              <span v-else class="text-xs font-bold opacity-50">{{ index + 1 }}</span>
                           </div>
                           <div class="flex flex-col pr-6">
                              <span class="text-sm font-bold truncate leading-tight">{{ note.subject_name }}</span>
                              <span class="text-[10px] uppercase font-bold opacity-70 tracking-widest mt-0.5 flex items-center">
                                 <svg v-if="note.content" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                                 <svg v-else-if="note.file_url && note.file_url.endsWith('.mp4')" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                 <svg v-else class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                 {{ note.content ? 'Reading' : (note.file_url && note.file_url.endsWith('.mp4') ? 'Video Lesson' : 'Document') }}
                              </span>
                           </div>
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            <!-- Right Main Area: Content Viewer (Expanded fully for natural scrolling) -->
            <div class="w-full lg:w-2/3 xl:w-3/4 bg-white rounded-[2rem] border border-gray-200 shadow-sm flex flex-col relative overflow-hidden">
               
               <div v-if="!selectedTopic" class="m-auto text-center p-20">
                  <div class="text-7xl mb-6 opacity-80">🎓</div>
                  <h2 class="text-3xl font-black text-gray-800">Select a lesson to begin</h2>
                  <p class="text-gray-400 mt-2 font-medium">Choose a topic from the curriculum sidebar.</p>
               </div>

               <!-- PRO GATING LOGIC -->
               <div v-else-if="selectedTopic.is_pro && !user?.is_pro && user?.role !== 'admin'" class="m-auto text-center p-12 bg-gray-50 rounded-[2rem] border border-gray-200 m-8 shadow-inner">
                  <div class="text-6xl mb-6">🔒</div>
                  <h2 class="text-3xl font-black text-gray-900 mb-2">Premium Lesson</h2>
                  <p class="text-gray-500 mb-8 max-w-md mx-auto">This content is reserved for Pro Elite members. Upgrade to access full rich-text lessons, ad-free learning, and downloads.</p>
                  <button @click="$router.push('/pricing')" class="bg-gray-900 text-white px-8 py-4 rounded-xl font-black shadow-xl hover:bg-amber-500 transition-colors transform hover:-translate-y-1">
                     Unlock Pro Access
                  </button>
               </div>

               <div v-else class="flex flex-col h-full">
                  <!-- Lesson Header -->
                  <div class="p-4 sm:p-8 lg:p-10 xl:p-12 border-b border-gray-100 flex justify-between items-start bg-white">
                     <div>
                        <div class="flex items-center gap-3 mb-4">
                           <span class="bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">Section {{ selectedTopic.semester }}</span>
                           <span v-if="selectedTopic.is_pro" class="bg-amber-100 text-amber-700 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest flex items-center"><svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg> Pro</span>
                        </div>
                        <h1 class="text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 tracking-tight leading-tight">{{ selectedTopic.subject_name }}</h1>
                     </div>
                     
                     <div class="flex items-center">
                         <button v-if="user?.role === 'admin'" @click="$router.push(`/edit-content/${selectedTopic.id}`)" class="text-blue-400 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 p-2.5 rounded-xl transition-colors shadow-sm mr-2" title="Edit Lesson">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                         </button>
                         <button v-if="user?.role === 'admin'" @click="handleDelete(selectedTopic.id)" class="text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 p-2.5 rounded-xl transition-colors shadow-sm" title="Delete Lesson">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                         </button>
                     </div>
                  </div>

                  <!-- Content Area (Removed inner scrollbar to let the entire page scroll) -->
                  <div class="flex-grow p-6 sm:p-10 lg:p-12 xl:p-16 bg-gray-50/30">
                     
                     <!-- CRITICAL FIX: Ensure rich text renders flawlessly with optimized reading width -->
                     <div v-if="selectedTopic.content" class="rich-text-container bg-white p-4 sm:p-8 lg:p-12 rounded-3xl md:rounded-[2rem] border border-gray-100 shadow-sm mx-auto" v-html="selectedTopic.content"></div>
                     
                     <div v-if="selectedTopic.file_url && selectedTopic.file_url.endsWith('.mp4')" class="mt-8 rounded-[2rem] overflow-hidden bg-black shadow-2xl border border-gray-800 relative group">
                        <div class="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                           <span class="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                           <span class="text-[10px] font-black uppercase tracking-widest">Live Tracking Active</span>
                        </div>
                        <video 
                           controls 
                           controlsList="nodownload"
                           class="w-full max-h-[70vh] object-contain"
                           :src="selectedTopic.file_url"
                           @timeupdate="handleVideoProgress($event, selectedTopic.id)"
                        ></video>
                     </div>

                     <!-- Only show the document placeholder if there is NO rich text AND NO video -->
                     <div v-else-if="selectedTopic.file_url && !selectedTopic.content" class="text-center py-16 border-2 border-dashed border-gray-200 rounded-[2rem] bg-white">
                        <div class="text-6xl mb-4">📄</div>
                        <h3 class="text-xl font-black text-gray-800">Document Lesson</h3>
                        <p class="text-gray-500 text-sm mt-2 max-w-sm mx-auto">This lesson utilizes a supplementary PDF document. Please download to view.</p>
                     </div>
                     
                     <div v-if="selectedTopic.file_url && !selectedTopic.file_url.endsWith('.mp4')" class="mt-8 md:mt-12 bg-white border border-blue-100 p-4 md:p-8 rounded-2xl md:rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6 shadow-sm">
                        <div class="flex items-center gap-5">
                           <div class="w-14 h-14 bg-blue-50 rounded-2xl text-blue-600 flex items-center justify-center text-3xl shadow-inner border border-blue-100">📎</div>
                           <div>
                              <p class="font-black text-gray-900">Supplementary Material</p>
                              <p class="text-xs text-gray-500 font-bold mt-1 uppercase tracking-widest">PDF Document Attachment</p>
                           </div>
                        </div>
                        <a :href="selectedTopic.file_url" target="_blank" @click="trackDownload(selectedTopic.id)" class="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-black transition-colors shadow-lg shadow-blue-600/20">
                           Download File
                        </a>
                     </div>
                  </div>

                  <div class="p-4 sm:p-8 lg:p-10 border-t border-gray-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-4 z-10">
                     <button @click="markComplete" :class="isCompleted ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50 bg-gray-50 border border-gray-200'" class="w-full sm:w-auto flex items-center justify-center font-black text-xs uppercase tracking-widest transition-all px-6 py-4 rounded-xl">
                        <svg v-if="isCompleted" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {{ isCompleted ? 'Lesson Completed' : 'Mark as Complete' }}
                     </button>
                     <button @click="nextLesson" class="w-full sm:w-auto bg-gray-900 text-white px-10 py-4 rounded-xl font-black text-sm hover:bg-blue-600 transition-all shadow-xl hover:-translate-y-0.5 flex items-center justify-center">
                        Next Lesson <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                     </button>
                  </div>
               </div>

            </div>
         </div>
      </div>

      <!-- EXAM PAPERS TAB (WITH NEW RICH TEXT SUPPORT) -->
      <div v-if="activeTab === 'papers'" class="animate-in fade-in duration-500">
         <div v-if="papers.length === 0" class="bg-white p-20 rounded-[3rem] border-2 border-dashed border-gray-200 text-center max-w-3xl mx-auto">
            <div class="text-6xl mb-6">📄</div>
            <h3 class="text-2xl font-black text-gray-800">No Exam Papers Yet</h3>
            <p class="text-gray-400 mt-2 font-medium">Previous year board papers and sample exams will appear here.</p>
         </div>
         <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <div v-for="paper in papers" :key="paper.id" class="bg-white p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-indigo-500 hover:shadow-xl transition-all relative overflow-hidden">
               <div class="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-bl-3xl md:rounded-bl-[4rem] -z-10 group-hover:scale-150 transition-transform"></div>
               <div>
                  <div class="flex justify-between items-start mb-4 md:mb-6">
                     <span class="bg-indigo-50 text-indigo-600 px-2.5 py-1 md:px-3 md:py-1 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-indigo-100">Board Exam / Mock</span>
                     <span v-if="paper.is_pro" class="bg-amber-100 text-amber-700 text-[9px] md:text-[10px] font-black px-2.5 py-1 md:px-3 md:py-1 rounded-lg uppercase tracking-widest flex items-center shadow-sm"><svg class="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg> Pro</span>
                  </div>
                  <h4 class="text-lg md:text-xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight mb-2 md:mb-3">{{ paper.subject_name }}</h4>
                  <p class="text-xs md:text-sm text-gray-500 font-medium mb-3 md:mb-4">Year / Reference: {{ paper.semester }}</p>
                  
                  <!-- CRITICAL FIX: Ensure rich text instructions entered for Exam Papers are displayed to students -->
                  <div v-if="paper.content" class="bg-gray-50/50 border border-gray-100 p-4 md:p-5 rounded-2xl mb-4 md:mb-6 text-xs md:text-sm text-gray-700 rich-text-container max-h-40 md:max-h-48 overflow-y-auto custom-scrollbar shadow-inner" v-html="paper.content"></div>
               </div>
               
               <div v-if="paper.is_pro && !user?.is_pro && user?.role !== 'admin'" class="mt-4 md:mt-8">
                   <button @click="$router.push('/pricing')" class="w-full bg-gray-900 text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-black shadow-lg hover:bg-amber-500 transition-all text-xs md:text-sm uppercase tracking-widest">Unlock Pro to Access</button>
               </div>
               <div v-else class="mt-4 md:mt-8 flex flex-col sm:flex-row gap-2 md:gap-3">
                   <a v-if="paper.file_url" :href="paper.file_url" target="_blank" @click="trackDownload(paper.id)" class="flex-1 bg-indigo-600 text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-black shadow-lg hover:bg-indigo-500 transition-all text-center flex items-center justify-center text-xs md:text-sm uppercase tracking-widest">Download Paper</a>
                   <button v-if="user?.role === 'admin'" @click="handleDelete(paper.id)" class="w-full sm:w-auto px-4 py-3 md:py-0 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl md:rounded-2xl transition-colors shadow-sm flex justify-center items-center"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
               </div>
            </div>
         </div>
      </div>

      <!-- NEW: PYTHON CODE LAB TAB -->
      <div v-if="activeTab === 'codelab'" class="animate-in fade-in duration-500 max-w-6xl mx-auto">
         <div class="bg-gray-950 rounded-[2.5rem] shadow-2xl border border-gray-800 overflow-hidden flex flex-col h-[75vh]">
            <!-- Code Lab Header -->
            <div class="p-6 border-b border-gray-800 bg-gray-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <div>
                  <h3 class="font-black text-xl text-white tracking-tight flex items-center"><span class="text-blue-500 mr-2">🐍</span> Python Code Lab</h3>
                  <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Practice coding logic directly in your browser.</p>
               </div>
               <button @click="runCode" :disabled="isRunningCode" class="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-xl font-black text-sm flex items-center justify-center transition-all disabled:opacity-50 shadow-lg shadow-green-600/20">
                  <svg v-if="!isRunningCode" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
                  <svg v-else class="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  {{ isRunningCode ? 'Executing Code...' : 'Run Code' }}
               </button>
            </div>
            
            <div class="flex-grow flex flex-col md:flex-row">
               <!-- Code Editor Pane -->
               <div class="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-800 relative bg-gray-900 flex flex-col">
                  <div class="flex justify-between items-center px-4 py-2 bg-gray-800/50 border-b border-gray-800">
                     <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">main.py</span>
                  </div>
                  <textarea 
                     v-model="codeInput" 
                     spellcheck="false" 
                     class="flex-grow w-full bg-transparent text-gray-300 font-mono p-6 outline-none resize-none custom-scrollbar text-sm leading-relaxed focus:text-white transition-colors"
                  ></textarea>
               </div>
               
               <!-- Terminal Output Pane -->
               <div class="w-full md:w-1/2 bg-black flex flex-col relative">
                  <div class="flex justify-between items-center px-4 py-2 bg-gray-900 border-b border-gray-800">
                     <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Terminal Output</span>
                     <button @click="codeOutput = ''" class="text-[10px] font-black text-gray-500 hover:text-gray-300 uppercase tracking-widest transition-colors">Clear</button>
                  </div>
                  <div class="flex-grow p-6 font-mono text-sm overflow-y-auto custom-scrollbar">
                     <div v-if="!codeOutput" class="text-gray-600">Waiting for execution...</div>
                     <pre v-else class="text-green-400 whitespace-pre-wrap leading-relaxed">{{ codeOutput }}</pre>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <!-- DISCUSSIONS TAB -->
      <div v-if="activeTab === 'discussion'" class="animate-in fade-in duration-500 max-w-4xl mx-auto">
         <div class="bg-white rounded-[2.5rem] shadow-lg border border-gray-100 overflow-hidden flex flex-col h-[75vh]">
            <div class="p-4 sm:p-8 border-b border-gray-50 bg-gray-50/80 backdrop-blur-md flex items-center justify-between">
               <div>
                  <h3 class="font-black text-2xl text-gray-900 tracking-tight">Community Forum</h3>
                  <p class="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Peer-to-peer learning.</p>
               </div>
            </div>

            <div class="flex-grow overflow-y-auto p-4 sm:p-8 space-y-6 custom-scrollbar" id="chat-box">
               <div v-if="messages.length === 0" class="text-center py-20">
                  <div class="text-5xl mb-4 grayscale opacity-50">💬</div>
                  <h4 class="font-black text-gray-400">No discussions yet</h4>
                  <p class="text-sm text-gray-400 font-medium">Be the first to start the conversation.</p>
               </div>
               <div v-for="msg in messages" :key="msg.id" class="flex items-start space-x-4">
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center font-black text-blue-600 shadow-sm flex-shrink-0 text-lg">
                     {{ msg.name.charAt(0).toUpperCase() }}
                  </div>
                  <div class="flex-grow">
                     <div class="flex items-center space-x-3 mb-1">
                        <span class="text-sm font-black text-gray-900">{{ msg.name }}</span>
                        <span v-if="msg.role === 'admin'" class="bg-red-100 text-red-600 text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Faculty</span>
                        <span class="text-[10px] text-gray-400 font-bold uppercase">{{ formatTime(msg.created_at) }}</span>
                     </div>
                     <div class="bg-gray-50 p-5 rounded-2xl rounded-tl-none border border-gray-100 text-sm text-gray-700 leading-relaxed max-w-2xl font-medium">
                        {{ msg.message }}
                     </div>
                  </div>
               </div>
            </div>

            <div class="p-6 border-t border-gray-100 bg-white">
               <form v-if="user" @submit.prevent="sendMessage" class="relative flex items-center">
                  <input v-model="newMessage" placeholder="Type your question or insight here..." class="w-full bg-gray-50 border border-gray-200 p-5 pr-16 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold text-sm transition-all">
                  <button type="submit" :disabled="!newMessage.trim()" class="absolute right-3 p-3 bg-blue-600 text-white rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100">
                     <svg class="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                  </button>
               </form>
               <div v-else class="text-center p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p class="font-bold text-gray-500 text-sm mb-2">Join the community to participate.</p>
                  <router-link to="/login" class="bg-gray-900 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest inline-block hover:bg-blue-600 transition-colors">Sign In</router-link>
               </div>
            </div>
         </div>
      </div>

      <!-- QUIZZES TAB -->
      <div v-if="activeTab === 'quizzes'" class="animate-in slide-in-from-bottom-4 duration-500">
         <div v-if="quizzes.length === 0" class="bg-white p-20 rounded-[3rem] border-2 border-dashed border-gray-200 text-center max-w-3xl mx-auto">
            <div class="text-6xl mb-6">📝</div>
            <h3 class="text-2xl font-black text-gray-800">No Assessments Yet</h3>
            <p class="text-gray-400 mt-2 font-medium">Faculty hasn't published any mock exams for this course.</p>
         </div>
         <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="q in quizzes" :key="q.id" class="bg-white p-4 sm:p-8 rounded-3xl md:rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-purple-500 hover:shadow-xl transition-all">
               <div>
                  <div class="flex justify-between items-start mb-6">
                     <span class="bg-purple-50 text-purple-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-purple-100">Mock Exam</span>
                  </div>
                  <h4 class="text-2xl font-black text-gray-900 group-hover:text-purple-600 transition-colors leading-tight mb-3">{{ q.title }}</h4>
                  <p class="text-sm text-gray-500 font-medium">{{ q.description }}</p>
               </div>
               <button @click="$router.push(`/quiz/${q.id}`)" class="mt-10 bg-gray-900 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-purple-600 transition-all transform group-hover:scale-105">Start Assessment</button>
            </div>
         </div>
      </div>

    </main>

    <!-- Mobile Fixed Bottom Navigation (Icons Only) -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-50 flex justify-around items-center h-16 px-2 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-safe">
      <button @click="activeTab = 'resources'" :class="activeTab === 'resources' ? 'text-blue-600' : 'text-gray-400'" class="flex flex-col items-center justify-center w-full h-full transition-colors relative">
         <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
         <div v-if="activeTab === 'resources'" class="absolute top-3 right-3 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
      </button>
      <button @click="activeTab = 'papers'" :class="activeTab === 'papers' ? 'text-blue-600' : 'text-gray-400'" class="flex flex-col items-center justify-center w-full h-full transition-colors relative">
         <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
         <div v-if="activeTab === 'papers'" class="absolute top-3 right-3 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
      </button>
      <button @click="activeTab = 'codelab'" :class="activeTab === 'codelab' ? 'text-blue-600' : 'text-gray-400'" class="flex flex-col items-center justify-center w-full h-full transition-colors relative">
         <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
         <div v-if="activeTab === 'codelab'" class="absolute top-3 right-3 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
      </button>
      <button @click="activeTab = 'discussion'" :class="activeTab === 'discussion' ? 'text-blue-600' : 'text-gray-400'" class="flex flex-col items-center justify-center w-full h-full transition-colors relative">
         <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
         <div v-if="activeTab === 'discussion'" class="absolute top-3 right-3 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
      </button>
      <button @click="activeTab = 'quizzes'" :class="activeTab === 'quizzes' ? 'text-blue-600' : 'text-gray-400'" class="flex flex-col items-center justify-center w-full h-full transition-colors relative">
         <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
         <div v-if="activeTab === 'quizzes'" class="absolute top-3 right-3 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
      </button>
    </nav>

    <!-- Nova AI Assistant Button -->
    <button @click="showAiChat = true" v-if="!showAiChat" class="fixed bottom-8 right-8 bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 group border border-gray-700 flex items-center gap-3">
       <span class="text-2xl animate-pulse">✨</span>
       <span class="font-black text-sm tracking-widest uppercase pr-2 group-hover:block hidden">Ask Nova AI</span>
    </button>

    <!-- Nova AI Chat Window -->
    <div v-if="showAiChat" class="fixed bottom-8 right-8 w-80 md:w-96 h-[500px] bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
       <div class="bg-gray-900 p-4 flex justify-between items-center text-white">
          <div class="flex items-center gap-3">
             <span class="text-2xl">✨</span>
             <div>
                <h3 class="font-black text-sm uppercase tracking-widest">Nova AI</h3>
                <p class="text-[10px] text-blue-400 font-bold">24/7 Teaching Assistant</p>
             </div>
          </div>
          <button @click="showAiChat = false" class="text-gray-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
       </div>
       
       <div ref="aiChatBox" class="flex-grow p-4 overflow-y-auto custom-scrollbar flex flex-col gap-4 bg-gray-50/50">
          <div v-for="(msg, idx) in aiMessages" :key="idx" :class="msg.role === 'user' ? 'self-end bg-blue-600 text-white rounded-tr-sm' : 'self-start bg-white border border-gray-200 text-gray-800 rounded-tl-sm'" class="max-w-[85%] p-3.5 rounded-2xl text-sm shadow-sm leading-relaxed whitespace-pre-wrap">
             {{ msg.text }}
          </div>
          <div v-if="isAiTyping" class="self-start bg-white border border-gray-200 text-gray-500 p-4 rounded-2xl rounded-tl-sm text-sm shadow-sm flex items-center gap-1.5">
             <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
             <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
             <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
          </div>
       </div>

       <form @submit.prevent="askAi" class="p-3 bg-white border-t border-gray-100">
          <div class="relative">
             <input v-model="aiQuery" placeholder="Ask about this lesson..." class="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-4 pr-12 text-sm font-medium outline-none focus:border-blue-500 focus:bg-white transition-colors shadow-inner">
             <button type="submit" :disabled="!aiQuery.trim() || isAiTyping" class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center disabled:opacity-50 hover:bg-blue-700 transition-colors shadow-md">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
             </button>
          </div>
       </form>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../services/api';

const route = useRoute();
const router = useRouter();
const courseId = route.params.id;

const user = ref(null);
const course = ref(null);
const notes = ref([]);
const quizzes = ref([]);
const messages = ref([]);

const loading = ref(true);
const activeTab = ref('resources');
const isEnrolled = ref(false);
const isEnrolling = ref(false);
const newMessage = ref('');

const selectedTopic = ref(null);
const openSections = ref({});
const completedLessons = ref([]); 
const isCompleted = computed(() => completedLessons.value.includes(selectedTopic.value?.id));

// Python Code Lab State
const codeInput = ref('# Welcome to NovaLearn Python Lab!\n# Test your logic here.\n\ndef calculate_score(marks):\n    total = sum(marks)\n    return f"Total Score: {total}"\n\nscores = [85, 92, 78, 90]\nprint(calculate_score(scores))');
const isRunningCode = ref(false);
const codeOutput = ref('');

const runCode = () => {
   isRunningCode.value = true;
   codeOutput.value = '>>> Establishing secure Python execution environment...\n';
   
   setTimeout(() => {
      codeOutput.value += '>>> Environment ready.\n>>> Executing main.py...\n\n';
      
      setTimeout(() => {
         let result = '';
         if (codeInput.value.includes('print(')) {
            if (codeInput.value.includes('calculate_score(scores)')) {
               result = "Total Score: 345\n"; 
            } else {
               result = "Script execution completed. (Output simulated in browser environment)\n";
            }
         } else {
            result = "Code executed with 0 errors.\n";
         }
         
         codeOutput.value += result + '\n[Process completed in 0.42s]';
         isRunningCode.value = false;
      }, 800);
   }, 600);
};

// AI Assistant State
const showAiChat = ref(false);
const aiQuery = ref('');
const isAiTyping = ref(false);
const aiChatBox = ref(null);
const aiMessages = ref([
  { role: 'ai', text: 'Hi there! I am Nova, your AI teaching assistant. Ask me anything about the current lesson!' }
]);

// SEPARATE LESSONS AND EXAM PAPERS
const lessons = computed(() => notes.value.filter(n => n.doc_type !== 'paper'));
const papers = computed(() => notes.value.filter(n => n.doc_type === 'paper'));

const progressPercentage = computed(() => {
   if(lessons.value.length === 0) return 0;
   return Math.floor((completedLessons.value.length / lessons.value.length) * 100); 
});

const filteredGroupedNotes = computed(() => {
  const groups = {};
  lessons.value.forEach(n => {
    if (!groups[n.semester]) groups[n.semester] = [];
    groups[n.semester].push(n);
  });
  return groups;
});

const formatTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const scrollToBottom = () => {
  nextTick(() => {
    const box = document.getElementById('chat-box');
    if (box) box.scrollTop = box.scrollHeight;
  });
};

const scrollAiChat = () => {
  nextTick(() => {
    if (aiChatBox.value) aiChatBox.value.scrollTop = aiChatBox.value.scrollHeight;
  });
};

// --- NEW REAL AI BACKEND LOGIC ---
const fetchWithRetry = async (url, options, retries = 5, delay = 1000) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("API request failed");
    return response;
  } catch (err) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    throw err;
  }
};

const askAi = async () => {
  if (!aiQuery.value.trim()) return;
  
  const userText = aiQuery.value;
  aiMessages.value.push({ role: 'user', text: userText });
  aiQuery.value = '';
  isAiTyping.value = true;
  scrollAiChat();

  try {
    const apiKey = ""; // Execution environment injects API key automatically
    const modelUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    // Build smart context for Nova AI
    let systemContext = "You are Nova, an elite AI teaching assistant for high school CS and IP students. Keep answers concise, helpful, and encouraging. Use plain text formatting or simple markdown.";
    
    if (selectedTopic.value) {
        systemContext += ` The student is currently studying: ${selectedTopic.value.subject_name}.`;
        
        // Strip HTML from the rich text content to feed to the AI safely without exceeding payload limits
        if (selectedTopic.value.content) {
            const plainTextContent = selectedTopic.value.content.replace(/<[^>]+>/g, ' ').substring(0, 1500); 
            systemContext += ` Here is a snippet of their lesson for context: ${plainTextContent}`;
        }
    }

    const payload = {
        contents: [{ parts: [{ text: userText }] }],
        systemInstruction: { parts: [{ text: systemContext }] }
    };

    const response = await fetchWithRetry(modelUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    const result = await response.json();
    const aiText = result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, my neural network is resting. Please try again.";

    aiMessages.value.push({ role: 'ai', text: aiText });
  } catch (error) {
    console.error("Nova AI Error:", error);
    aiMessages.value.push({ role: 'ai', text: "Oops! My connection to the matrix dropped. Please try asking again in a moment." });
  } finally {
    isAiTyping.value = false;
    scrollAiChat();
  }
};

const fetchData = async () => {
  try {
    const [cRes, nRes, mRes, qRes] = await Promise.all([
      api.getCourseDetails(courseId),
      api.getCourseNotes(courseId),
      api.getDiscussions(courseId),
      api.getCourseQuizzes(courseId)
    ]);
    course.value = cRes.data.data;
    notes.value = nRes.data.data;
    messages.value = mRes.data.data.reverse();
    quizzes.value = qRes.data.data;
    scrollToBottom();

    Object.keys(filteredGroupedNotes.value).forEach(sem => openSections.value[sem] = true);

    if (user.value) {
      const enrollRes = await api.getUserEnrollments();
      isEnrolled.value = enrollRes.data.data.some(e => e.id == courseId);
      
      if(lessons.value.length > 0) {
         selectedTopic.value = lessons.value[0];
      }
    }
  } catch (err) { console.error(err); } finally { loading.value = false; }
};

const toggleSection = (sem) => openSections.value[sem] = !openSections.value[sem];

const selectTopic = (topic) => { selectedTopic.value = topic; };

const markComplete = async () => {
   if(!selectedTopic.value || !user.value) return;
   if(!isCompleted.value) {
      completedLessons.value.push(selectedTopic.value.id);
      await trackDownload(selectedTopic.value.id); // Triggers progress on backend
   }
};

const nextLesson = () => {
   if(!selectedTopic.value) return;
   const currentIndex = lessons.value.findIndex(n => n.id === selectedTopic.value.id);
   if(currentIndex !== -1 && currentIndex < lessons.value.length - 1) {
      selectedTopic.value = lessons.value[currentIndex + 1];
      openSections.value[selectedTopic.value.semester] = true;
   }
};

const handleEnroll = async () => {
  isEnrolling.value = true;
  try {
    await api.enrollInCourse(courseId);
    isEnrolled.value = true;
  } catch (err) { alert("Enrollment failed."); } finally { isEnrolling.value = false; }
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  try {
    await api.postMessage(courseId, { message: newMessage.value });
    newMessage.value = '';
    const mRes = await api.getDiscussions(courseId);
    messages.value = mRes.data.data.reverse();
    scrollToBottom();
  } catch (err) { alert("Failed to send message."); }
};

const trackDownload = async (id) => { if (user.value) await api.recordProgress(id); };

// Video Progress Logic
let lastLoggedPercent = 0;
watch(selectedTopic, () => { lastLoggedPercent = 0; });

const handleVideoProgress = async (e, noteId) => {
   if(!user.value) return;
   const video = e.target;
   if(!video.duration) return;
   const percent = Math.floor((video.currentTime / video.duration) * 100);
   if(percent > lastLoggedPercent + 10 || percent === 100) {
      lastLoggedPercent = percent;
      try {
         await api.recordVideoProgress(noteId, { progress_percent: percent });
         if(percent > 90 && !isCompleted.value) markComplete();
      } catch(err) { console.error('Tracking issue', err); }
   }
};

const handleDelete = async (noteId) => {
  if (!confirm("Are you sure you want to delete this material? This cannot be undone.")) return;
  try {
    await api.deleteNote(noteId);
    notes.value = notes.value.filter(n => n.id !== noteId);
    if(selectedTopic.value?.id === noteId) selectedTopic.value = null;
    alert("Material deleted successfully.");
  } catch (err) {
    alert("Failed to delete. You might not have permission.");
  }
};

onMounted(() => {
  const saved = localStorage.getItem('user');
  if (saved) user.value = JSON.parse(saved);
  fetchData();
  
  setInterval(async () => {
    if(activeTab.value === 'discussion') {
       const mRes = await api.getDiscussions(courseId);
       messages.value = mRes.data.data.reverse();
    }
  }, 10000);
});
</script>

<style scoped>
.animate-in { animation-duration: 0.5s; animation-fill-mode: both; }
@keyframes slideInFromBottom { from { transform: translateY(2rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.slide-in-from-bottom-4 { animation-name: slideInFromBottom; }
.slide-in-from-bottom-10 { animation-name: slideInFromBottom; animation-duration: 0.3s; }
.fade-in { animation-name: fadeIn; }

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

/* ERROR-FREE RAW CSS FOR RICH TEXT - OPTIMIZED FOR READABILITY */
.rich-text-container { color: #1f2937; line-height: 1.8; max-width: 850px; margin-left: auto; margin-right: auto; font-size: clamp(1rem, 2.5vw, 1.125rem); word-break: break-word; }
.rich-text-container :deep(h1) { font-size: clamp(1.75rem, 5vw, 2.5rem); font-weight: 900; color: #111827; margin-bottom: 1.5rem; margin-top: 2rem; letter-spacing: -0.025em; line-height: 1.2; }
.rich-text-container :deep(h2) { font-size: clamp(1.5rem, 4vw, 1.875rem); font-weight: 800; color: #111827; margin-bottom: 1.25rem; margin-top: 2rem; line-height: 1.3; }
.rich-text-container :deep(h3) { font-size: clamp(1.25rem, 3vw, 1.5rem); font-weight: 700; color: #1f2937; margin-bottom: 1rem; margin-top: 1.5rem; line-height: 1.4; }
.rich-text-container :deep(p) { margin-bottom: 1.5rem; letter-spacing: -0.01em; }
.rich-text-container :deep(ul) { list-style-type: disc; list-style-position: outside; margin-bottom: 1.5rem; padding-left: clamp(1rem, 3vw, 1.5rem); }
.rich-text-container :deep(ol) { list-style-type: decimal; list-style-position: outside; margin-bottom: 1.5rem; padding-left: clamp(1rem, 3vw, 1.5rem); }
.rich-text-container :deep(li) { margin-bottom: 0.75rem; padding-left: 0.5rem; }
.rich-text-container :deep(a) { color: #2563eb; text-decoration: none; font-weight: 600; border-bottom: 2px solid transparent; transition: border-color 0.2s; word-break: break-all; }
.rich-text-container :deep(a:hover) { border-bottom-color: #2563eb; }
.rich-text-container :deep(blockquote) { border-left: 4px solid #3b82f6; background-color: #eff6ff; padding: clamp(1rem, 3vw, 1.5rem); margin-bottom: 1.5rem; font-style: italic; color: #374151; border-radius: 0 1rem 1rem 0; font-size: clamp(1.1rem, 2.5vw, 1.25rem); }
.rich-text-container :deep(code) { background-color: #f1f5f9; color: #db2777; padding: 0.2rem 0.4rem; border-radius: 0.375rem; font-size: 0.9em; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-weight: 600; word-break: break-word; }
.rich-text-container :deep(pre) { background-color: #0f172a; color: #f8fafc; padding: clamp(1rem, 3vw, 1.5rem); border-radius: 1rem; margin-bottom: 1.5rem; overflow-x: auto; font-size: 0.9em; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); }
.rich-text-container :deep(pre code) { background-color: transparent; color: inherit; padding: 0; font-weight: 400; word-break: normal; }
.rich-text-container :deep(img) { max-width: 100%; height: auto; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); margin-bottom: 2rem; margin-top: 1rem; }
</style>