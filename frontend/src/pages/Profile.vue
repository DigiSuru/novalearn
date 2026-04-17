<template>
  <div class="min-h-screen bg-gray-50/50 pb-12 font-sans relative">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button @click="$router.push('/')" class="text-gray-500 hover:text-blue-600 font-bold flex items-center transition-all group">
          <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Dashboard
        </button>
        <div class="font-black text-xl text-gray-800 tracking-tight">System Identity</div>
        <div class="flex items-center space-x-4">
           <span class="text-xs font-bold text-green-500 flex items-center"><span class="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span> Network Active</span>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 mt-8">
      <!-- Profile Hero -->
      <div class="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden mb-8 transition-all">
        <div class="h-56 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden text-white">
          <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div class="absolute top-0 right-0 p-8 text-right flex flex-col items-end">
             <div class="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-center">
                <p class="text-[10px] font-black uppercase opacity-60 mb-1 tracking-widest">Platform Power Level</p>
                <p class="text-2xl font-black text-blue-400">
                  <span v-if="user?.role === 'admin'">MAX</span>
                  <span v-else>{{ userLevel }}</span>
                </p>
             </div>
          </div>
        </div>
        
        <div class="px-8 pb-10 relative pt-20">
          <div class="absolute -top-24 border-8 border-white h-48 w-48 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center overflow-hidden font-black text-7xl text-gray-900">
             <img v-if="user?.profile_photo_url" :key="user.profile_photo_url" :src="user.profile_photo_url" alt="Profile" class="w-full h-full object-cover">
             <span v-else>{{ user?.name?.charAt(0).toUpperCase() }}</span>
          </div>
          
          <div class="pt-4 flex flex-col md:flex-row md:items-start justify-between">
            <div class="md:ml-56">
              <div class="flex items-center gap-3 mb-2">
                <h1 class="text-4xl font-black text-gray-900 tracking-tight">{{ user?.name }}</h1>
                <span v-if="user?.role === 'admin'" class="bg-red-50 text-red-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest border border-red-100 shadow-sm">Master Admin</span>
                <span v-if="user?.is_pro" class="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest shadow-sm">Pro Member</span>
              </div>
              <div class="flex flex-wrap items-center gap-4 text-gray-500 font-bold text-sm tracking-wide">
                 <span class="flex items-center"><svg class="w-4 h-4 mr-1.5 opacity-70" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg> {{ user?.email }}</span>
                 <span v-if="user?.phone" class="flex items-center"><svg class="w-4 h-4 mr-1.5 opacity-70" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg> {{ user.phone }}</span>
              </div>
              <p v-if="user?.bio" class="mt-4 text-gray-600 font-medium max-w-2xl italic border-l-4 border-blue-500 pl-4 py-1 bg-gray-50 rounded-r-lg">"{{ user.bio }}"</p>
            </div>
            <div class="mt-8 md:mt-0 flex gap-3">
              <button @click="openEditModal" class="bg-white border border-gray-200 px-8 py-3.5 rounded-2xl font-black text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm">Vault Settings</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Advanced Admin Navigation -->
      <div v-if="user?.role === 'admin'" class="mb-10 flex flex-wrap gap-2 bg-white p-2 rounded-[1.5rem] border border-gray-100 shadow-sm w-fit">
        <button @click="activeTab = 'vault'" :class="activeTab === 'vault' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'" class="px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">CMS: Resources</button>
        <button @click="activeTab = 'programs'" :class="activeTab === 'programs' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'" class="px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">CMS: Programs & Classes</button>
        <button @click="activeTab = 'assessments'" :class="activeTab === 'assessments' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'" class="px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Quiz Studio</button>
        <button @click="loadAdminUsers(); activeTab = 'users'" :class="activeTab === 'users' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'" class="px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Directory</button>
      </div>

      <!-- Student Navigation -->
      <div v-else class="mb-10 flex gap-2 bg-white p-2 rounded-[1.5rem] border border-gray-100 shadow-sm w-fit overflow-x-auto">
        <button @click="activeTab = 'overview'" :class="activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'" class="px-6 py-3 rounded-2xl font-bold transition-all text-sm whitespace-nowrap">Dashboard</button>
        <button @click="loadAssessmentHistory(); activeTab = 'my_assessments'" :class="activeTab === 'my_assessments' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'" class="px-6 py-3 rounded-2xl font-bold transition-all text-sm whitespace-nowrap">Assessments</button>
        <button @click="loadLeaderboard(); activeTab = 'leaderboard'" :class="activeTab === 'leaderboard' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'" class="px-6 py-3 rounded-2xl font-bold transition-all text-sm whitespace-nowrap flex items-center">
           <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
           Global Leaderboard
        </button>
        <button @click="activeTab = 'achievements'" :class="activeTab === 'achievements' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'" class="px-6 py-3 rounded-2xl font-bold transition-all text-sm whitespace-nowrap">Achievements</button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Sidebar Widgets (Col 3) -->
        <div class="lg:col-span-3 space-y-6">
          <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Learning Metrics</h3>
            <div class="space-y-6">
              <div v-if="user?.role !== 'admin'" class="flex justify-between items-center mb-4 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                 <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black">⭐</div>
                    <span class="text-xs font-bold text-blue-800 uppercase tracking-widest">Total XP</span>
                 </div>
                 <span class="font-black text-blue-600 text-lg">{{ userTotalXP }}</span>
              </div>
              <div class="flex justify-between items-center">
                 <span class="text-sm font-bold text-gray-500">{{ user?.role === 'admin' ? 'Total Content Managed' : 'Curriculum Units Read' }}</span>
                 <span class="font-black text-gray-900">{{ user?.role === 'admin' ? userNotes.length : realStats.totalDownloaded }}</span>
              </div>
              <div v-if="user?.role !== 'admin'" class="flex justify-between items-center">
                 <span class="text-sm font-bold text-gray-500">Correct Quiz Answers</span>
                 <span class="font-black text-gray-900">{{ realStats.totalCorrectAnswers }}</span>
              </div>
            </div>
          </div>
          <button @click="handleLogout" class="w-full p-4 text-gray-400 hover:text-red-500 font-bold transition-all hover:bg-red-50 rounded-2xl flex items-center justify-center">
             <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
             Log out Securely
          </button>
        </div>

        <!-- Main Content Area (Col 9) -->
        <div class="lg:col-span-9">
          
          <!-- STUDENT TAB: OVERVIEW -->
          <div v-if="activeTab === 'overview' && user?.role !== 'admin'" class="animate-in fade-in duration-500 space-y-8">
             <div class="space-y-4">
                <h3 class="text-xl font-black text-gray-900">Enrolled Programs & Classes</h3>
                <div v-if="enrolledCourses.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div v-for="c in enrolledCourses" :key="c.id" class="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all group flex flex-col justify-between">
                      <div @click="$router.push(`/course/${c.id}`)" class="cursor-pointer mb-6">
                         <span class="bg-blue-50 text-blue-700 text-[10px] font-black px-3 py-1 rounded-lg uppercase border border-blue-100">{{ c.short_name }}</span>
                         <h4 class="text-2xl font-black text-gray-900 mt-4 leading-tight group-hover:text-blue-600 transition-colors">{{ c.course_name }}</h4>
                      </div>
                      <!-- FEATURE 3: PDF CERTIFICATE DOWNLOAD BUTTON -->
                      <button @click="downloadCertificate(c)" class="w-full bg-gray-50 hover:bg-gray-900 hover:text-white text-gray-600 border border-gray-200 py-3 rounded-xl font-black text-sm transition-all flex items-center justify-center">
                         <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path></svg>
                         Issue Certificate
                      </button>
                   </div>
                </div>
                <div v-else class="bg-white p-12 rounded-[2rem] border-2 border-dashed border-gray-200 text-center text-gray-400">
                   No learning paths active. Head to the catalog to begin your journey.
                </div>
             </div>

             <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div class="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                  <h3 class="font-black text-gray-900">Recent Learning Activity</h3>
                </div>
                <div class="p-8">
                  <div v-if="realStats.recent.length > 0" class="border-l-2 border-gray-100 ml-4 space-y-8">
                    <div v-for="act in realStats.recent" :key="act.accessed_at" class="relative pl-10 group">
                      <div class="absolute w-5 h-5 bg-white border-4 border-blue-600 rounded-full -left-[11px] top-0 shadow-sm"></div>
                      <div class="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                        <p class="font-bold text-gray-900 text-sm">Studied "{{ act.subject_name }}"</p>
                        <div class="flex items-center mt-1.5 space-x-2">
                           <span class="text-[10px] font-black text-blue-600 uppercase bg-white px-2 py-0.5 rounded border border-blue-50">{{ act.short_name }}</span>
                           <span class="text-xs font-bold text-gray-400">{{ new Date(act.accessed_at).toLocaleDateString() }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-center py-12">
                    <p class="text-gray-400 font-medium">Your learning timeline is currently empty.</p>
                  </div>
                </div>
             </div>
          </div>

          <!-- STUDENT TAB: MY ASSESSMENTS -->
          <div v-if="activeTab === 'my_assessments'" class="animate-in fade-in duration-500 space-y-8">
             <div class="bg-gray-900 p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between">
                <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div class="absolute right-0 top-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div class="relative z-10 text-center md:text-left mb-6 md:mb-0">
                   <h2 class="text-3xl font-black text-white tracking-tight mb-2">My Assessments</h2>
                   <p class="text-gray-400 font-medium text-sm">Review your performance across all mock exams and chapter tests.</p>
                </div>
                <div class="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center min-w-[150px]">
                   <p class="text-[10px] font-black text-purple-300 uppercase tracking-widest mb-1">Total Hits</p>
                   <p class="text-3xl font-black text-green-400">{{ realStats.totalCorrectAnswers }} <span class="text-lg text-gray-300 font-bold">Correct</span></p>
                </div>
             </div>

             <!-- Assessment History Table -->
             <div class="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div class="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                   <h3 class="font-black text-gray-900">Assessment History</h3>
                </div>
                
                <div v-if="assessmentHistory.length === 0" class="p-12 text-center text-gray-400 font-medium">
                   No assessments taken yet.
                </div>
                <div v-else class="overflow-x-auto">
                   <table class="w-full text-left">
                      <thead class="bg-gray-50 border-b border-gray-100">
                         <tr>
                            <th class="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Assessment Name</th>
                            <th class="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Score</th>
                            <th class="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Attempt</th>
                            <th class="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                         </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-50">
                         <tr v-for="hist in assessmentHistory" :key="hist.id" class="hover:bg-gray-50 transition-colors">
                            <td class="p-5">
                               <p class="font-black text-gray-900">{{ hist.title }}</p>
                               <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{{ hist.course_name }}</p>
                            </td>
                            <td class="p-5 text-center">
                               <p class="font-black text-lg text-gray-900">{{ hist.score }}<span class="text-gray-400 text-sm">/{{ hist.total_questions }}</span></p>
                            </td>
                            <td class="p-5 text-center">
                               <span class="bg-gray-100 text-gray-600 text-xs font-black px-3 py-1 rounded-lg">#{{ hist.attempt_number }}</span>
                            </td>
                            <td class="p-5 text-right">
                               <span v-if="hist.status === 'Passed'" class="bg-green-50 text-green-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest border border-green-100">Passed</span>
                               <span v-else class="bg-red-50 text-red-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest border border-red-100">Failed</span>
                            </td>
                         </tr>
                      </tbody>
                   </table>
                </div>
             </div>
          </div>

          <!-- STUDENT TAB: LEADERBOARD -->
          <div v-if="activeTab === 'leaderboard'" class="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
             <div class="bg-gray-900 p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between">
                <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div class="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div class="relative z-10 text-center md:text-left mb-6 md:mb-0">
                   <h2 class="text-3xl font-black text-white tracking-tight mb-2">Global Champions</h2>
                   <p class="text-gray-400 font-medium text-sm">Rankings based on Max Assessment Scores (100 XP) and Curriculum Reads (50 XP).</p>
                </div>
                <div class="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center min-w-[150px]">
                   <p class="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">Your Total XP</p>
                   <p class="text-3xl font-black text-white">{{ userTotalXP }}</p>
                </div>
             </div>
             
             <div class="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div v-if="leaderboardData.length === 0" class="p-12 text-center text-gray-400 font-bold">
                   Calibrating leaderboard rankings...
                </div>
                <div v-else>
                   <div class="flex items-center justify-between p-4 border-b border-gray-50 bg-gray-50/50">
                      <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Rank / Student</span>
                      <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-4">Total XP</span>
                   </div>
                   <div v-for="(rank, i) in leaderboardData" :key="rank.id" 
                        class="flex items-center justify-between p-5 border-b border-gray-50 last:border-0 hover:bg-blue-50/30 transition-colors"
                        :class="rank.id === user.id ? 'bg-blue-50/50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'">
                      <div class="flex items-center gap-5">
                         <span class="text-xl font-black italic w-8 text-center" 
                               :class="i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-amber-600' : 'text-gray-300'">
                           {{ i + 1 }}
                         </span>
                         <div class="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm border border-white overflow-hidden"
                              :class="rank.id === user.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'">
                            <img v-if="rank.profile_photo_url" :src="rank.profile_photo_url" class="w-full h-full object-cover">
                            <span v-else>{{ rank.name.charAt(0).toUpperCase() }}</span>
                         </div>
                         <div>
                            <div class="flex items-center gap-2">
                               <p class="font-black text-gray-900" :class="{'text-blue-700': rank.id === user.id}">{{ rank.name }}</p>
                               <span v-if="rank.id === user.id" class="text-[9px] font-black text-blue-600 bg-blue-100 px-2 py-0.5 rounded uppercase tracking-widest">You</span>
                               <span v-if="rank.is_pro" class="text-[9px] font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded uppercase tracking-widest">Pro</span>
                            </div>
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Level {{ rank.level }}</p>
                         </div>
                      </div>
                      <p class="text-xl font-black" :class="rank.id === user.id ? 'text-blue-600' : 'text-gray-900'">{{ rank.xp }}</p>
                   </div>
                </div>
             </div>
          </div>

          <!-- STUDENT TAB: ACHIEVEMENTS -->
          <div v-if="activeTab === 'achievements'" class="animate-in fade-in duration-500">
             <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div class="bg-white p-8 rounded-[2.5rem] border-2 border-yellow-100 flex flex-col items-center text-center shadow-sm relative overflow-hidden group">
                   <div class="absolute inset-0 bg-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <div class="text-6xl mb-4 animate-pulse relative">🥇</div>
                   <h5 class="font-black text-gray-900 text-lg relative">Enrolled</h5>
                   <p class="text-[10px] font-black text-yellow-600 uppercase mt-2 tracking-widest relative">Unlocked</p>
                </div>
                <div :class="realStats.totalDownloaded >= 10 ? 'border-indigo-100 opacity-100 shadow-xl' : 'border-gray-100 opacity-40'" class="bg-white p-8 rounded-[2.5rem] border-2 flex flex-col items-center text-center transition-all">
                   <div :class="realStats.totalDownloaded >= 10 ? 'grayscale-0' : 'grayscale'" class="text-6xl mb-4 transition-all">📚</div>
                   <h5 class="font-black text-gray-900 text-lg">Scholar</h5>
                   <p class="text-[10px] font-black uppercase mt-2 tracking-widest" :class="realStats.totalDownloaded >= 10 ? 'text-indigo-600' : 'text-gray-400'">
                      {{ realStats.totalDownloaded >= 10 ? 'Unlocked' : '10 Units Required' }}
                   </p>
                </div>
                <div :class="realStats.totalCorrectAnswers >= 50 ? 'border-green-100 opacity-100 shadow-xl' : 'border-gray-100 opacity-40'" class="bg-white p-8 rounded-[2.5rem] border-2 flex flex-col items-center text-center transition-all">
                   <div :class="realStats.totalCorrectAnswers >= 50 ? 'grayscale-0' : 'grayscale'" class="text-6xl mb-4 transition-all">🎯</div>
                   <h5 class="font-black text-gray-900 text-lg">Sharpshooter</h5>
                   <p class="text-[10px] font-black uppercase mt-2 tracking-widest" :class="realStats.totalCorrectAnswers >= 50 ? 'text-green-600' : 'text-gray-400'">
                      {{ realStats.totalCorrectAnswers >= 50 ? 'Unlocked' : '50 Correct Required' }}
                   </p>
                </div>
             </div>
          </div>

          <!-- ============================================== -->
          <!-- ADMIN TABS -->
          <!-- ============================================== -->
          
          <div v-if="activeTab === 'vault'" class="animate-in fade-in duration-500 space-y-4">
             <div class="flex justify-between items-center bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm mb-6">
                <div>
                   <h2 class="text-2xl font-black text-gray-900">Content Matrix</h2>
                   <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manage curriculum materials.</p>
                </div>
                <button @click="$router.push('/upload')" class="bg-gray-900 text-white font-black text-xs uppercase tracking-widest py-3 px-6 rounded-xl shadow-xl hover:bg-blue-600 transition-all">+ Inject Data</button>
             </div>
             <div class="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
                <table class="w-full text-left border-collapse">
                   <thead class="bg-gray-50 border-b border-gray-100">
                      <tr>
                         <th class="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Resource Identity</th>
                         <th class="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Path</th>
                         <th class="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Format</th>
                         <th class="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody class="divide-y divide-gray-50">
                      <tr v-if="userNotes.length === 0"><td colspan="4" class="p-10 text-center text-gray-400 font-bold">Vault is empty.</td></tr>
                      <tr v-for="note in userNotes" :key="note.id" class="hover:bg-gray-50 transition-colors">
                         <td class="p-5">
                            <p class="font-black text-gray-900 text-sm">{{ note.subject_name }}</p>
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">ID: {{ note.id }} <span v-if="note.is_pro" class="text-amber-500 ml-1">| PRO</span></p>
                         </td>
                         <td class="p-5">
                            <span class="bg-gray-100 text-gray-600 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">{{ note.short_name }}</span>
                            <span class="text-xs font-bold text-gray-400 ml-2">Sem/Chap {{ note.semester }}</span>
                         </td>
                         <td class="p-5 text-center">
                            <span v-if="note.content" class="bg-purple-50 text-purple-600 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest border border-purple-100">Rich Text</span>
                            <span v-else-if="note.file_url" class="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest border border-blue-100">File</span>
                         </td>
                         <td class="p-5 text-right space-x-2">
                            <button @click="handleDeleteNote(note.id)" class="p-2 text-gray-400 hover:text-red-600 bg-white border border-gray-200 rounded-lg shadow-sm transition-colors">🗑️</button>
                         </td>
                      </tr>
                   </tbody>
                </table>
             </div>
          </div>

          <div v-if="activeTab === 'programs'" class="animate-in fade-in duration-500 space-y-8">
             <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h2 class="text-xl font-black text-gray-900 mb-6">Program & Class Matrix</h2>
                <form @submit.prevent="handleAddCourse" class="flex flex-col md:flex-row gap-4">
                   <input v-model="courseForm.course_name" placeholder="Program / Class Name (e.g. 11th Science, BCA)" class="flex-grow border-2 border-gray-50 p-4 rounded-xl focus:border-blue-600 outline-none font-bold text-sm" required>
                   <input v-model="courseForm.short_name" placeholder="Tag (11th-Sci, M.Sc)" class="w-32 border-2 border-gray-50 p-4 rounded-xl outline-none focus:border-blue-600 font-bold text-sm" required>
                   <input v-model="courseForm.total_semesters" type="number" placeholder="Sems/Chaps" class="w-24 border-2 border-gray-50 p-4 rounded-xl outline-none focus:border-blue-600 font-bold text-sm" required>
                   <button type="submit" class="bg-gray-900 text-white font-black px-8 rounded-xl hover:bg-blue-600 transition-all shadow-lg text-sm">Compile</button>
                </form>
             </div>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="c in allCourses" :key="c.id" class="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative group overflow-hidden">
                   <div class="relative">
                      <div class="flex justify-between items-start mb-4">
                         <span class="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">{{ c.short_name }}</span>
                         <span class="text-xs font-black text-gray-400">{{ c.total_semesters }} Sections/Sems</span>
                      </div>
                      <h4 class="text-xl font-black text-gray-900 leading-tight pr-8">{{ c.course_name }}</h4>
                      <div class="mt-8 flex justify-between items-center border-t border-gray-50 pt-4">
                         <span class="text-[10px] font-bold text-gray-400 uppercase">ID: {{ c.id }}</span>
                         <button @click="handleDeleteCourse(c.id)" class="text-xs font-black text-red-400 hover:text-red-600 uppercase tracking-widest">Terminate</button>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div v-if="activeTab === 'assessments'" class="animate-in fade-in duration-500 space-y-8">
             <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h2 class="text-2xl font-black text-gray-900 mb-2">Assessment Studio</h2>
                <p class="text-gray-500 text-sm mb-6 font-medium">Create mock exams, chapter quizzes, and topic tests for specific programs or classes.</p>
                
                <div class="mb-6">
                   <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Select Target Program / Class</label>
                   <select v-model="selectedCourseForQuiz" @change="loadCourseQuizzes" class="w-full border-2 border-gray-50 p-4 rounded-xl outline-none focus:border-blue-600 font-bold text-gray-700 cursor-pointer">
                      <option value="" disabled>Choose a course/class...</option>
                      <option v-for="c in allCourses" :key="c.id" :value="c.id">{{ c.short_name }} - {{ c.course_name }}</option>
                   </select>
                </div>

                <div v-if="selectedCourseForQuiz" class="border-t border-gray-100 pt-6">
                   <h3 class="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Create New Quiz Layout</h3>
                   <form @submit.prevent="handleCreateQuiz" class="space-y-4">
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input v-model="quizForm.title" placeholder="Quiz Title (e.g., Physics Mid-Term)" class="md:col-span-2 border-2 border-gray-50 p-4 rounded-xl outline-none focus:border-blue-600 font-medium" required>
                          <input v-model="quizForm.semester" type="number" min="1" placeholder="Chapter/Sem No. (e.g., 1)" class="border-2 border-gray-50 p-4 rounded-xl outline-none focus:border-blue-600 font-medium" required>
                      </div>
                      <textarea v-model="quizForm.description" placeholder="Short description or instructions..." class="w-full border-2 border-gray-50 p-4 rounded-xl outline-none focus:border-blue-600 font-medium" rows="2"></textarea>
                      <button type="submit" class="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-all shadow-lg">Generate Quiz</button>
                   </form>

                   <h3 class="text-sm font-black text-gray-900 uppercase tracking-widest mb-4 mt-10">Active Quizzes</h3>
                   <div v-if="adminQuizzes.length === 0" class="text-center p-6 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold text-sm">
                      No quizzes exist for this course yet.
                   </div>
                   <div v-else class="space-y-4">
                      <div v-for="q in adminQuizzes" :key="q.id" class="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex justify-between items-center group hover:bg-white hover:shadow-sm transition-all">
                         <div>
                            <div class="flex items-center gap-2 mb-1">
                               <span v-if="q.semester" class="bg-purple-100 text-purple-700 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Ch/Sem {{ q.semester }}</span>
                               <h4 class="font-black text-gray-900">{{ q.title }}</h4>
                            </div>
                            <p class="text-xs text-gray-500 font-medium">{{ q.description }}</p>
                         </div>
                         <div class="flex items-center space-x-3">
                            <button @click="openQuestionModal(q.id)" class="text-xs font-black text-blue-600 bg-white px-4 py-2 rounded-lg border border-blue-100 hover:bg-blue-600 hover:text-white transition-colors shadow-sm">+ Add Question</button>
                            <button @click="handleDeleteQuiz(q.id)" class="text-gray-400 hover:text-red-600 p-2 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div v-if="activeTab === 'users'" class="animate-in fade-in duration-500">
             <div class="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
                <div class="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                   <h3 class="font-black text-gray-900">User Identity Management</h3>
                   <span class="text-xs font-black text-blue-600 bg-white px-3 py-1 rounded-lg border border-blue-100">{{ adminUsers.length }} Total Users</span>
                </div>
                <div class="overflow-x-auto">
                   <table class="w-full text-left">
                      <thead class="bg-gray-50 border-b border-gray-100">
                         <tr>
                            <th class="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                            <th class="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Pro Status</th>
                            <th class="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">System Role</th>
                         </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-50">
                         <tr v-for="u in adminUsers" :key="u.id" class="hover:bg-gray-50 transition-colors">
                            <td class="p-5">
                               <p class="font-black text-gray-900 text-sm">{{ u.name }} <span v-if="u.id === user.id" class="text-[10px] text-blue-500 ml-1">(You)</span></p>
                               <p class="text-[10px] text-gray-500 font-bold">{{ u.email }}</p>
                            </td>
                            <td class="p-5">
                               <span v-if="u.is_pro" class="text-[10px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-1 rounded border border-amber-100">Pro Active</span>
                               <span v-else class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Basic</span>
                            </td>
                            <td class="p-5 text-right">
                               <select 
                                  v-model="u.role" 
                                  @change="handleRoleUpdate(u.id, u.role)"
                                  :disabled="u.id === user.id"
                                  class="text-[10px] font-black uppercase tracking-widest bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 cursor-pointer disabled:opacity-50"
                                  :class="u.role === 'admin' ? 'text-red-600' : 'text-blue-600'"
                               >
                                  <option value="student">Student</option>
                                  <option value="admin">Administrator</option>
                               </select>
                            </td>
                         </tr>
                      </tbody>
                   </table>
                </div>
             </div>
          </div>

        </div>
      </div>
    </main>

    <!-- ELITE SETTINGS MODAL -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div class="bg-white rounded-[3rem] p-10 md:p-12 w-full max-w-2xl shadow-2xl border border-white/20 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-8">
           <h3 class="text-3xl font-black text-gray-900 tracking-tight">Identity Vault</h3>
           <button @click="showEditModal = false" class="text-gray-400 hover:text-gray-900"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
        </div>

        <form @submit.prevent="handleUpdateProfile" class="space-y-6">
          <div class="flex items-center gap-6">
             <div class="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center font-black text-2xl text-gray-400 overflow-hidden border-2 border-gray-200">
                <img v-if="avatarPreview || user?.profile_photo_url" :src="avatarPreview || user.profile_photo_url" class="w-full h-full object-cover">
                <span v-else>{{ editForm.name.charAt(0).toUpperCase() }}</span>
             </div>
             <div class="flex-grow">
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Profile Photo</label>
                <input type="file" accept="image/*" @change="handleAvatarChange" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-black file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer">
             </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
               <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-2">Display Name</label>
               <input v-model="editForm.name" required class="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-[1rem] focus:border-blue-600 outline-none font-bold text-gray-900" placeholder="Full Name">
             </div>
             <div>
               <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-2">Phone Number</label>
               <input v-model="editForm.phone" type="tel" class="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-[1rem] focus:border-blue-600 outline-none font-bold text-gray-900" placeholder="+1 (555) 000-0000">
             </div>
          </div>
          <div>
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-2">Academic Bio</label>
            <textarea v-model="editForm.bio" rows="3" class="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-[1rem] focus:border-blue-600 outline-none font-medium text-gray-700" placeholder="Tell the community about your academic or school goals..."></textarea>
          </div>
          <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
             <div>
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Encrypted Email</p>
                <p class="text-gray-600 font-bold">{{ user?.email }}</p>
             </div>
             <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div class="flex space-x-4 pt-4">
            <button type="submit" :disabled="savingProfile" class="flex-1 bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-blue-700 transition-all text-sm uppercase tracking-widest disabled:opacity-50">
               {{ savingProfile ? 'Synchronizing...' : 'Synchronize Identity' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add Question Modal -->
    <div v-if="showQuestionModal" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div class="bg-white rounded-[2rem] p-8 w-full max-w-xl shadow-2xl border border-white/20 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
           <h3 class="text-2xl font-black text-gray-900">Add MCQ Question</h3>
           <button @click="showQuestionModal = false" class="text-gray-400 hover:text-gray-900"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
        </div>
        <form @submit.prevent="submitQuestion" class="space-y-4">
          <div>
             <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Question Text</label>
             <textarea v-model="questionForm.question_text" required class="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl focus:border-blue-600 outline-none font-bold text-gray-900" rows="3"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
             <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase mb-1">Option A</label>
                <input v-model="questionForm.option_a" required class="w-full bg-gray-50 border-2 border-gray-100 p-3 rounded-xl focus:border-blue-600 outline-none font-bold text-gray-700 text-sm">
             </div>
             <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase mb-1">Option B</label>
                <input v-model="questionForm.option_b" required class="w-full bg-gray-50 border-2 border-gray-100 p-3 rounded-xl focus:border-blue-600 outline-none font-bold text-gray-700 text-sm">
             </div>
             <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase mb-1">Option C</label>
                <input v-model="questionForm.option_c" required class="w-full bg-gray-50 border-2 border-gray-100 p-3 rounded-xl focus:border-blue-600 outline-none font-bold text-gray-700 text-sm">
             </div>
             <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase mb-1">Option D</label>
                <input v-model="questionForm.option_d" required class="w-full bg-gray-50 border-2 border-gray-100 p-3 rounded-xl focus:border-blue-600 outline-none font-bold text-gray-700 text-sm">
             </div>
          </div>
          <div>
             <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 mt-2">Correct Answer</label>
             <select v-model="questionForm.correct_option" required class="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl focus:border-blue-600 outline-none font-black text-blue-600 cursor-pointer">
                <option value="" disabled>Select Correct Option...</option>
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
             </select>
          </div>
          <button type="submit" class="w-full bg-gray-900 text-white font-black py-4 rounded-xl hover:bg-blue-600 transition-all shadow-lg mt-4">Inject Question</button>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const user = ref(null);

const activeTab = computed({
   get: () => {
      if(!user.value) return 'overview';
      return user.value.role === 'admin' ? (tabState.value || 'vault') : (tabState.value || 'overview');
   },
   set: (val) => { tabState.value = val; }
});
const tabState = ref(null);

// Student Data
const enrolledCourses = ref([]);
const realStats = ref({ totalDownloaded: 0, totalCorrectAnswers: 0, recent: [] });
const leaderboardData = ref([]);
const assessmentHistory = ref([]); 

const userTotalXP = computed(() => {
   return (realStats.value.totalCorrectAnswers * 100) + (realStats.value.totalDownloaded * 50);
});
const userLevel = computed(() => {
   return Math.floor(userTotalXP.value / 500) + 1;
});

// Admin Data
const userNotes = ref([]);
const allCourses = ref([]);
const systemStats = ref({ totalStudents: 0, totalNotes: 0, totalDownloads: 0, recentRegistrations: [] });
const adminUsers = ref([]);
const adminQuizzes = ref([]);
const selectedCourseForQuiz = ref("");

// State
const loading = ref(true);
const savingProfile = ref(false);
const showEditModal = ref(false);
const avatarPreview = ref(null);
const showQuestionModal = ref(false);
const activeQuizIdForQuestion = ref(null);

const editForm = ref({ name: '', phone: '', bio: '', profile_photo: null });
const courseForm = ref({ course_name: '', short_name: '', total_semesters: '' });
const quizForm = ref({ title: '', description: '', semester: '' });
const questionForm = ref({ question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_option: '' });


const handleLogout = () => { localStorage.clear(); window.location.href = '/login'; };

const fetchData = async () => {
  try {
    const statsRes = await api.getUserStats();
    realStats.value = statsRes.data.stats;
    const enrollRes = await api.getUserEnrollments();
    enrolledCourses.value = enrollRes.data.data;

    if (user.value.role === 'admin') {
      const [notesRes, coursesRes, sysRes] = await Promise.all([
         api.getUserNotes(),
         api.getCourses(),
         api.getAdminSystemStats()
      ]);
      userNotes.value = notesRes.data.data;
      allCourses.value = coursesRes.data.data;
      systemStats.value = sysRes.data.stats;
    }
  } catch (err) { console.error(err); } finally { loading.value = false; }
};

const loadLeaderboard = async () => {
   try {
      const res = await api.getLeaderboard();
      leaderboardData.value = res.data.data;
   } catch(e) { console.error("Leaderboard load failed", e); }
};

const loadAssessmentHistory = async () => {
   try {
      const res = await api.getAssessmentHistory();
      assessmentHistory.value = res.data.data;
   } catch(e) { console.error("Failed to load assessment history", e); }
};

// --- FEATURE 3: PDF CERTIFICATE GENERATOR ---
const downloadCertificate = async (course) => {
   try {
      const res = await api.generateCertificate(course.id);
      
      // Handle the Blob response to force download
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `NovaLearn_Certificate_${course.short_name}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
   } catch(e) { 
      alert("Failed to generate certificate. Make sure you're connected."); 
   }
};

onMounted(async () => {
  const savedUser = localStorage.getItem('user');
  if (!savedUser) return router.push('/login');
  user.value = JSON.parse(savedUser);
  await fetchData();
});

// --- ADVANCED PROFILE UPDATE ---
const openEditModal = () => { 
   editForm.value.name = user.value.name || ''; 
   editForm.value.phone = user.value.phone || ''; 
   editForm.value.bio = user.value.bio || ''; 
   editForm.value.profile_photo = null;
   avatarPreview.value = null;
   showEditModal.value = true; 
};

const handleAvatarChange = (e) => {
   const file = e.target.files[0];
   if(file) {
      editForm.value.profile_photo = file;
      avatarPreview.value = URL.createObjectURL(file);
   }
};

const handleUpdateProfile = async () => {
  savingProfile.value = true;
  try {
    const formData = new FormData();
    formData.append('name', editForm.value.name || '');
    formData.append('phone', editForm.value.phone || '');
    formData.append('bio', editForm.value.bio || '');
    
    if (editForm.value.profile_photo) {
       formData.append('profile_photo', editForm.value.profile_photo);
    }

    const res = await api.updateProfile(formData);
    
    user.value = { ...user.value, ...res.data.user };
    localStorage.setItem('user', JSON.stringify(user.value));
    
    if (user.value.role !== 'admin') {
       loadLeaderboard();
    }
    
    avatarPreview.value = null;
    showEditModal.value = false;
  } catch (err) { 
     console.error(err);
     alert("Identity Update Failed. Please check the backend connection."); 
  } finally {
     savingProfile.value = false;
  }
};

// --- ADMIN LOGIC ---
const handleAddCourse = async () => {
  try {
    await api.addCourse(courseForm.value);
    courseForm.value = { course_name: '', short_name: '', total_semesters: '' };
    const res = await api.getCourses();
    allCourses.value = res.data.data;
  } catch (err) { alert("Add Course Failed"); }
};

const handleDeleteNote = async (id) => {
  if (confirm("Permanently delete this curated resource?")) {
    await api.deleteNote(id);
    userNotes.value = userNotes.value.filter(n => n.id !== id);
  }
};

const handleDeleteCourse = async (id) => {
  if (confirm("Warning: Deleting this degree program will disconnect all associated materials. Continue?")) {
    await api.deleteCourse(id);
    const res = await api.getCourses();
    allCourses.value = res.data.data;
  }
};

const loadAdminUsers = async () => {
   if(user.value.role !== 'admin') return;
   try {
      const res = await api.getAdminUsers();
      adminUsers.value = res.data.data;
   } catch(e) { console.error(e); }
};

const handleRoleUpdate = async (id, newRole) => {
   if(confirm(`Change this user's role to ${newRole.toUpperCase()}?`)) {
      try {
         await api.updateUserRole(id, newRole);
      } catch(e) { alert("Failed to update role."); loadAdminUsers(); }
   } else {
      loadAdminUsers();
   }
};

// Admin Quiz Studio
const loadCourseQuizzes = async () => {
   if(!selectedCourseForQuiz.value) return;
   try {
      const res = await api.getCourseQuizzes(selectedCourseForQuiz.value);
      adminQuizzes.value = res.data.data;
   } catch(e) { console.error(e); }
};

const handleCreateQuiz = async () => {
   if(!selectedCourseForQuiz.value) return alert("Select a course first.");
   try {
      await api.createQuiz({ ...quizForm.value, course_id: selectedCourseForQuiz.value });
      quizForm.value = { title: '', description: '', semester: '' };
      loadCourseQuizzes();
   } catch(e) { alert("Quiz creation failed."); }
};

const handleDeleteQuiz = async (quizId) => {
   if(confirm("Delete this quiz and all its questions permanently?")) {
      try {
         await api.deleteQuiz(quizId);
         loadCourseQuizzes();
      } catch(e) { alert("Failed to delete quiz."); }
   }
};

const openQuestionModal = (quizId) => {
   activeQuizIdForQuestion.value = quizId;
   questionForm.value = { question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_option: '' };
   showQuestionModal.value = true;
};

const submitQuestion = async () => {
   try {
      await api.addQuestionToQuiz(activeQuizIdForQuestion.value, questionForm.value);
      showQuestionModal.value = false;
   } catch(e) { alert("Failed to add question."); }
};

</script>

<style scoped>
.animate-in { animation-duration: 0.4s; animation-fill-mode: both; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideInFromBottom { from { transform: translateY(1rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.fade-in { animation-name: fadeIn; }
.slide-in-from-bottom-4 { animation-name: slideInFromBottom; }
.zoom-in-95 { animation-name: zoomIn; }
</style>