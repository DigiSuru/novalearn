<template>
  <div class="min-h-screen bg-gray-50/50 font-sans pb-20 relative">
    
    <!-- Premium Course Hero -->
    <div class="bg-gray-900 text-white relative overflow-hidden">
      <!-- Abstract Background -->
      <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div class="absolute -right-20 -top-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"></div>
      <div class="absolute -left-20 -bottom-20 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"></div>

      <div class="max-w-7xl mx-auto px-6 py-12 relative z-10 flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
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
          <p class="text-gray-400 mt-2 font-medium max-w-2xl">Master the complete curriculum with rich-text lessons, downloadable assets, and community discussions.</p>
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
    <div class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm backdrop-blur-xl bg-white/90">
       <div class="max-w-7xl mx-auto px-6 flex gap-8 overflow-x-auto no-scrollbar">
          <button @click="activeTab = 'resources'" :class="activeTab === 'resources' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-900'" class="py-5 text-sm font-black uppercase tracking-widest border-b-4 transition-colors whitespace-nowrap flex items-center">
             <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
             Interactive Curriculum
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

    <main class="max-w-7xl mx-auto px-6 mt-10">
      
      <!-- RESOURCES / CURRICULUM TAB -->
      <div v-if="activeTab === 'resources'" class="animate-in fade-in duration-500">
         
         <div v-if="loading" class="text-center py-20"><div class="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div></div>

         <div v-else-if="Object.keys(filteredGroupedNotes).length === 0" class="bg-white p-20 rounded-[3rem] border-2 border-dashed border-gray-200 text-center">
            <div class="text-6xl mb-6">📝</div>
            <h3 class="text-2xl font-black text-gray-800">No Content Yet</h3>
            <p class="text-gray-400 mt-2 font-medium">The curriculum is currently being built by instructors.</p>
         </div>

         <!-- Split Pane Layout -->
         <div v-else class="flex flex-col lg:flex-row gap-8">
            
            <!-- Left Sidebar: Curriculum Navigator -->
            <div class="w-full lg:w-1/3 bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden h-[80vh] flex flex-col flex-shrink-0">
               <div class="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h3 class="font-black text-gray-900 text-lg">Course Syllabus</h3>
                  <p class="text-xs text-gray-500 font-bold mt-1">{{ notes.length }} Total Lessons</p>
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
                                 <svg v-else class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                 {{ note.content ? 'Reading' : 'Document' }}
                              </span>
                           </div>
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            <!-- Right Main Area: Content Viewer -->
            <div class="w-full lg:w-2/3 bg-white rounded-[2rem] border border-gray-200 shadow-sm min-h-[80vh] flex flex-col relative overflow-hidden">
               
               <div v-if="!selectedTopic" class="m-auto text-center p-10">
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
                  <div class="p-8 lg:p-10 border-b border-gray-100">
                     <div class="flex items-center gap-3 mb-4">
                        <span class="bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">Section {{ selectedTopic.semester }}</span>
                        <span v-if="selectedTopic.is_pro" class="bg-amber-100 text-amber-700 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest flex items-center"><svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg> Pro</span>
                     </div>
                     <h1 class="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">{{ selectedTopic.subject_name }}</h1>
                  </div>

                  <!-- Rich Text Area (Using standard CSS) -->
                  <div class="flex-grow p-8 lg:p-10 overflow-y-auto custom-scrollbar">
                     
                     <div v-if="selectedTopic.content" class="rich-text-container" v-html="selectedTopic.content"></div>
                     
                     <div v-else-if="selectedTopic.file_url" class="text-center py-10 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
                        <div class="text-5xl mb-4">📄</div>
                        <h3 class="text-xl font-black text-gray-800">Document Lesson</h3>
                        <p class="text-gray-500 text-sm mt-2 max-w-sm mx-auto">This lesson relies on external documentation. Please download or view the supplementary material below.</p>
                     </div>
                     
                     <div v-if="selectedTopic.file_url" class="mt-12 bg-blue-50/50 border border-blue-100 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div class="flex items-center gap-4">
                           <div class="w-12 h-12 bg-white rounded-xl text-blue-600 flex items-center justify-center text-2xl shadow-sm border border-blue-50">📎</div>
                           <div>
                              <p class="font-black text-gray-900 text-sm">Supplementary Material</p>
                              <p class="text-xs text-gray-500 font-bold mt-0.5">PDF Document Attachment</p>
                           </div>
                        </div>
                        <a :href="selectedTopic.file_url" target="_blank" @click="trackDownload(selectedTopic.id)" class="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-black transition-colors shadow-lg">
                           Download File
                        </a>
                     </div>
                  </div>

                  <div class="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
                     <button @click="markComplete" :class="isCompleted ? 'text-green-600' : 'text-gray-400 hover:text-blue-600'" class="flex items-center font-black text-sm uppercase tracking-widest transition-colors">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {{ isCompleted ? 'Completed' : 'Mark as Complete' }}
                     </button>
                     <div class="flex gap-2">
                        <button @click="nextLesson" class="bg-gray-900 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-blue-600 transition-colors shadow-md">Next Lesson &rarr;</button>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>

      <!-- DISCUSSIONS TAB -->
      <div v-if="activeTab === 'discussion'" class="animate-in fade-in duration-500 max-w-4xl mx-auto">
         <div class="bg-white rounded-[2.5rem] shadow-lg border border-gray-100 overflow-hidden flex flex-col h-[75vh]">
            <div class="p-8 border-b border-gray-50 bg-gray-50/80 backdrop-blur-md flex items-center justify-between">
               <div>
                  <h3 class="font-black text-2xl text-gray-900 tracking-tight">Community Forum</h3>
                  <p class="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Peer-to-peer learning.</p>
               </div>
            </div>

            <div class="flex-grow overflow-y-auto p-8 space-y-6 custom-scrollbar" id="chat-box">
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
            <div v-for="q in quizzes" :key="q.id" class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-purple-500 hover:shadow-xl transition-all">
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
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

const progressPercentage = computed(() => {
   if(notes.value.length === 0) return 0;
   return Math.floor((completedLessons.value.length / notes.value.length) * 100); 
});

const filteredGroupedNotes = computed(() => {
  const groups = {};
  notes.value.forEach(n => {
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
      
      if(notes.value.length > 0) {
         selectedTopic.value = notes.value[0];
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
      await trackDownload(selectedTopic.value.id);
   }
};

const nextLesson = () => {
   if(!selectedTopic.value) return;
   const currentIndex = notes.value.findIndex(n => n.id === selectedTopic.value.id);
   if(currentIndex !== -1 && currentIndex < notes.value.length - 1) {
      selectedTopic.value = notes.value[currentIndex + 1];
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
.fade-in { animation-name: fadeIn; }

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

/* ERROR-FREE RAW CSS FOR RICH TEXT */
.rich-text-container {
   color: #374151;
   line-height: 1.7;
   max-width: 56rem;
   margin-left: auto;
   margin-right: auto;
   font-size: 16px;
}
.rich-text-container :deep(h1) { font-size: 2.25rem; font-weight: 900; color: #111827; margin-bottom: 1.5rem; margin-top: 2rem; letter-spacing: -0.025em; }
.rich-text-container :deep(h2) { font-size: 1.5rem; font-weight: 800; color: #1f2937; margin-bottom: 1rem; margin-top: 1.5rem; }
.rich-text-container :deep(h3) { font-size: 1.25rem; font-weight: 700; color: #1f2937; margin-bottom: 0.75rem; margin-top: 1.25rem; }
.rich-text-container :deep(p) { margin-bottom: 1.25rem; }
.rich-text-container :deep(ul) { list-style-type: disc; list-style-position: inside; margin-bottom: 1.25rem; padding-left: 1rem; }
.rich-text-container :deep(ol) { list-style-type: decimal; list-style-position: inside; margin-bottom: 1.25rem; padding-left: 1rem; }
.rich-text-container :deep(li) { margin-bottom: 0.5rem; }
.rich-text-container :deep(a) { color: #2563eb; text-decoration: none; font-weight: 600; }
.rich-text-container :deep(a:hover) { text-decoration: underline; }
.rich-text-container :deep(blockquote) { border-left: 4px solid #2563eb; background-color: #eff6ff; padding: 1.25rem; margin-bottom: 1.25rem; font-style: italic; color: #4b5563; border-top-right-radius: 0.75rem; border-bottom-right-radius: 0.75rem; }
.rich-text-container :deep(code) { background-color: #f3f4f6; color: #db2777; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.875rem; font-family: monospace; font-weight: 600;}
.rich-text-container :deep(pre) { background-color: #111827; color: #f3f4f6; padding: 1.25rem; border-radius: 0.75rem; margin-bottom: 1.25rem; overflow-x: auto; font-size: 0.875rem; font-family: monospace; }
.rich-text-container :deep(pre code) { background-color: transparent; color: inherit; padding: 0; font-weight: 400;}
.rich-text-container :deep(img) { max-width: 100%; height: auto; border-radius: 1rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); margin-bottom: 1.25rem; }
</style>