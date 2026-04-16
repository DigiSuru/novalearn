<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <button @click="$router.push('/')" class="mb-6 text-blue-600 font-medium hover:underline flex items-center group">
        <span class="mr-2 transform group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Dashboard
      </button>

      <div v-if="loading" class="text-center py-10 text-gray-400 font-medium italic">Loading curriculum...</div>
      
      <div v-else>
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
          <h1 class="text-3xl font-black text-gray-900 mb-2 tracking-tight">Course Repository 📚</h1>
          <p class="text-gray-500 font-medium">Access verified study materials and verified exam patterns.</p>
        </div>

        <div v-if="notes.length === 0" class="text-center p-16 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <div class="text-5xl mb-4">📂</div>
          <h3 class="text-xl font-bold text-gray-700">No materials found</h3>
          <p class="text-gray-400">Our educators are currently curating content for this course.</p>
        </div>

        <div v-else>
          <div v-for="(semesterNotes, semester) in groupedNotes" :key="semester" class="mb-12">
            <h2 class="text-2xl font-black text-gray-800 mb-6 flex items-center">
              <span class="bg-blue-600 text-white text-xs px-3 py-1 rounded-lg mr-3">SEM {{ semester }}</span>
              Semester Overview
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="note in semesterNotes" :key="note.id" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-300 transition-all group relative">
                
                <button v-if="isAdmin" @click="handleDelete(note.id)" class="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>

                <div class="mb-6">
                  <h4 class="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">{{ note.subject_name }}</h4>
                  <p class="text-xs font-bold text-gray-400 uppercase mt-1 tracking-widest">Digital Resource • Verified</p>
                </div>
                
                <a 
                  :href="note.file_url" 
                  target="_blank" 
                  @click="trackDownload(note.id)"
                  class="flex items-center justify-center w-full bg-blue-50 text-blue-600 py-3 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all border border-blue-100 group-hover:border-transparent"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Get Notes
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import api from '../services/api';

const route = useRoute();
const notes = ref([]);
const loading = ref(true);
const user = ref(null);

const isAdmin = computed(() => user.value?.role === 'admin');

const groupedNotes = computed(() => {
  const groups = {};
  notes.value.forEach(note => {
    if (!groups[note.semester]) groups[note.semester] = [];
    groups[note.semester].push(note);
  });
  return groups;
});

const trackDownload = async (noteId) => {
  if (!user.value) return;
  try { await api.recordProgress(noteId); } catch (e) { console.error(e); }
};

const handleDelete = async (id) => {
  if (!confirm("Delete permanently?")) return;
  try {
    await api.deleteNote(id);
    notes.value = notes.value.filter(n => n.id !== id);
  } catch (e) { alert("Delete failed"); }
};

onMounted(async () => {
  const saved = localStorage.getItem('user');
  if (saved) user.value = JSON.parse(saved);

  try {
    const res = await api.getCourseNotes(route.params.id);
    notes.value = res.data.data;
  } catch (e) { console.error(e); } finally { loading.value = false; }
});
</script>