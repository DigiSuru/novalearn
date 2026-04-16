<template>
  <div class="min-h-screen bg-white font-sans selection:bg-blue-600 selection:text-white">
    
    <!-- Navigation -->
    <nav :class="{'shadow-md bg-white/95': scrolled, 'bg-white/80': !scrolled}" class="backdrop-blur-xl border-b border-gray-100 fixed top-0 w-full z-50 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-3 cursor-pointer" @click="scrollToTop">
           <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-2xl italic shadow-lg shadow-blue-600/20 transform hover:rotate-12 transition-transform">N</div>
           <span class="text-2xl font-black tracking text-gray-900">NovaLearn-X</span>
           <span class="text-2l font-black tracking text-gray-900">Your new way to learn</span>
        </div>
        
        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center gap-8">
           <div class="flex items-center gap-8 text-sm font-bold text-gray-500">
              <button @click="scrollToSection('features')" class="hover:text-blue-600 transition-colors">Features</button>
              <button @click="scrollToSection('catalog')" class="hover:text-blue-600 transition-colors">Programs</button>
              <button @click="scrollToSection('testimonials')" class="hover:text-blue-600 transition-colors">Testimonials</button>
              <router-link to="/career" class="hover:text-blue-600 transition-colors">Roadmaps</router-link>
              <router-link to="/pricing" class="hover:text-amber-600 transition-colors flex items-center bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg border border-amber-100">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg> Pro
              </router-link>
           </div>
           <div class="h-6 w-px bg-gray-200"></div>
           <template v-if="user">
              <router-link to="/profile" class="bg-gray-900 text-white px-7 py-2.5 rounded-full text-sm font-black hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-500/20 flex items-center group">
                 Workspace <span class="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </router-link>
           </template>
           <template v-else>
              <router-link to="/login" class="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">Sign In</router-link>
              <router-link to="/register" class="bg-blue-600 text-white px-7 py-2.5 rounded-full text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 transform hover:-translate-y-0.5">Start Free</router-link>
           </template>
        </div>

        <!-- Mobile Menu Toggle -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden p-2 text-gray-600">
           <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
           <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <!-- Mobile Nav -->
      <div v-if="mobileMenuOpen" class="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl py-6 px-6 flex flex-col gap-4 z-40">
          <button @click="scrollToSection('features'); mobileMenuOpen = false" class="text-left font-bold text-gray-700 text-lg">Features</button>
          <button @click="scrollToSection('catalog'); mobileMenuOpen = false" class="text-left font-bold text-gray-700 text-lg">Programs</button>
          <router-link to="/pricing" @click="mobileMenuOpen = false" class="font-bold text-amber-600 text-lg">Pro Pricing</router-link>
          <div class="h-px w-full bg-gray-100 my-2"></div>
          <template v-if="user">
              <router-link to="/profile" class="bg-blue-600 text-white text-center py-3 rounded-xl font-black">My Workspace</router-link>
          </template>
          <template v-else>
              <router-link to="/login" class="text-center font-bold text-gray-700 py-2">Sign In</router-link>
              <router-link to="/register" class="bg-blue-600 text-white text-center py-3 rounded-xl font-black">Start Free</router-link>
          </template>
      </div>
    </nav>

    <!-- Advanced Hero Section -->
    <section class="relative pt-32 pb-32 overflow-hidden flex items-center min-h-[90vh]">
       <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>
       <div class="absolute top-0 right-0 w-[50vw] h-[50vh] bg-gradient-to-bl from-blue-50 to-transparent -z-10"></div>
       <div class="absolute bottom-0 left-0 w-[30vw] h-[50vh] bg-gradient-to-tr from-indigo-50 to-transparent -z-10"></div>
       
       <div class="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-100 shadow-sm text-gray-700 font-bold text-xs uppercase tracking-widest mb-10 transform hover:scale-105 transition-transform cursor-default">
             <span class="relative flex h-2.5 w-2.5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span></span>
             v2.0 Elite LMS Platform Live
          </div>
          
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-gray-900 leading-[1.05] mb-8 max-w-5xl">
             Master your <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">{{ dynamicWord }}</span><br class="hidden md:block">
             Accelerate your future.
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-500 font-medium mb-12 max-w-3xl leading-relaxed">
             The all-in-one educational ecosystem featuring rich-text lessons, interactive mock exams, and community-driven learning paths.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-5">
             <router-link to="/register" class="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black shadow-2xl hover:shadow-gray-900/40 hover:-translate-y-1 transition-all text-lg flex items-center justify-center">
                Start Learning Free
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
             </router-link>
             <button @click="scrollToSection('catalog')" class="bg-white text-gray-900 border-2 border-gray-200 px-10 py-5 rounded-2xl font-black hover:border-gray-900 hover:bg-gray-50 transition-all text-lg flex items-center justify-center">
                Explore Programs
             </button>
          </div>
          
          <!-- Live Platform Stats -->
          <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-gray-100 pt-10 w-full max-w-4xl">
             <div>
                <p class="text-4xl font-black text-gray-900">5k+</p>
                <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Active Students</p>
             </div>
             <div>
                <p class="text-4xl font-black text-blue-600">{{ courses.length || 12 }}+</p>
                <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Degree Programs</p>
             </div>
             <div>
                <p class="text-4xl font-black text-indigo-600">99%</p>
                <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Exam Success</p>
             </div>
             <div>
                <p class="text-4xl font-black text-purple-600">24/7</p>
                <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Community Support</p>
             </div>
          </div>
       </div>
    </section>

    <!-- Trusted By Logos -->
    <section class="border-y border-gray-100 bg-gray-50/50 py-10 overflow-hidden">
       <div class="max-w-7xl mx-auto px-6">
          <p class="text-center text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Empowering students across top institutions</p>
          <div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 hover:opacity-100 transition-opacity duration-500">
             <div class="text-2xl font-black text-gray-900 tracking-tighter">MIT</div>
             <div class="text-2xl font-black text-gray-900 tracking-tighter">Stanford</div>
             <div class="text-2xl font-black text-gray-900 tracking-tighter">Harvard</div>
             <div class="text-2xl font-black text-gray-900 tracking-tighter">Oxford</div>
             <div class="text-2xl font-black text-gray-900 tracking-tighter">Cambridge</div>
          </div>
       </div>
    </section>

    <!-- Features Matrix -->
    <section id="features" class="py-32 bg-white">
       <div class="max-w-7xl mx-auto px-6">
          <div class="text-center max-w-3xl mx-auto mb-20">
             <h2 class="text-4xl font-black text-gray-900 tracking-tight mb-4">A complete learning operating system.</h2>
             <p class="text-xl text-gray-500 font-medium">We replaced static PDF dumps with an interactive, community-driven platform designed to guarantee academic success.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div class="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-300 group">
                <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                <h3 class="text-2xl font-black text-gray-900 mb-3">Rich-Text Interactive Curriculum</h3>
                <p class="text-gray-500 font-medium leading-relaxed">No more struggling to read messy PDFs on your phone. Our proprietary content studio delivers beautifully formatted text, code blocks, and diagrams natively in your browser.</p>
             </div>
             
             <div class="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-300 group">
                <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 class="text-2xl font-black text-gray-900 mb-3">Mock Assessments Studio</h3>
                <p class="text-gray-500 font-medium leading-relaxed">Test your knowledge before the real exam. Take dynamic, timed MCQ quizzes created by your faculty, earn XP, and track your accuracy over time.</p>
             </div>
             
             <div class="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-300 group">
                <div class="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
                </div>
                <h3 class="text-2xl font-black text-gray-900 mb-3">Live Community Discourse</h3>
                <p class="text-gray-500 font-medium leading-relaxed">Stuck on a concept? Drop into the course-specific discussion board. Get answers from peers, upvote helpful responses, and collaborate in real-time.</p>
             </div>
             
             <div class="bg-gray-900 p-10 rounded-[2.5rem] border border-gray-800 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 group relative overflow-hidden">
                <div class="absolute -right-10 -top-10 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl"></div>
                <div class="w-16 h-16 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform z-10 relative">
                   <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"></path></svg>
                </div>
                <h3 class="text-2xl font-black text-white mb-3 relative z-10">Pro Elite Premium Vault</h3>
                <p class="text-gray-400 font-medium leading-relaxed relative z-10">Unlock the ultimate unfair advantage. Subscribe to Pro to access fully solved previous year papers, handwritten master notes, and an ad-free workspace.</p>
             </div>
          </div>
       </div>
    </section>

    <!-- Dynamic Course Catalog -->
    <section id="catalog" class="py-32 bg-gray-50 border-t border-gray-100">
       <div class="max-w-7xl mx-auto px-6">
          <div class="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
             <div>
                <span class="text-blue-600 font-black tracking-widest uppercase text-xs">Official Syllabus</span>
                <h2 class="text-4xl font-black text-gray-900 tracking-tight mt-2">Academic Catalog</h2>
                <p class="text-gray-500 font-medium mt-2">Verified degrees and certification learning paths.</p>
             </div>
             
             <!-- Advanced Search & Filter -->
             <div class="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
                <div class="relative w-full sm:w-80">
                   <input v-model="searchQuery" placeholder="Search programs (e.g. BCA)..." class="pl-12 pr-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 font-bold text-sm w-full shadow-sm transition-all">
                   <svg class="w-5 h-5 absolute left-4 top-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
             </div>
          </div>

          <div v-if="loading" class="flex justify-center py-20">
             <div class="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full shadow-lg"></div>
          </div>
          
          <div v-else-if="filteredCourses.length === 0" class="text-center py-24 bg-white rounded-[3rem] border border-gray-200 shadow-sm">
             <div class="text-6xl mb-4 opacity-50">🔍</div>
             <h3 class="text-xl font-black text-gray-900">No programs found</h3>
             <p class="text-gray-500 font-medium mt-1">Try adjusting your search terms.</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <div v-for="course in filteredCourses" :key="course.id" class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-blue-200 transition-all duration-300 group flex flex-col justify-between">
                <div>
                   <div class="flex justify-between items-start mb-8">
                      <div class="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-2xl group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 shadow-inner">
                         {{ course.short_name.charAt(0) }}
                      </div>
                      <span class="bg-gray-50 text-gray-500 border border-gray-100 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">{{ course.total_semesters }} Sections</span>
                   </div>
                   <h3 class="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-3 pr-4">{{ course.course_name }}</h3>
                   <p class="text-gray-400 text-sm font-medium leading-relaxed">Complete curriculum mapped to official educational standards with interactive lessons.</p>
                </div>
                <button @click="$router.push(`/course/${course.id}`)" class="mt-10 w-full py-4 bg-gray-50 border border-gray-100 rounded-xl font-black text-gray-700 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-all flex items-center justify-center">
                   View Curriculum <span class="ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all">→</span>
                </button>
             </div>
          </div>
       </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-32 bg-white">
       <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
             <h2 class="text-4xl font-black text-gray-900 tracking-tight mb-4">Don't just take our word for it.</h2>
             <p class="text-xl text-gray-500 font-medium">Join thousands of students upgrading their academic life.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div class="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-xl transition-all">
                <div class="flex text-amber-400 mb-6"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" v-for="i in 5" :key="i"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg></div>
                <p class="text-gray-700 font-medium italic mb-8">"The rich text lessons completely changed how I study. No more zooming in on blurry PDFs. The Pro plan solved papers saved my finals."</p>
                <div class="flex items-center gap-4">
                   <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-black text-blue-600">A</div>
                   <div><p class="font-black text-gray-900">Ananya R.</p><p class="text-xs text-gray-500 font-bold uppercase tracking-widest">BCA Student</p></div>
                </div>
             </div>
             <!-- ... other testimonials ... -->
          </div>
       </div>
    </section>

    <!-- Final CTA -->
    <section class="py-20">
       <div class="max-w-6xl mx-auto px-6">
          <div class="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
             <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
             <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-3xl"></div>
             
             <div class="relative z-10">
                <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">Ready to transform your grades?</h2>
                <p class="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium">Join the next generation of top-tier students. Create your free account in seconds and unlock the academic vault.</p>
                <router-link to="/register" class="inline-block bg-white text-gray-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-xl">
                   Create Free Account
                </router-link>
             </div>
          </div>
       </div>
    </section>

    <footer class="bg-white border-t border-gray-200 pt-20 pb-10">
       <div class="max-w-7xl mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
             <div class="md:col-span-1">
                <div class="flex items-center gap-2 mb-6">
                   <div class="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-black italic">N</div>
                   <span class="text-xl font-black tracking-tighter text-gray-900">NovaLearn.</span>
                </div>
                <p class="text-gray-500 text-sm font-medium leading-relaxed mb-6">Building the ultimate operating system for modern education. Study smarter, not harder.</p>
             </div>
             
             <!-- Footer Links omitted for brevity, matching previous version -->
          </div>
          
          <div class="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
             <p class="text-gray-400 font-bold text-sm">Made with ❤️ by Suru</p>
             <div class="flex gap-4">
                <a href="#" class="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all">𝕏</a>
                <a href="#" class="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all">in</a>
             </div>
          </div>
       </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import api from '../services/api';

const courses = ref([]);
const loading = ref(true);
const user = ref(null);
const searchQuery = ref('');
const scrolled = ref(false);
const mobileMenuOpen = ref(false);

// Dynamic Rotating Text
const words = ['curriculum.', 'future.', 'career.', 'skills.'];
const dynamicWord = ref(words[0]);
let wordIndex = 0;
let wordInterval;

const filteredCourses = computed(() => {
   return courses.value.filter(c => 
     c.course_name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
     c.short_name.toLowerCase().includes(searchQuery.value.toLowerCase())
   );
});

const scrollToSection = (id) => {
   const el = document.getElementById(id);
   if(el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80; // Offset for sticky nav
      window.scrollTo({ top: y, behavior: 'smooth' });
   }
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const handleScroll = () => { scrolled.value = window.scrollY > 20; };

onMounted(async () => {
  window.addEventListener('scroll', handleScroll);
  const savedUser = localStorage.getItem('user');
  if (savedUser) user.value = JSON.parse(savedUser);

  // Start Word Rotator
  wordInterval = setInterval(() => {
     wordIndex = (wordIndex + 1) % words.length;
     dynamicWord.value = words[wordIndex];
  }, 2000);

  try {
    const res = await api.getCourses();
    courses.value = res.data.data;
  } catch (error) { 
    console.error('Failed to load courses'); 
  } finally { 
    loading.value = false; 
  }
});

onUnmounted(() => {
   window.removeEventListener('scroll', handleScroll);
   clearInterval(wordInterval);
});
</script>