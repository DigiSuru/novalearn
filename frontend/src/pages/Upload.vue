<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
    <div class="flex-grow flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full">
        
        <!-- Left: Upload Settings Matrix -->
        <div class="w-full lg:w-1/3 bg-white border-r border-gray-200 shadow-sm z-10 flex flex-col h-[800px]">
          <div class="p-8 border-b border-gray-100 bg-white sticky top-0 z-20">
             <div class="flex items-center mb-2">
                 <button @click="$router.push('/profile')" class="mr-6 p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                 </button>
                 <div>
                    <h1 class="text-2xl font-black text-gray-900 tracking-tight">{{ isEditMode ? 'Edit Content' : 'Content Studio' }}</h1>
                    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">{{ isEditMode ? 'Update Existing Curriculum' : 'Publish New Curriculum' }}</p>
                 </div>
              </div>
           </div>

           <div class="p-8 flex-grow overflow-y-auto custom-scrollbar">
            <form id="uploadForm" @submit.prevent="handleUpload" class="space-y-8">
              
              <!-- Content Type Selector (NEW) -->
              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Content Type</label>
                <div class="flex flex-col sm:flex-row gap-4">
                   <label class="flex-1 border-2 rounded-xl p-4 cursor-pointer flex items-center gap-3 transition-all" :class="form.doc_type === 'lesson' ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'">
                      <input type="radio" v-model="form.doc_type" value="lesson" class="hidden">
                      <span class="text-2xl">📚</span>
                      <div>
                         <p class="font-black text-gray-900 text-sm">Curriculum Lesson</p>
                         <p class="text-[10px] text-gray-500 font-bold uppercase mt-0.5">Standard Chapter</p>
                      </div>
                   </label>
                   <label class="flex-1 border-2 rounded-xl p-4 cursor-pointer flex items-center gap-3 transition-all" :class="form.doc_type === 'paper' ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'">
                      <input type="radio" v-model="form.doc_type" value="paper" class="hidden">
                      <span class="text-2xl">📄</span>
                      <div>
                         <p class="font-black text-gray-900 text-sm">Exam Paper</p>
                         <p class="text-[10px] text-gray-500 font-bold uppercase mt-0.5">Previous/Sample Exam</p>
                      </div>
                   </label>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Target Program</label>
                    <select v-model="form.course_id" required :disabled="isEditMode" class="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-bold text-gray-700 cursor-pointer shadow-sm transition-all disabled:opacity-50">
                       <option value="" disabled>Select Course...</option>
                       <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.short_name }} - {{ course.course_name }}</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Section / Year</label>
                    <input type="number" v-model="form.semester" required min="1" :disabled="isEditMode" :placeholder="form.doc_type === 'paper' ? 'e.g. 2023' : 'e.g. 1'" class="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-bold text-gray-700 shadow-sm transition-all disabled:opacity-50">
                  </div>
              </div>

              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Title / Subject Name</label>
                <input type="text" v-model="form.subject_name" required :placeholder="form.doc_type === 'paper' ? 'e.g. 2023 CBSE Board Paper' : 'e.g. Intro to Python'" class="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-bold text-gray-900 shadow-sm transition-all">
              </div>

              <!-- Media Attachment -->
              <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200 border-dashed relative group hover:bg-blue-50 hover:border-blue-300 transition-colors">
                <input type="file" @change="handleFileUpload" accept="application/pdf,video/mp4" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                <div class="flex flex-col items-center text-center space-y-2 pointer-events-none">
                   <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                   </div>
                   <p class="font-black text-gray-900 text-sm">Attach Media File</p>
                   <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{{ form.pdf_file ? form.pdf_file.name : 'PDF Documents or MP4 Videos' }}</p>
                </div>
              </div>

              <!-- Pro Gating -->
              <div class="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100 flex items-center justify-between">
                 <div>
                    <h4 class="font-black text-amber-900 text-sm flex items-center">
                       <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
                       Pro Elite Exclusivity
                    </h4>
                    <p class="text-[10px] font-bold text-amber-700 uppercase tracking-widest mt-1">Gate this behind subscription.</p>
                 </div>
                 <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="form.is_pro" class="sr-only peer">
                    <div class="w-14 h-7 bg-amber-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500 shadow-inner"></div>
                 </label>
              </div>

            </form>
           </div>
        </div>

        <!-- Right: Advanced Rich Text Editor -->
        <div class="w-full lg:w-2/3 p-10 flex flex-col h-[800px]">
           <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-black text-gray-900">Rich Text Composition</h2>
              <button form="uploadForm" type="submit" :disabled="loading" class="bg-gray-900 text-white px-8 py-3 rounded-xl font-black text-sm hover:bg-blue-600 transition-all shadow-lg disabled:opacity-50">
                 {{ loading ? (isEditMode ? 'Updating...' : 'Publishing...') : (isEditMode ? 'Update Content' : 'Publish Content') }}
              </button>
           </div>
           
           <div class="flex-grow border-2 border-gray-200 rounded-2xl overflow-hidden focus-within:border-blue-500 transition-colors flex flex-col bg-white shadow-sm">
              <!-- Toolbar -->
              <div class="bg-gray-50 border-b border-gray-200 p-3 flex flex-wrap gap-2 items-center">
                 <div class="flex gap-1 pr-3 border-r border-gray-300">
                    <button type="button" @click="formatDoc('formatBlock', 'H1')" class="w-8 h-8 rounded hover:bg-gray-200 font-black text-gray-700 transition-colors" title="Heading 1">H1</button>
                    <button type="button" @click="formatDoc('formatBlock', 'H2')" class="w-8 h-8 rounded hover:bg-gray-200 font-bold text-gray-700 transition-colors" title="Heading 2">H2</button>
                    <button type="button" @click="formatDoc('formatBlock', 'P')" class="w-8 h-8 rounded hover:bg-gray-200 font-medium text-gray-700 transition-colors" title="Paragraph">P</button>
                 </div>
                 <div class="flex gap-1 pr-3 border-r border-gray-300">
                    <button type="button" @click="formatDoc('bold')" class="w-8 h-8 rounded hover:bg-gray-200 font-black text-gray-700 transition-colors title='Bold'">B</button>
                    <button type="button" @click="formatDoc('italic')" class="w-8 h-8 rounded hover:bg-gray-200 italic font-serif text-gray-700 transition-colors title='Italic'">I</button>
                    <button type="button" @click="formatDoc('underline')" class="w-8 h-8 rounded hover:bg-gray-200 underline text-gray-700 transition-colors title='Underline'">U</button>
                 </div>
                 <div class="flex gap-1 pr-3 border-r border-gray-300">
                    <button type="button" @click="formatDoc('insertUnorderedList')" class="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center transition-colors"><svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg></button>
                    <button type="button" @click="formatDoc('insertOrderedList')" class="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center transition-colors"><svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg></button>
                 </div>
                 <div class="flex gap-1">
                    <button type="button" @click="insertCodeBlock" class="px-3 h-8 rounded hover:bg-gray-200 font-mono text-xs font-bold text-gray-700 transition-colors flex items-center">
                       <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg> Code
                    </button>
                    <button type="button" @click="insertLink" class="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center transition-colors"><svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg></button>
                 </div>
              </div>
              
              <!-- Content Editable Area -->
              <div 
                ref="editor" 
                class="flex-grow p-8 outline-none overflow-y-auto custom-scrollbar rich-text-editor"
                contenteditable="true" 
                @input="updateContent"
                placeholder="Start typing your rich-text lesson here..."
              ></div>
           </div>
        </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../services/api';

const route = useRoute();
const router = useRouter();
const courses = ref([]);
const loading = ref(false);
const editor = ref(null);
const isEditMode = ref(false);

const form = ref({
  course_id: '',
  semester: '',
  subject_name: '',
  is_pro: false,
  content: '',
  doc_type: 'lesson', // Default to lesson
  pdf_file: null
});

onMounted(async () => {
  try {
    const res = await api.getCourses();
    courses.value = res.data.data;
    
    // Check if we are in edit mode
    if (route.params.noteId) {
        isEditMode.value = true;
        const noteRes = await api.getNote(route.params.noteId);
        const note = noteRes.data.data;
        
        form.value.course_id = note.course_id;
        form.value.semester = note.semester;
        form.value.subject_name = note.subject_name;
        form.value.is_pro = note.is_pro === 1 || note.is_pro === true;
        form.value.content = note.content || '';
        form.value.doc_type = note.doc_type || 'lesson'; // Load the type
        
        if (form.value.content && editor.value) {
            editor.value.innerHTML = form.value.content;
        }
    }
  } catch (error) {
    console.error('Failed to load data');
  }
});

// Custom Rich Text Commands
const formatDoc = (cmd, value = null) => {
  document.execCommand(cmd, false, value);
  editor.value.focus();
  updateContent();
};

const insertLink = () => {
  const url = prompt('Enter link URL:');
  if (url) formatDoc('createLink', url);
};

const insertCodeBlock = () => {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;
  const range = selection.getRangeAt(0);
  const pre = document.createElement('pre');
  const code = document.createElement('code');
  code.textContent = selection.toString() || ' // Enter code here\n';
  pre.appendChild(code);
  range.deleteContents();
  range.insertNode(pre);
  
  // Move cursor after the code block
  const newRange = document.createRange();
  newRange.setStartAfter(pre);
  selection.removeAllRanges();
  selection.addRange(newRange);
  updateContent();
};

const updateContent = () => {
  form.value.content = editor.value.innerHTML;
};

const handleFileUpload = (event) => {
  form.value.pdf_file = event.target.files[0];
};

const handleUpload = async () => {
  loading.value = true;
  const formData = new FormData();
  if (!isEditMode.value) {
      formData.append('course_id', form.value.course_id);
      formData.append('semester', form.value.semester);
  }
  formData.append('subject_name', form.value.subject_name);
  formData.append('is_pro', form.value.is_pro);
  formData.append('doc_type', form.value.doc_type); // Attach new field
  if(form.value.content) formData.append('content', form.value.content);
  if(form.value.pdf_file) formData.append('pdf_file', form.value.pdf_file);

  try {
    if (isEditMode.value) {
        await api.updateNote(route.params.noteId, formData);
        alert('Content updated successfully in the Matrix!');
        router.push(`/course/${form.value.course_id}`);
    } else {
        await api.uploadNote(formData);
        alert('Content published successfully to the Matrix!');
        router.push('/profile');
    }
  } catch (error) {
    alert('Action failed. Ensure the backend accepts the content payload.');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

/* Styles for the editor matching the frontend rendering */
.rich-text-editor[placeholder]:empty:before { content: attr(placeholder); color: #9ca3af; cursor: text; }
.rich-text-editor { color: #374151; line-height: 1.7; font-size: 16px; }
.rich-text-editor :deep(h1) { font-size: 2.25rem; font-weight: 900; color: #111827; margin-bottom: 1.5rem; margin-top: 1rem; }
.rich-text-editor :deep(h2) { font-size: 1.5rem; font-weight: 800; color: #1f2937; margin-bottom: 1rem; margin-top: 1rem; }
.rich-text-editor :deep(p) { margin-bottom: 1rem; }
.rich-text-editor :deep(ul) { list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem; }
.rich-text-editor :deep(ol) { list-style-type: decimal; margin-left: 1.5rem; margin-bottom: 1rem; }
.rich-text-editor :deep(a) { color: #2563eb; text-decoration: underline; }
.rich-text-editor :deep(pre) { background-color: #111827; color: #f3f4f6; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem; overflow-x: auto; font-family: monospace; font-size: 0.875rem; }
</style>