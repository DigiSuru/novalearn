<template>
  <div class="min-h-screen bg-gray-50/50 pb-12 font-sans">
    
    <!-- Navigation / Header -->
    <header class="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button @click="$router.push('/')" class="text-gray-500 hover:text-blue-600 font-medium flex items-center transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Dashboard
        </button>
        <div class="font-bold text-xl tracking-tight text-gray-800">My Workspace</div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      
      <!-- Profile Header (Cover & Avatar) -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <!-- Cover Photo Gradient -->
        <div class="h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
          <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        
        <div class="px-8 pb-8 relative">
          <!-- Avatar -->
          <div class="absolute -top-16 border-4 border-white h-32 w-32 rounded-2xl bg-gradient-to-br from-gray-100 to-white shadow-xl flex items-center justify-center text-5xl font-extrabold text-blue-600">
            {{ user?.name.charAt(0).toUpperCase() || 'U' }}
          </div>
          
          <div class="pt-20 flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <div class="flex items-center space-x-3 mb-1">
                <h1 class="text-3xl font-extrabold text-gray-900">{{ user?.name }}</h1>
                <span v-if="user?.role === 'admin'" class="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Educator / Admin</span>
                <span v-else class="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Pro Student</span>
              </div>
              <p class="text-gray-500 font-medium flex items-center">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                {{ user?.email }}
              </p>
            </div>
            
            <div class="mt-6 md:mt-0 flex space-x-3">
              <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-xl transition-colors">Edit Profile</button>
              <button v-if="user?.role === 'admin'" @click="$router.push('/upload')" class="bg-gray-900 hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg transition-all">Upload New Content</button>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left Sidebar: LMS Stats & Overview -->
        <div class="space-y-8">
          
          <!-- Learning Stats -->
          <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 class="text-lg font-bold text-gray-900 mb-6">Learning Analytics</h3>
            
            <div class="space-y-4">
              <!-- Stat 1 -->
              <div class="flex items-center p-4 bg-gray-50 rounded-2xl">
                <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl mr-4">📚</div>
                <div>
                  <p class="text-xs text-gray-500 font-bold uppercase tracking-wider">Courses Enrolled</p>
                  <p class="text-2xl font-black text-gray-900">3</p>
                </div>
              </div>
              <!-- Stat 2 -->
              <div class="flex items-center p-4 bg-gray-50 rounded-2xl">
                <div class="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl mr-4">⬇️</div>
                <div>
                  <p class="text-xs text-gray-500 font-bold uppercase tracking-wider">Notes Downloaded</p>
                  <p class="text-2xl font-black text-gray-900">28</p>
                </div>
              </div>
              <!-- Stat 3 -->
              <div class="flex items-center p-4 bg-gray-50 rounded-2xl">
                <div class="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl mr-4">🔥</div>
                <div>
                  <p class="text-xs text-gray-500 font-bold uppercase tracking-wider">Study Streak</p>
                  <p class="text-2xl font-black text-gray-900">5 <span class="text-sm font-medium text-gray-500">Days</span></p>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Details / Quick Links -->
          <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Account Security</h3>
            <ul class="space-y-2">
              <li><a href="#" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl text-gray-700 font-medium transition-colors">Change Password <span class="text-gray-400">&rarr;</span></a></li>
              <li><a href="#" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl text-gray-700 font-medium transition-colors">Notification Settings <span class="text-gray-400">&rarr;</span></a></li>
              <li><a href="#" class="flex items-center justify-between p-3 hover:bg-red-50 text-red-600 font-medium rounded-xl transition-colors" @click="handleLogout">Sign Out <span class="text-red-400">&rarr;</span></a></li>
            </ul>
          </div>
        </div>

        <!-- Right Content Area: Role-Based Dashboard -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- STUDENT VIEW: Recent Activity & Continue Learning -->
          <div v-if="user?.role !== 'admin'">
            <h2 class="text-2xl font-extrabold text-gray-900 mb-6">Continue Learning</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <!-- Mock Recent Course Card -->
              <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-blue-300 transition-colors cursor-pointer group">
                <span class="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-md mb-4 inline-block">BCA Sem 3</span>
                <h4 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Data Structures</h4>
                <div class="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div class="bg-blue-600 h-2 rounded-full" style="width: 45%"></div>
                </div>
                <p class="text-xs text-gray-500">45% Completed • Last viewed today</p>
              </div>

              <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-indigo-300 transition-colors cursor-pointer group">
                <span class="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-md mb-4 inline-block">Career Prep</span>
                <h4 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">React Frontend Dev</h4>
                <div class="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div class="bg-indigo-500 h-2 rounded-full" style="width: 15%"></div>
                </div>
                <p class="text-xs text-gray-500">15% Completed • Started yesterday</p>
              </div>
            </div>

            <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div class="px-6 py-5 border-b border-gray-100">
                <h3 class="font-bold text-gray-900">Recent Activity Timeline</h3>
              </div>
              <div class="p-6">
                <div class="border-l-2 border-gray-100 ml-3 space-y-6">
                  <div class="relative pl-6">
                    <div class="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                    <p class="font-bold text-gray-900">Downloaded Computer Networks PDF</p>
                    <p class="text-sm text-gray-500">2 hours ago</p>
                  </div>
                  <div class="relative pl-6">
                    <div class="absolute w-3 h-3 bg-gray-300 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                    <p class="font-bold text-gray-900">Joined NovaLearn Platform</p>
                    <p class="text-sm text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ADMIN VIEW: Content Management Dashboard -->
          <div v-if="user?.role === 'admin'">
            <div class="flex justify-between items-end mb-6">
              <h2 class="text-2xl font-extrabold text-gray-900">Educator Dashboard</h2>
              <span class="text-sm font-bold text-gray-500">{{ userNotes.length }} Materials Managed</span>
            </div>

            <div v-if="loading" class="text-center py-12 bg-white rounded-3xl border border-gray-100">
              <div class="w-10 h-10 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p class="text-gray-500 font-medium">Loading your content vault...</p>
            </div>
            
            <div v-else-if="userNotes.length === 0" class="text-center p-12 bg-white rounded-3xl border border-gray-100 border-dashed">
              <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">📂</div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Your vault is empty</h3>
              <p class="text-gray-500 mb-6">You haven't uploaded any study materials yet.</p>
              <button @click="$router.push('/upload')" class="bg-gray-900 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-colors">
                Start Uploading
              </button>
            </div>

            <div v-else class="space-y-4">
              <div v-for="note in userNotes" :key="note.id" class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow group">
                
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                    📄
                  </div>
                  <div>
                    <h4 class="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">{{ note.subject_name }}</h4>
                    <p class="text-sm text-gray-500 font-medium">
                      {{ note.short_name }} • Sem {{ note.semester }} • {{ new Date(note.created_at).toLocaleDateString() }}
                    </p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-2">
                  <a :href="note.file_url" target="_blank" class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Document">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  </a>
                  <button @click="handleDelete(note.id)" class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Material">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const user = ref(null);
const userNotes = ref([]);
const loading = ref(true);

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};

const handleDelete = async (noteId) => {
  if (!confirm("Are you sure you want to delete this file? This cannot be undone.")) return;
  
  try {
    await api.deleteNote(noteId);
    userNotes.value = userNotes.value.filter(n => n.id !== noteId);
  } catch (err) {
    console.error("Error deleting note:", err);
    alert("Failed to delete note.");
  }
};

onMounted(async () => {
  // 1. Get user details from localStorage
  const savedUser = localStorage.getItem('user');
  if (!savedUser) {
    router.push('/login');
    return;
  }
  user.value = JSON.parse(savedUser);

  // 2. Fetch data based on role
  if (user.value.role === 'admin') {
    try {
      const response = await api.getUserNotes();
      userNotes.value = response.data.data;
    } catch (err) {
      console.error("Error fetching admin vault", err);
    } finally {
      loading.value = false;
    }
  } else {
    // If student, we don't fetch notes since they can't upload.
    // The UI handles showing LMS mocked content instead.
    loading.value = false;
  }
});
</script>