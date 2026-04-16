<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
    
    <!-- Navigation Bar (Glassmorphism) -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            N
          </div>
          <h1 class="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800 tracking-tight">
            NovaLearn
          </h1>
        </div>
        
        <!-- Navigation & Auth Buttons -->
        <div class="flex items-center space-x-6">
          <router-link to="/career" class="text-gray-600 font-semibold hover:text-blue-600 transition-colors hidden sm:block">
            🎯 Career Guidance
          </router-link>

          <div class="h-6 w-px bg-gray-300 hidden sm:block"></div>

          <template v-if="currentUser">
            <router-link to="/profile" class="group flex items-center space-x-3 bg-gray-50 hover:bg-blue-50 py-1.5 px-3 rounded-full border border-gray-200 hover:border-blue-200 transition-all cursor-pointer">
               <div class="h-8 w-8 bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 rounded-full flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
                 {{ currentUser.name.charAt(0).toUpperCase() }}
               </div>
               <span class="hidden sm:inline text-gray-700 font-semibold group-hover:text-blue-700">{{ currentUser.name }} <span v-if="currentUser.role === 'admin'" class="ml-1 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Admin</span></span>
            </router-link>
            <button @click="handleLogout" class="text-gray-500 font-semibold hover:text-red-500 px-3 py-1 rounded-md transition-colors">
              Logout
            </button>
          </template>
          
          <template v-else>
            <router-link to="/login" class="text-gray-600 font-semibold hover:text-blue-600 transition-colors">Log in</router-link>
            <router-link to="/register" class="bg-gray-900 hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-full shadow-lg transition-all hover:shadow-blue-500/30 hover:-translate-y-0.5">
              Get Started Free
            </router-link>
          </template>
        </div>
      </div>
    </header>

    <!-- Advanced Hero Section -->
    <section class="bg-white py-20 lg:py-32 px-4 relative overflow-hidden border-b border-gray-100">
      <!-- Background Elements -->
      <div class="absolute inset-0 z-0">
        <div class="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] rounded-full bg-blue-50/50 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-indigo-50/50 blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        
        <!-- Left Content -->
        <div>
          <div class="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <span class="flex h-2 w-2 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>Over 10,000+ Notes Uploaded</span>
          </div>
          
          <h1 class="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight text-gray-900 tracking-tight">
            The Ultimate <br/>
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Student Ecosystem
            </span>
          </h1>
          
          <p class="text-xl text-gray-500 mb-10 max-w-lg leading-relaxed">
            Ace your exams with highly structured study materials, previous year papers, and expert roadmaps tailored for college students in India.
          </p>
          
          <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#course-library" class="bg-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 w-full sm:w-auto text-center">
              Explore Library
            </a>
            <router-link v-if="!currentUser" to="/register" class="bg-white border-2 border-gray-200 text-gray-700 font-bold py-4 px-8 rounded-full hover:border-blue-600 hover:text-blue-600 transition-all w-full sm:w-auto text-center">
              Join Community
            </router-link>
          </div>
        </div>

        <!-- Right Visual (Floating Glass Cards) -->
        <div class="hidden lg:block relative h-[500px]">
          <!-- Main abstract shape -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-blue-600 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          
          <!-- Glass Card 1 -->
          <div class="absolute top-10 right-10 bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-6 w-72 animate-[bounce_6s_ease-in-out_infinite]">
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 text-2xl shadow-sm">📄</div>
              <div>
                <p class="font-bold text-gray-800">BCA Sem 3</p>
                <p class="text-xs text-gray-500">Data Structures PDF</p>
              </div>
            </div>
            <div class="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
              <div class="h-full bg-red-500 w-3/4"></div>
            </div>
            <p class="text-xs text-right mt-2 text-gray-400">75% Downloaded</p>
          </div>

          <!-- Glass Card 2 -->
          <div class="absolute bottom-20 left-10 bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-6 w-80 animate-[bounce_8s_ease-in-out_infinite_reverse]">
            <div class="flex items-center justify-between mb-4">
              <p class="font-bold text-gray-800">Career Goal</p>
              <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">On Track</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">💻</div>
              <div>
                <p class="text-sm font-bold text-gray-800">Software Engineer</p>
                <p class="text-xs text-gray-500">Next step: Master React.js</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Proof Banner -->
    <div class="bg-gray-900 py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-800">
        <div>
          <p class="text-4xl font-extrabold text-white mb-1">50K+</p>
          <p class="text-gray-400 text-sm font-medium uppercase tracking-wider">Active Students</p>
        </div>
        <div>
          <p class="text-4xl font-extrabold text-white mb-1">100+</p>
          <p class="text-gray-400 text-sm font-medium uppercase tracking-wider">Colleges</p>
        </div>
        <div>
          <p class="text-4xl font-extrabold text-white mb-1">5K+</p>
          <p class="text-gray-400 text-sm font-medium uppercase tracking-wider">Study Resources</p>
        </div>
        <div>
          <p class="text-4xl font-extrabold text-white mb-1">4.9/5</p>
          <p class="text-gray-400 text-sm font-medium uppercase tracking-wider">Average Rating</p>
        </div>
      </div>
    </div>

    <!-- Advanced Features Section -->
    <section class="py-24 bg-gray-50 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Why Choose NovaLearn</h2>
          <h3 class="text-4xl font-extrabold text-gray-900">Built for the Modern Student</h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
            <div class="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">📚</div>
            <h4 class="text-2xl font-bold text-gray-900 mb-4">Curated Notes</h4>
            <p class="text-gray-600 leading-relaxed">Stop wasting time searching. Get highly organized, semester-wise study materials, and previous year question papers in one click.</p>
          </div>
          <!-- Feature 2 -->
          <div class="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
            <div class="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">🎯</div>
            <h4 class="text-2xl font-bold text-gray-900 mb-4">Career Roadmaps</h4>
            <p class="text-gray-600 leading-relaxed">Don't just pass exams. Follow step-by-step guides to master skills required for roles like Software Engineer or Data Analyst.</p>
          </div>
          <!-- Feature 3 -->
          <div class="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
            <div class="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">🤝</div>
            <h4 class="text-2xl font-bold text-gray-900 mb-4">Expert Driven</h4>
            <p class="text-gray-600 leading-relaxed">All content is strictly vetted and uploaded by our expert administrators to ensure zero mistakes and highest quality.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Course Library Section (Dynamic Content) -->
    <main id="course-library" class="bg-white flex-grow w-full py-24 border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 class="text-4xl font-extrabold text-gray-900 tracking-tight">Course Library</h2>
            <p class="text-gray-500 mt-3 text-lg">Select your degree to unlock premium study materials.</p>
          </div>
          
          <!-- Only Admins can see the Upload Button now -->
          <router-link v-if="currentUser && currentUser.role === 'admin'" to="/upload" class="mt-6 md:mt-0 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-lg flex items-center group">
            <span class="mr-2 text-xl group-hover:rotate-90 transition-transform duration-300">+</span> Manage Content
          </router-link>
        </div>

        <!-- State: Loading -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20 space-y-4">
          <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p class="text-gray-500 font-medium">Fetching the latest courses...</p>
        </div>
        
        <!-- State: Error -->
        <div v-else-if="error" class="bg-red-50 text-red-600 p-8 rounded-3xl border border-red-100 text-center py-12 max-w-2xl mx-auto">
          <span class="text-4xl block mb-4">🔌</span>
          <p class="font-bold text-lg mb-2">Connection Error</p>
          <p class="text-red-500">{{ error }}</p>
        </div>

        <!-- State: Course Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="course in courses" :key="course.id" class="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 hover:shadow-xl hover:border-blue-400 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
            
            <!-- Subtle background accent -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>

            <div class="relative z-10">
              <div class="flex items-start justify-between mb-6">
                <span class="bg-blue-100 text-blue-800 text-xs font-black px-4 py-1.5 rounded-md uppercase tracking-wider">
                  {{ course.short_name }}
                </span>
                <span class="text-gray-500 text-sm font-semibold flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {{ course.total_semesters }} Semesters
                </span>
              </div>
              
              <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{{ course.course_name }}</h3>
              <p class="text-gray-500 mb-10">Complete syllabus breakdown, top-tier handwritten notes, and solved past papers.</p>
            </div>
            
            <div class="mt-auto relative z-10">
              <router-link :to="`/course/${course.id}`" class="w-full inline-flex justify-center items-center bg-gray-50 group-hover:bg-blue-600 text-gray-900 group-hover:text-white font-bold py-4 rounded-xl transition-all border border-gray-200 group-hover:border-transparent">
                Open Course Vault
                <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Top Contributors Leaderboard (Optional: Keep to show top Admins/Teachers) -->
    <section class="py-20 bg-gray-50 border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 mb-2">Top Educators 🏆</h2>
        <p class="text-gray-500 mb-12">Meet the expert admins providing the best content this month.</p>
        
        <div class="flex flex-wrap justify-center gap-6">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 w-64 transform hover:-translate-y-2 transition-all">
            <div class="w-16 h-16 mx-auto bg-gradient-to-tr from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-2xl text-white font-bold mb-4 ring-4 ring-yellow-50">1</div>
            <h3 class="font-bold text-gray-900">Prof. Aman Gupta</h3>
            <p class="text-sm text-blue-600 font-semibold mb-3">BCA Dept Head</p>
            <div class="bg-gray-50 text-gray-600 text-xs py-1.5 rounded-lg font-medium">142 Uploads</div>
          </div>
          <!-- (other leaderboard items remain the same) -->
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-24 bg-white border-t border-gray-100">
      <div class="max-w-5xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-extrabold text-gray-900 mb-4">Simple, Student-Friendly Pricing</h2>
          <p class="text-gray-500 text-lg">Start for free, upgrade when you need exam-winning superpowers.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <!-- Free Tier -->
          <div class="border border-gray-200 rounded-3xl p-8 hover:border-blue-300 transition-colors">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
            <p class="text-gray-500 mb-6">Perfect for everyday studying.</p>
            <div class="text-5xl font-extrabold text-gray-900 mb-6">₹0<span class="text-lg text-gray-400 font-medium">/forever</span></div>
            <ul class="space-y-4 mb-8">
              <li class="flex items-center text-gray-600"><span class="text-green-500 mr-2 font-bold">✓</span> Access to all public notes</li>
              <li class="flex items-center text-gray-600"><span class="text-green-500 mr-2 font-bold">✓</span> Community forum access</li>
              <li class="flex items-center text-gray-600"><span class="text-green-500 mr-2 font-bold">✓</span> Basic career roadmaps</li>
              <li class="flex items-center text-gray-400"><span class="text-gray-300 mr-2 font-bold">✕</span> No Last-Minute Exam PDFs</li>
              <li class="flex items-center text-gray-400"><span class="text-gray-300 mr-2 font-bold">✕</span> Ad-supported experience</li>
            </ul>
            <button class="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl transition-colors">Get Started Free</button>
          </div>

          <!-- Pro Tier -->
          <div class="bg-gray-900 rounded-3xl p-8 border border-gray-800 relative shadow-2xl transform md:-translate-y-4">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">Most Popular</div>
            <h3 class="text-2xl font-bold text-white mb-2">NovaLearn Pro</h3>
            <p class="text-gray-400 mb-6">The ultimate 1-day before exam toolkit.</p>
            <div class="text-5xl font-extrabold text-white mb-6">₹99<span class="text-lg text-gray-500 font-medium">/month</span></div>
            <ul class="space-y-4 mb-8">
              <li class="flex items-center text-gray-300"><span class="text-blue-400 mr-2 font-bold">✓</span> Everything in Basic</li>
              <li class="flex items-center text-gray-300"><span class="text-blue-400 mr-2 font-bold">✓</span> "Pass in 3 Days" exclusive PDFs</li>
              <li class="flex items-center text-gray-300"><span class="text-blue-400 mr-2 font-bold">✓</span> Ad-free experience</li>
              <li class="flex items-center text-gray-300"><span class="text-blue-400 mr-2 font-bold">✓</span> 10+ Solved Previous Year Papers</li>
              <li class="flex items-center text-gray-300"><span class="text-blue-400 mr-2 font-bold">✓</span> Premium Job Board Access</li>
            </ul>
            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-900/50">Upgrade to Pro</button>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-gray-50 border-t border-gray-100">
      <div class="max-w-3xl mx-auto px-4">
        <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
        <div class="space-y-4">
          <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 class="font-bold text-gray-900 text-lg mb-2">Are the notes really free?</h3>
            <p class="text-gray-600">Yes! 90% of our expertly vetted notes and previous year papers are completely free to view and download.</p>
          </div>
          <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 class="font-bold text-gray-900 text-lg mb-2">Who uploads these notes?</h3>
            <p class="text-gray-600">To maintain the highest quality and accuracy, only verified NovaLearn Administrators and Educators can upload content.</p>
          </div>
          <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 class="font-bold text-gray-900 text-lg mb-2">What is NovaLearn Pro?</h3>
            <p class="text-gray-600">Pro is our premium tier designed for last-minute exam prep. It includes expertly curated "crash course" PDFs, solved papers, and zero ads.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial Section -->
    <section class="bg-blue-600 py-24 px-4 text-white">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-extrabold mb-10">"NovaLearn literally saved my semester."</h2>
        <div class="flex items-center justify-center space-x-4 mb-8">
          <div class="flex -space-x-3">
            <div class="w-12 h-12 rounded-full border-2 border-blue-600 bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold">JD</div>
            <div class="w-12 h-12 rounded-full border-2 border-blue-600 bg-blue-200 flex items-center justify-center text-blue-800 text-xs font-bold">AS</div>
            <div class="w-12 h-12 rounded-full border-2 border-blue-600 bg-green-200 flex items-center justify-center text-green-800 text-xs font-bold">MK</div>
          </div>
          <div class="text-left">
            <div class="flex text-yellow-300 text-sm">★★★★★</div>
            <p class="text-blue-200 text-sm font-medium">Loved by 10,000+ Students</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Advanced Footer -->
    <footer class="bg-gray-950 text-gray-400 py-16 px-4 mt-auto border-t border-gray-800">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div class="md:col-span-2">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl">N</div>
            <h2 class="text-2xl font-extrabold text-white tracking-tight">NovaLearn</h2>
          </div>
          <p class="text-gray-500 max-w-sm leading-relaxed mb-6">
            The modern ecosystem designed to empower college students to learn faster, score higher, and build successful careers in tech.
          </p>
          <div class="flex items-center space-x-4">
            <!-- Social placeholders -->
            <a href="#" class="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors border border-gray-800">𝕏</a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors border border-gray-800">in</a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors border border-gray-800">IG</a>
          </div>
        </div>
        
        <div>
          <h3 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Platform</h3>
          <ul class="space-y-4">
            <li><a href="#course-library" class="hover:text-blue-400 transition-colors">Courses</a></li>
            <li><router-link to="/career" class="hover:text-blue-400 transition-colors">Career Paths</router-link></li>
            <li v-if="currentUser && currentUser.role === 'admin'"><router-link to="/upload" class="hover:text-blue-400 transition-colors text-red-400">Manage Content (Admin)</router-link></li>
          </ul>
        </div>

        <div>
          <h3 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Stay Updated</h3>
          <p class="text-sm text-gray-500 mb-4">Get the latest exam tips and job roadmaps in your inbox.</p>
          <form @submit.prevent class="flex">
            <input type="email" placeholder="Email address" class="bg-gray-900 border border-gray-800 text-white rounded-l-lg px-4 py-2.5 w-full focus:outline-none focus:border-blue-500" />
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-r-lg transition-colors">
              &rarr;
            </button>
          </form>
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-sm flex flex-col md:flex-row justify-between items-center">
        <span class="text-center md:text-left text-gray-500">&copy; {{ new Date().getFullYear() }} NovaLearn Startup. All rights reserved.</span>
        <span class="mt-4 md:mt-0 flex items-center font-medium bg-gray-900 px-4 py-2 rounded-full border border-gray-800">
          Made with <span class="text-red-500 mx-1.5 text-lg animate-pulse">❤️</span> by Suru
        </span>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const courses = ref([]);
const loading = ref(true);
const error = ref(null);
const currentUser = ref(null); 

onMounted(async () => {
  // Check if user is logged in via localStorage
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    currentUser.value = JSON.parse(savedUser);
  }

  // Fetch courses from backend
  try {
    const response = await api.getCourses();
    courses.value = response.data.data;
  } catch (err) {
    error.value = "Failed to fetch curriculum data. Please ensure the backend server is online.";
    console.error(err);
  } finally {
    loading.value = false;
  }
});

// Logout function
const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  currentUser.value = null;
  router.push('/login'); 
};
</script>