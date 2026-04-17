<template>
  <div class="min-h-screen bg-gray-50/50 pb-20 font-sans">
    <nav class="bg-white border-b border-gray-100 py-6 px-8 sticky top-0 z-40 shadow-sm backdrop-blur-md bg-white/90">
       <div class="max-w-6xl mx-auto flex items-center justify-between">
          <div class="flex items-center">
             <button @click="$router.push('/profile')" class="mr-6 p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
             </button>
             <div>
                <h1 class="text-2xl font-black text-gray-900 tracking-tight">Content Studio</h1>
                <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Publish New Curriculum</p>
             </div>
          </div>
       </div>
    </nav>

    <main class="max-w-6xl mx-auto px-6 mt-10">
      <div class="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
        
        <!-- Left: Configuration Form -->
        <div class="w-full lg:w-1/3 bg-gray-50/50 p-10 border-r border-gray-100 flex flex-col h-full">
           <h2 class="text-xl font-black text-gray-900 mb-8">Lesson Metadata</h2>
           <form id="uploadForm" class="space-y-6 flex-grow" @submit.prevent="handleUpload">
              
              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Target Program</label>
                <select v-model="form.course_id" required class="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-bold text-gray-700 cursor-pointer shadow-sm transition-all">
                   <option value="" disabled>Select Course...</option>
                   <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.short_name }} - {{ course.course_name }}</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Section / Semester</label>
                <input type="number" v-model="form.semester" required min="1" placeholder="e.g. 1" class="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-bold text-gray-700 shadow-sm transition-all">
              </div>

              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Lesson Title</label>
                <input v-model="form.subject_name" required placeholder="e.g. Intro to Vue 3" class="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-black text-gray-900 shadow-sm transition-all text-lg">
              </div>

              <!-- Premium Toggle -->
              <div class="bg-white p-5 rounded-xl border border-gray-200 flex justify-between items-center shadow-sm mt-8">
                 <div>
                    <label for="pro" class="font-black text-gray-900 cursor-pointer block mb-0.5">Pro Elite Lock</label>
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Require Subscription</span>
                 </div>
                 <div class="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" v-model="form.is_pro" id="pro" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out" :class="form.is_pro ? 'translate-x-6 border-amber-500' : 'translate-x-0 border-gray-300'"/>
                    <label for="pro" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200 ease-in-out" :class="form.is_pro ? 'bg-amber-400' : 'bg-gray-300'"></label>
                 </div>
              </div>

              <!-- File Attachment (Drag & Drop Zone) -->
              <div class="mt-8">
                 <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Supplementary Document</label>
                 <div class="relative border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer bg-white">
                    <input type="file" accept="application/pdf" @change="handleFileChange" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                    <div v-if="!form.pdf_file">
                       <svg class="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                       <span class="text-sm font-bold text-gray-600">Drop PDF here or click</span>
                    </div>
                    <div v-else class="flex flex-col items-center">
                       <svg class="mx-auto h-8 w-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                       <span class="text-sm font-black text-green-600 truncate max-w-[200px]">{{ form.pdf_file.name }}</span>
                    </div>
                 </div>
              </div>
           </form>
        </div>

        <!-- Right: Advanced Rich Text Editor -->
        <div class="w-full lg:w-2/3 p-10 flex flex-col h-[800px]">
           <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-black text-gray-900">Rich Text Composition</h2>
              <button form="uploadForm" type="submit" :disabled="loading" class="bg-gray-900 text-white px-8 py-3 rounded-xl font-black text-sm hover:bg-blue-600 transition-all shadow-lg disabled:opacity-50">
                 {{ loading ? 'Publishing...' : 'Publish Content' }}
              </button>
           </div>
           
           <div class="flex-grow border-2 border-gray-200 rounded-2xl overflow-hidden focus-within:border-blue-500 transition-colors flex flex-col bg-white shadow-sm">
              <!-- Toolbar -->
              <div class="bg-gray-50 border-b border-gray-200 p-3 flex flex-wrap gap-2 items-center">
                 <button type="button" @click="format('bold')" class="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-blue-50 hover:text-blue-600 font-serif font-black transition-colors" title="Bold">B</button>
                 <button type="button" @click="format('italic')" class="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-blue-50 hover:text-blue-600 font-serif italic transition-colors" title="Italic">I</button>
                 <button type="button" @click="format('underline')" class="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-blue-50 hover:text-blue-600 font-serif underline transition-colors" title="Underline">U</button>
                 <div class="w-px h-6 bg-gray-300 mx-2"></div>
                 <button type="button" @click="format('insertOrderedList')" class="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-blue-50 hover:text-blue-600 text-sm font-black transition-colors" title="Numbered List">1.</button>
                 <button type="button" @click="format('insertUnorderedList')" class="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-blue-50 hover:text-blue-600 text-sm font-black transition-colors" title="Bullet List">•</button>
                 <div class="w-px h-6 bg-gray-300 mx-2"></div>
                 <button type="button" @click="format('formatBlock', 'H1')" class="px-2 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-blue-50 hover:text-blue-600 text-xs font-black transition-colors">H1</button>
                 <button type="button" @click="format('formatBlock', 'H2')" class="px-2 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-blue-50 hover:text-blue-600 text-xs font-black transition-colors">H2</button>
                 <button type="button" @click="format('formatBlock', 'P')" class="px-2 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-blue-50 hover:text-blue-600 text-xs font-bold transition-colors">Para</button>
                 <div class="w-px h-6 bg-gray-300 mx-2"></div>
                 <button type="button" @click="format('formatBlock', 'blockquote')" class="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-blue-50 hover:text-blue-600 text-sm font-black transition-colors" title="Quote">""</button>
                 <button type="button" @click="insertCodeBlock" class="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-blue-50 hover:text-blue-600 text-xs font-mono font-bold transition-colors" title="Code Block">&lt;/&gt;</button>
              </div>
              
              <!-- Content Editable Canvas -->
              <div 
                 ref="editor" 
                 contenteditable="true" 
                 class="flex-grow p-8 overflow-y-auto outline-none text-gray-800 editor-content"
                 @input="updateContent"
                 data-placeholder="Start composing your premium lesson here..."
              ></div>
           </div>
        </div>

      </div>
    </main>
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
        
        if (form.value.content && editor.value) {
            editor.value.innerHTML = form.value.content;
        }
    }
  } catch (error) {
    console.error('Failed to load data');
  }
});

// Custom Rich Text Commands
const format = (command, value = null) => {
   document.execCommand(command, false, value);
   editor.value.focus();
   updateContent();
};

const insertCodeBlock = () => {
   const html = `<pre style="background: #111827; color: #fff; padding: 1rem; border-radius: 0.75rem; font-family: monospace; overflow-x: auto; margin-bottom: 1rem;"><code>// Write code here...</code></pre><p><br></p>`;
   document.execCommand('insertHTML', false, html);
   editor.value.focus();
   updateContent();
};

const updateContent = () => {
   form.value.content = editor.value.innerHTML;
};

const handleFileChange = (e) => {
  form.value.pdf_file = e.target.files[0];
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
  if(form.value.content) formData.append('content', form.value.content);
  if(form.value.pdf_file) formData.append('pdf_file', form.value.pdf_file);

  try {
    if (isEditMode.value) {
        await api.updateNote(route.params.noteId, formData);
        alert('Lesson updated successfully in the Matrix!');
        router.push(`/course/${form.value.course_id}`);
    } else {
        await api.uploadNote(formData);
        alert('Lesson published successfully to the Matrix!');
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
/* Placeholder Logic for ContentEditable */
[contenteditable]:empty:before {
    content: attr(data-placeholder);
    color: #9ca3af;
    pointer-events: none;
    display: block;
    font-style: italic;
}

/* Raw CSS for the editor canvas while typing (mirrors CourseDetails reading view) */
.editor-content { line-height: 1.7; font-size: 16px; }
.editor-content :deep(h1) { font-size: 2rem; font-weight: 900; margin-bottom: 1rem; margin-top: 1.5rem; }
.editor-content :deep(h2) { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.75rem; margin-top: 1.5rem; }
.editor-content :deep(p) { margin-bottom: 1rem; }
.editor-content :deep(ul) { list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem; }
.editor-content :deep(ol) { list-style-type: decimal; margin-left: 1.5rem; margin-bottom: 1rem; }
.editor-content :deep(blockquote) { border-left: 4px solid #3b82f6; padding-left: 1rem; color: #6b7280; font-style: italic; margin-bottom: 1rem; }
</style>