<template>
  <div class="min-h-screen bg-gray-950 text-white font-sans flex flex-col selection:bg-blue-600 selection:text-white">
    
    <!-- Quiz Header (Sticky) -->
    <header class="px-6 py-4 border-b border-white/10 bg-gray-900/80 backdrop-blur-xl sticky top-0 z-50">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <button @click="confirmExit" class="flex items-center text-gray-400 hover:text-white transition-colors group font-bold text-sm">
          <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Exit Exam
        </button>
        
        <div class="text-center hidden md:block">
          <h1 class="text-lg font-black tracking-tight text-white">{{ quiz?.title }}</h1>
          <p class="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-0.5">Secure Assessment Environment</p>
        </div>
        
        <!-- Dynamic Timer -->
        <div :class="timeLeft < 60 ? 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse' : 'bg-white/10 text-white border-white/20'" class="px-5 py-2 rounded-xl border font-mono font-black text-lg tracking-widest shadow-lg">
          {{ formatTime(timeLeft) }}
        </div>
      </div>
    </header>

    <main class="flex-grow flex relative overflow-hidden">
      <!-- Background Glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <!-- Main Content Area -->
      <div class="flex-grow flex items-center justify-center p-6 lg:p-12 relative z-10 overflow-y-auto">
        
        <div v-if="loading" class="text-center">
          <div class="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6 shadow-lg shadow-blue-500/20"></div>
          <p class="text-blue-400 font-black uppercase tracking-[0.2em] text-xs">Initializing Secure Environment...</p>
        </div>

        <!-- Result Screen -->
        <div v-else-if="submitted" class="max-w-xl w-full bg-gray-900 p-10 md:p-12 rounded-[3rem] border border-white/10 text-center shadow-2xl relative animate-in zoom-in-95 duration-500">
          <!-- Pass/Fail Badge -->
          <div class="inline-flex items-center justify-center px-4 py-1.5 rounded-full mb-6 border" :class="result.status === 'Passed' ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-red-500/20 border-red-500/30 text-red-400'">
             <span class="w-2 h-2 rounded-full mr-2 animate-pulse" :class="result.status === 'Passed' ? 'bg-green-400' : 'bg-red-400'"></span>
             <span class="text-xs font-black uppercase tracking-widest">{{ result.status }}</span>
          </div>

          <div class="text-7xl mb-6 transform hover:scale-110 transition-transform">
             {{ result.status === 'Passed' ? '🏆' : '📚' }}
          </div>
          <h2 class="text-4xl font-black mb-2 tracking-tight">Assessment Complete</h2>
          <p class="text-gray-400 mb-10 font-medium">Attempt #{{ result.attempt }} logged into the academic matrix.</p>
          
          <div class="grid grid-cols-2 gap-6 mb-12">
            <div class="bg-gray-800/50 p-6 rounded-[2rem] border border-white/5">
              <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Final Accuracy</p>
              <p class="text-4xl font-black text-white">{{ Math.round((result.score / result.total) * 100) }}<span class="text-xl text-gray-500">%</span></p>
              <p class="text-xs text-blue-400 font-bold mt-2">{{ result.score }} / {{ result.total }} Correct</p>
            </div>
            <div class="bg-gray-800/50 p-6 rounded-[2rem] border border-white/5 relative overflow-hidden">
              <div v-if="result.status === 'Passed'" class="absolute inset-0 bg-green-500/5 blur-xl"></div>
              <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 relative z-10">XP Earned</p>
              <p class="text-4xl font-black relative z-10" :class="result.status === 'Passed' ? 'text-green-400' : 'text-gray-500'">
                 {{ result.status === 'Passed' ? `+${result.score * 100}` : '0' }}
              </p>
              <p class="text-xs font-bold mt-2 relative z-10" :class="result.status === 'Passed' ? 'text-green-500/70' : 'text-gray-500'">
                 {{ result.status === 'Passed' ? 'Rank Increased' : 'Pass required for XP' }}
              </p>
            </div>
          </div>

          <button @click="$router.push(`/course/${route.params.id}`)" class="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black transition-all shadow-xl shadow-blue-600/20 text-lg">
            Return to Curriculum
          </button>
        </div>

        <!-- Question View -->
        <div v-else-if="currentQuestion" class="max-w-3xl w-full animate-in fade-in duration-300">
          
          <div class="flex justify-between items-center mb-8">
             <!-- Flag for review -->
             <button @click="toggleFlag" :class="isFlagged ? 'text-amber-400 bg-amber-400/10 border-amber-400/30' : 'text-gray-500 bg-white/5 border-white/10 hover:text-white'" class="flex items-center px-4 py-2 rounded-lg border text-xs font-black uppercase tracking-widest transition-all shadow-sm">
                <svg class="w-4 h-4 mr-2" :fill="isFlagged ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                {{ isFlagged ? 'Flagged for Review' : 'Flag Question' }}
             </button>
             <!-- Mobile Progress -->
             <span class="lg:hidden text-xs font-black text-gray-400 uppercase tracking-widest">Q {{ currentIndex + 1 }} of {{ questions.length }}</span>
          </div>

          <h3 class="text-3xl md:text-4xl font-black mb-12 leading-tight tracking-tight text-white">{{ currentQuestion.question_text }}</h3>

          <div class="space-y-4">
            <button 
              v-for="opt in ['A', 'B', 'C', 'D']" 
              :key="opt"
              @click="selectOption(opt)"
              :class="answers[currentQuestion.id] === opt ? 'bg-blue-600 border-blue-500 shadow-xl shadow-blue-600/20 translate-x-2' : 'bg-gray-900 border-white/10 hover:bg-gray-800 hover:border-gray-500'"
              class="w-full text-left p-6 rounded-[1.5rem] border-2 transition-all duration-200 group flex items-center"
            >
              <span :class="answers[currentQuestion.id] === opt ? 'bg-white text-blue-600' : 'bg-gray-800 text-gray-400'" class="w-10 h-10 rounded-xl flex items-center justify-center font-black mr-6 transition-colors text-lg flex-shrink-0 shadow-sm">
                {{ opt }}
              </span>
              <span class="font-bold text-lg leading-relaxed">{{ currentQuestion['option_' + opt.toLowerCase()] }}</span>
            </button>
          </div>

          <!-- Navigation Controls -->
          <div class="mt-16 flex justify-between items-center border-t border-white/10 pt-8">
            <button @click="prevQuestion" :disabled="currentIndex === 0" class="px-8 py-4 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all disabled:opacity-0">
              &larr; Previous
            </button>
            
            <button 
              @click="nextQuestion" 
              class="bg-white text-gray-900 px-10 py-4 rounded-2xl font-black hover:bg-blue-500 hover:text-white transition-all shadow-lg text-lg flex items-center"
            >
              {{ currentIndex === questions.length - 1 ? 'Submit Assessment' : 'Next Question' }}
              <svg v-if="currentIndex !== questions.length - 1" class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              <svg v-else class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </button>
          </div>
          
          <!-- Keyboard Hint -->
          <div class="mt-8 text-center hidden md:block">
             <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Keyboard Shortcuts: <b>A B C D</b> to select, <b>← &rarr;</b> to navigate</p>
          </div>
        </div>
        
        <div v-else class="text-center relative z-10">
           <h2 class="text-2xl font-black text-gray-400">Assessment data not found.</h2>
           <button @click="$router.back()" class="mt-4 text-blue-500 font-bold hover:underline">Return to Course</button>
        </div>
      </div>

      <!-- Navigator Sidebar (Desktop Only) -->
      <div v-if="!loading && !submitted && questions.length > 0" class="hidden lg:flex w-72 bg-gray-900/50 backdrop-blur-xl border-l border-white/10 flex-col relative z-20 shadow-2xl">
         <div class="p-6 border-b border-white/10 bg-gray-900">
            <h3 class="text-sm font-black text-white tracking-widest uppercase mb-1">Assessment Grid</h3>
            <p class="text-[10px] text-blue-400 font-black uppercase tracking-widest">{{ answeredCount }} of {{ questions.length }} Answered</p>
         </div>
         <div class="flex-grow overflow-y-auto p-6 grid grid-cols-4 gap-3 content-start custom-scrollbar">
            <button
               v-for="(q, i) in questions"
               :key="q.id"
               @click="currentIndex = i"
               :class="[
                  currentIndex === i ? 'ring-2 ring-white scale-110 shadow-lg z-10' : 'hover:bg-gray-800 hover:scale-105',
                  answers[q.id] ? 'bg-blue-600 text-white border-blue-500' : 'bg-gray-950 text-gray-500 border-white/10',
                  flagged.has(q.id) ? 'border-amber-400 border-2 text-amber-400' : 'border'
               ]"
               class="relative w-full aspect-square rounded-xl flex items-center justify-center font-black text-sm transition-all"
            >
               {{ i + 1 }}
               <div v-if="flagged.has(q.id)" class="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-gray-900 shadow-sm"></div>
            </button>
         </div>
         <div class="p-6 border-t border-white/10 space-y-3 bg-gray-900">
            <div class="flex items-center text-xs text-gray-400 font-bold"><span class="w-3 h-3 rounded bg-blue-600 mr-3 shadow-sm border border-blue-500"></span> Answered</div>
            <div class="flex items-center text-xs text-gray-400 font-bold"><span class="w-3 h-3 rounded bg-gray-950 border border-white/20 mr-3"></span> Unanswered</div>
            <div class="flex items-center text-xs text-gray-400 font-bold"><span class="w-3 h-3 rounded bg-gray-950 border-2 border-amber-400 mr-3"></span> Flagged for Review</div>
         </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../services/api';

const route = useRoute();
const router = useRouter();

const quiz = ref(null);
const questions = ref([]);
const currentIndex = ref(0);
const answers = ref({});
const flagged = ref(new Set()); // Tracks flagged question IDs
const loading = ref(true);
const submitted = ref(false);
const result = ref({ score: 0, total: 0, attempt: 1, status: 'Completed' });

const timeLeft = ref(1800); // 30 minutes default
let timerInterval = null;

const currentQuestion = computed(() => questions.value[currentIndex.value]);
const answeredCount = computed(() => Object.keys(answers.value).length);
const isFlagged = computed(() => currentQuestion.value && flagged.value.has(currentQuestion.value.id));

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

const selectOption = (opt) => {
  answers.value[currentQuestion.value.id] = opt;
};

const toggleFlag = () => {
   if(!currentQuestion.value) return;
   if(flagged.value.has(currentQuestion.value.id)) {
      flagged.value.delete(currentQuestion.value.id);
   } else {
      flagged.value.add(currentQuestion.value.id);
   }
};

const nextQuestion = () => {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
  } else {
    handleSubmit();
  }
};

const prevQuestion = () => {
  if (currentIndex.value > 0) currentIndex.value--;
};

// Keyboard Shortcuts Listener
const handleKeydown = (e) => {
   if (submitted.value || loading.value) return;
   
   const key = e.key.toUpperCase();
   if (['A', 'B', 'C', 'D'].includes(key)) {
      selectOption(key);
   } else if (e.key === 'ArrowRight') {
      nextQuestion();
   } else if (e.key === 'ArrowLeft') {
      prevQuestion();
   } else if (e.key === 'f' || e.key === 'F') {
      toggleFlag();
   }
};

const handleSubmit = async () => {
  const unanswered = questions.value.length - answeredCount.value;
  if (unanswered > 0) {
     if(!confirm(`You have ${unanswered} unanswered questions. Are you sure you want to submit?`)) return;
  } else if (flagged.value.size > 0) {
     if(!confirm(`You have ${flagged.value.size} questions flagged for review. Submit anyway?`)) return;
  } else {
     if(!confirm("Ready to submit your assessment?")) return;
  }
  
  loading.value = true;
  try {
    const res = await api.submitQuiz(route.params.id, { answers: answers.value });
    result.value = { 
       score: res.data.score, 
       total: res.data.total, 
       attempt: res.data.attempt, 
       status: res.data.status 
    };
    submitted.value = true;
    clearInterval(timerInterval);
  } catch (err) {
    alert("Submission failed. Please check your connection.");
  } finally {
    loading.value = false;
  }
};

const confirmExit = () => {
  if (submitted.value) return router.back();
  if (confirm("Exit exam? Your current progress will be lost and recorded as a 0.")) router.back();
};

onMounted(async () => {
  window.addEventListener('keydown', handleKeydown);
  
  try {
    const res = await api.getQuizDetails(route.params.id);
    quiz.value = res.data.quiz;
    questions.value = res.data.questions;
    
    // Scale time based on question count (e.g. 1.5 mins per question)
    timeLeft.value = questions.value.length * 90;
    
    timerInterval = setInterval(() => {
      if (timeLeft.value > 0) timeLeft.value--;
      else handleSubmit(); // Auto-submit when time expires
    }, 1000);
    
  } catch (err) {
    console.error(err);
    alert("Could not load assessment.");
    router.push('/');
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
   window.removeEventListener('keydown', handleKeydown);
   if(timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
.animate-in { animation-duration: 0.4s; animation-fill-mode: both; }
@keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.zoom-in-95 { animation-name: zoomIn; }
.fade-in { animation-name: fadeIn; }

/* Thin elegant scrollbar for the navigator */
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
</style>