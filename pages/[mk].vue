<template>
  <div class="min-h-screen p-4 pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-colors duration-500">
    <!-- Back Button -->
    <NuxtLink 
      to="/" 
      class="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 mb-4 transition-colors"
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Kembali
    </NuxtLink>

    <!-- Header -->
    <div class="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-700/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 dark:border-gray-600/30 p-6 mb-6">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
        {{ mkTitle }}
      </h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">Data Nilai dan Absensi</p>
    </div>

    <!-- Password Form (jika belum authenticated) -->
    <div v-if="!isAuthenticated" class="max-w-md mx-auto">
      <div class="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-700/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 dark:border-gray-600/30 p-6">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          🔒 Masukkan Password
        </h2>
        
        <form @submit.prevent="handleLogin">
          <input 
            v-model="passwordInput"
            type="password" 
            placeholder="Password MK"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            :class="{ 'border-red-500': errorMessage }"
          />
          
          <p v-if="errorMessage" class="text-red-500 dark:text-red-400 text-sm mb-4">
            {{ errorMessage }}
          </p>

          <button 
            type="submit"
            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 active:from-blue-800 active:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Akses Data
          </button>
        </form>
      </div>
    </div>

    <!-- Data Display (jika sudah authenticated) -->
    <div v-else>

   <!-- Academic Blue Loading -->
<div v-if="loading" class="text-center py-12">
  <!-- Academic Book Animation -->
  <div class="mx-auto w-24 h-24 mb-8 relative">
    <!-- Main Book -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg shadow-xl animate-book-float">
      <!-- Book Spine -->
      <div class="absolute left-0 top-2 bottom-2 w-2 bg-blue-800 rounded-l-lg"></div>
      
      <!-- Book Pages -->
      <div class="absolute top-3 left-3 right-3 bottom-3 bg-white rounded shadow-inner">
        <!-- Page Lines -->
        <div class="absolute top-2 left-2 right-2">
          <div class="h-px bg-gray-300 mb-1 animate-writing-1"></div>
          <div class="h-px bg-gray-300 mb-1 animate-writing-2"></div>
          <div class="h-px bg-gray-300 mb-1 animate-writing-3"></div>
        </div>
      </div>
    </div>
    
    <!-- Floating Academic Elements -->
    <div class="absolute -top-3 -right-3 text-2xl animate-float-1">🎓</div>
    <div class="absolute -bottom-3 -left-3 text-xl animate-float-2">📊</div>
    <div class="absolute top-0 -left-4 text-lg animate-float-3">✏️</div>
    <div class="absolute -top-2 left-0 text-base animate-float-4">📝</div>
  </div>

  <!-- Friendly Loading Text -->
  <div class="space-y-3">
    <p class="text-gray-700 dark:text-gray-300 font-semibold text-lg animate-text-glow">
      📖 Tunggu sebentar ya, lagi ambil nilai kamu...
    </p>
    <p class="text-gray-500 dark:text-gray-400 text-sm animate-slide-up">
      Sistemnya lagi kerja keras nih, sabar ya! 😊📈
    </p>
  </div>

  <!-- Clean Blue Progress Dots -->
  <div class="flex justify-center space-x-3 mt-6">
    <div class="w-3 h-3 bg-blue-400 rounded-full animate-dot-1 shadow-sm"></div>
    <div class="w-3 h-3 bg-indigo-400 rounded-full animate-dot-2 shadow-sm"></div>
    <div class="w-3 h-3 bg-blue-500 rounded-full animate-dot-3 shadow-sm"></div>
    <div class="w-3 h-3 bg-slate-400 rounded-full animate-dot-4 shadow-sm"></div>
    <div class="w-3 h-3 bg-gray-500 rounded-full animate-dot-5 shadow-sm"></div>
  </div>

  <!-- Status Messages -->
  <div class="mt-6 space-y-2">
    <p class="text-xs text-gray-400 dark:text-gray-500 animate-fade-in-1">
      🧮 Menghitung komponen nilai...
    </p>
    <p class="text-xs text-gray-400 dark:text-gray-500 animate-fade-in-2">
      📋 Memproses data akademik...
    </p>
  </div>
</div>



      <!-- Error State -->
      <div v-else-if="errorMessage" class="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center shadow-lg">
        <p class="text-red-600 dark:text-red-400 mb-2">{{ errorMessage }}</p>
        <button 
          @click="fetchData"
          class="mt-4 px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 shadow-lg transition-all"
        >
          Coba Lagi
        </button>
      </div>

      <!-- Data Cards -->
      <div v-else-if="students.length > 0" class="space-y-4">
        <!-- Search Bar -->
        <div class="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-700/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 dark:border-gray-600/30 p-4">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="🔍 Cari NIM atau Nama..."
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <!-- Student Cards -->
        <div 
          v-for="student in filteredStudents" 
          :key="student.nim"
          class="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-700/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-gray-600/30 overflow-hidden hover:shadow-3xl hover:scale-[1.02] transition-all duration-300"
        >
          <!-- Header Card dengan Gradient Enhanced -->
          <div class="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white p-5 relative overflow-hidden">
            <!-- Decorative overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            
            <!-- Content -->
            <div class="relative z-10">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-xs opacity-90 mb-1">NIM</p>
                  <p class="text-lg font-bold">{{ student.nim }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xs opacity-90 mb-1">Nama</p>
                  <p class="text-lg font-bold">{{ student.nama }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Data Content -->
          <div class="p-4">
            <!-- NILAI AKHIR - HIGHLIGHT CARD -->
            <div class="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 rounded-2xl p-6 text-white mb-6 shadow-2xl overflow-hidden group hover:shadow-purple-500/50 transition-all duration-300">
              <!-- Animated gradient overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <!-- Decorative circles -->
              <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl"></div>
              
              <!-- Content -->
              <div class="relative z-10">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-lg font-bold flex items-center">
                    <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    NILAI AKHIR
                  </h3>
                  <span class="text-sm opacity-90">Total 100%</span>
                </div>
                
                <div class="flex items-end justify-between">
                  <div>
                    <p class="text-sm opacity-90 mb-1">Nilai Hasil</p>
                    <p class="text-5xl font-bold">{{ student.nilaiHasil }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm opacity-90 mb-1">Grade</p>
                    <p class="text-6xl font-bold">{{ student.nilaiHuruf }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Breakdown Nilai Komponen -->
            <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">📋 Breakdown Nilai Komponen</h4>

            <!-- DMJK: 2x2 grid tanpa Peer Review -->
            <div v-if="mkCode === 'dmjk'" class="grid grid-cols-2 gap-3 mb-4">
              <div class="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/30 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 dark:border-blue-600/30 hover:shadow-lg hover:scale-105 transition-all duration-200">
                <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">Tugas (15%)</p>
                <p class="text-2xl font-bold text-blue-600 dark:text-blue-300">{{ student.tugas }}</p>
              </div>
              <div class="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/30 dark:to-green-800/30 backdrop-blur-sm rounded-xl p-4 border border-green-200/50 dark:border-green-600/30 hover:shadow-lg hover:scale-105 transition-all duration-200">
                <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">Kehadiran (20%)</p>
                <p class="text-2xl font-bold text-green-600 dark:text-green-300">{{ student.kehadiran }}</p>
              </div>
              <div class="bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-900/30 dark:to-yellow-800/30 backdrop-blur-sm rounded-xl p-4 border border-yellow-200/50 dark:border-yellow-600/30 hover:shadow-lg hover:scale-105 transition-all duration-200">
                <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">UTS (25%)</p>
                <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-300">{{ student.uts }}</p>
              </div>
              <div class="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/30 dark:to-purple-800/30 backdrop-blur-sm rounded-xl p-4 border border-purple-200/50 dark:border-purple-600/30 hover:shadow-lg hover:scale-105 transition-all duration-200">
                <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">UAS (40%)</p>
                <p class="text-2xl font-bold text-purple-600 dark:text-purple-300">{{ student.uas }}</p>
              </div>
            </div>

            <!-- PM, KKA, KKB: 2x2 + 1 full width (dengan Peer Review) -->
            <div v-else>
              <div class="grid grid-cols-2 gap-3 mb-4">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/30 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 dark:border-blue-600/30 hover:shadow-lg hover:scale-105 transition-all duration-200">
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">Tugas (15%)</p>
                  <p class="text-2xl font-bold text-blue-600 dark:text-blue-300">{{ student.tugas }}</p>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/30 dark:to-green-800/30 backdrop-blur-sm rounded-xl p-4 border border-green-200/50 dark:border-green-600/30 hover:shadow-lg hover:scale-105 transition-all duration-200">
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">Kehadiran (10%)</p>
                  <p class="text-2xl font-bold text-green-600 dark:text-green-300">{{ student.kehadiran }}</p>
                </div>
                <div class="bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-900/30 dark:to-yellow-800/30 backdrop-blur-sm rounded-xl p-4 border border-yellow-200/50 dark:border-yellow-600/30 hover:shadow-lg hover:scale-105 transition-all duration-200">
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">UTS (10%)</p>
                  <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-300">{{ student.uts }}</p>
                </div>
                <div class="bg-gradient-to-br from-pink-50 to-pink-100/50 dark:from-pink-900/30 dark:to-pink-800/30 backdrop-blur-sm rounded-xl p-4 border border-pink-200/50 dark:border-pink-600/30 hover:shadow-lg hover:scale-105 transition-all duration-200">
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">Peer Review (5%)</p>
                  <p class="text-2xl font-bold text-pink-600 dark:text-pink-300">{{ student.peerReview }}</p>
                </div>
              </div>

              <!-- UAS - Full Width, Centered -->
              <div class="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/30 dark:to-purple-800/30 backdrop-blur-sm rounded-xl p-4 mb-4 text-center border border-purple-200/50 dark:border-purple-600/30 hover:shadow-lg transition-all duration-200">
                <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">UAS (60%)</p>
                <p class="text-3xl font-bold text-purple-600 dark:text-purple-300">{{ student.uas }}</p>
              </div>
            </div>

            <!-- Detail Button -->
            <button 
              @click="toggleDetail(student.nim)"
              class="w-full mt-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-600 dark:hover:to-gray-500 rounded-xl font-semibold text-gray-700 dark:text-gray-200 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg group"
            >
              <span>{{ expandedCards.has(student.nim) ? 'Sembunyikan' : 'Lihat' }} Detail Mingguan</span>
              <svg 
                class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" 
                :class="{ 'rotate-180': expandedCards.has(student.nim) }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Detail Mingguan (Collapsible) -->
            <div 
              v-if="expandedCards.has(student.nim)"
              class="mt-4 overflow-x-auto bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-600/50"
            >
              <table class="min-w-full text-sm">
                <thead>
                  <tr class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
                    <th class="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Minggu</th>
                    <th class="px-3 py-2 text-center font-semibold text-gray-700 dark:text-gray-200">Pekan</th>
                    <th class="px-3 py-2 text-center font-semibold text-gray-700 dark:text-gray-200">Tugas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="week in student.weekly" :key="week.week" class="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                    <td class="px-3 py-2 font-medium text-gray-700 dark:text-gray-200">{{ week.week }}</td>
                    <td class="px-3 py-2 text-center">
                      <span class="inline-block px-2 py-1 rounded-lg bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 text-blue-700 dark:text-blue-200 font-medium">
                        {{ week.pekan }}
                      </span>
                    </td>
                    <td class="px-3 py-2 text-center">
                      <span 
                        v-if="week.tugas" 
                        class="inline-block px-2 py-1 rounded-lg bg-gradient-to-r from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 text-green-700 dark:text-green-200 font-medium"
                      >
                        {{ week.tugas }}
                      </span>
                      <span v-else class="text-gray-400 dark:text-gray-500">-</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Button Detail UAS -->
            <button 
              @click="toggleUasDetail(student.nim)"
              class="w-full mt-3 py-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800/60 dark:hover:to-purple-700/60 rounded-xl font-semibold text-purple-700 dark:text-purple-300 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg group"
            >
              <span>{{ expandedUasCards.has(student.nim) ? 'Sembunyikan' : 'Lihat' }} Detail UAS</span>
              <svg 
                class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" 
                :class="{ 'rotate-180': expandedUasCards.has(student.nim) }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Tabel Detail UAS -->
            <div 
              v-if="expandedUasCards.has(student.nim)"
              class="mt-4 p-4 bg-gradient-to-br from-purple-50/80 to-purple-100/50 dark:from-purple-900/30 dark:to-purple-800/30 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-600/30"
            >
              <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                📊 Breakdown Nilai UAS
              </h4>

              <!-- DMJK: 4 Soal (40% total) -->
              <div v-if="mkCode === 'dmjk'">
                <p class="text-xs text-gray-600 dark:text-gray-400 mb-4">
                  Nilai UAS (40%) dihitung dari: <strong>Soal 1 (5%)</strong> + <strong>Soal 2 (5%)</strong> + <strong>Soal 3 (5%)</strong> + <strong>Soal Final (25%)</strong>
                </p>
                
                <div class="grid grid-cols-1 gap-3">
                  <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 border border-purple-200 dark:border-purple-600/50 hover:shadow-md transition-all">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-700 dark:text-gray-300">Soal 1 - Minggu 11</span>
                      <span class="text-xs text-gray-500 dark:text-gray-400">(5%)</span>
                    </div>
                    <p class="text-2xl font-bold text-purple-600 dark:text-purple-300 mt-1">
                      {{ student.uasDetail.soal1 }}
                    </p>
                  </div>
                  
                  <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 border border-purple-200 dark:border-purple-600/50 hover:shadow-md transition-all">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-700 dark:text-gray-300">Soal 2 - Minggu 12</span>
                      <span class="text-xs text-gray-500 dark:text-gray-400">(5%)</span>
                    </div>
                    <p class="text-2xl font-bold text-purple-600 dark:text-purple-300 mt-1">
                      {{ student.uasDetail.soal2 }}
                    </p>
                  </div>
                  
                  <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 border border-purple-200 dark:border-purple-600/50 hover:shadow-md transition-all">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-700 dark:text-gray-300">Soal 3 - Minggu 13</span>
                      <span class="text-xs text-gray-500 dark:text-gray-400">(5%)</span>
                    </div>
                    <p class="text-2xl font-bold text-purple-600 dark:text-purple-300 mt-1">
                      {{ student.uasDetail.soal3 }}
                    </p>
                  </div>

                  <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 border border-purple-200 dark:border-purple-600/50 hover:shadow-md transition-all">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-700 dark:text-gray-300">Soal Final - Minggu 16</span>
                      <span class="text-xs text-gray-500 dark:text-gray-400">(25%)</span>
                    </div>
                    <p class="text-2xl font-bold text-purple-600 dark:text-purple-300 mt-1">
                      {{ student.uasDetail.soalFinal }}
                    </p>
                  </div>

                  <div class="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-3 text-white mt-2 shadow-lg">
                    <div class="flex justify-between items-center">
                      <span class="text-sm font-semibold">Total Nilai UAS</span>
                      <span class="text-xs opacity-90">(40%)</span>
                    </div>
                    <p class="text-3xl font-bold mt-1">
                      {{ student.uas }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- PM, KKA, KKB: 3 Monitoring (60% total) -->
              <div v-else>
                <p class="text-xs text-gray-600 dark:text-gray-400 mb-4">
                  Nilai UAS (60%) dihitung dari: <strong>Monitoring 1 (15%)</strong> + <strong>Monitoring 2 (15%)</strong> + <strong>Presentasi Final (30%)</strong>
                </p>
                
                <div class="grid grid-cols-1 gap-3">
                  <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 border border-purple-200 dark:border-purple-600/50 hover:shadow-md transition-all">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-700 dark:text-gray-300">Monitoring 1 - Minggu 12</span>
                      <span class="text-xs text-gray-500 dark:text-gray-400">(15%)</span>
                    </div>
                    <p class="text-2xl font-bold text-purple-600 dark:text-purple-300 mt-1">
                      {{ student.uasDetail.monitoring1 }}
                    </p>
                  </div>
                  
                  <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 border border-purple-200 dark:border-purple-600/50 hover:shadow-md transition-all">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-700 dark:text-gray-300">Monitoring 2 - Minggu 14</span>
                      <span class="text-xs text-gray-500 dark:text-gray-400">(15%)</span>
                    </div>
                    <p class="text-2xl font-bold text-purple-600 dark:text-purple-300 mt-1">
                      {{ student.uasDetail.monitoring2 }}
                    </p>
                  </div>
                  
                  <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 border border-purple-200 dark:border-purple-600/50 hover:shadow-md transition-all">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-700 dark:text-gray-300">Presentasi Final - Minggu 16</span>
                      <span class="text-xs text-gray-500 dark:text-gray-400">(30%)</span>
                    </div>
                    <p class="text-2xl font-bold text-purple-600 dark:text-purple-300 mt-1">
                      {{ student.uasDetail.presentasiFinal }}
                    </p>
                  </div>

                  <div class="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-3 text-white mt-2 shadow-lg">
                    <div class="flex justify-between items-center">
                      <span class="text-sm font-semibold">Total Nilai UAS</span>
                      <span class="text-xs opacity-90">(60%)</span>
                    </div>
                    <p class="text-3xl font-bold mt-1">
                      {{ student.uas }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-if="filteredStudents.length === 0" class="bg-yellow-50/80 dark:bg-yellow-900/20 backdrop-blur-sm border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6 text-center shadow-lg">
          <p class="text-yellow-700 dark:text-yellow-300">Tidak ada data yang cocok dengan pencarian "{{ searchQuery }}"</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-2xl p-6 text-center shadow-lg">
        <p class="text-gray-600 dark:text-gray-300">Belum ada koneksi ke Google Sheets</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Setup Google Apps Script terlebih dahulu</p>
      </div>

      <!-- Logout Button -->
      <div class="mt-6 text-center">
        <button 
          @click="handleLogout"
          class="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800 transition-all shadow-lg hover:shadow-xl"
        >
          Keluar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// MK Code dari URL
const mkCode = computed(() => route.params.mk)

// MK Titles
const mkTitles = {
  pm: 'Pemrograman Mobile',
  kka: 'Komputasi Awan A',
  kkb: 'Komputasi Awan B',
  dmjk: 'Desain & Manajemen Jaringan Komputer B'
}

const mkTitle = computed(() => mkTitles[mkCode.value] || 'Mata Kuliah')

// State
const passwordInput = ref('')
const isAuthenticated = ref(false)
const errorMessage = ref('')
const loading = ref(false)
const students = ref([])
const searchQuery = ref('')
const expandedCards = ref(new Set())
const expandedUasCards = ref(new Set())
const spreadsheetId = ref('')

const filteredStudents = computed(() => {
  if (!searchQuery.value) return students.value
  
  const query = searchQuery.value.toLowerCase()
  return students.value.filter(student => {
    // Convert ke string dulu, karena NIM bisa berupa number
    const nim = String(student.nim || '')
    const nama = String(student.nama || '')
    
    return nim.toLowerCase().includes(query) || 
           nama.toLowerCase().includes(query)
  })
})

// Toggle Detail
const toggleDetail = (nim) => {
  if (expandedCards.value.has(nim)) {
    expandedCards.value.delete(nim)
  } else {
    expandedCards.value.add(nim)
  }
}

// Toggle Detail UAS
const toggleUasDetail = (nim) => {
  if (expandedUasCards.value.has(nim)) {
    expandedUasCards.value.delete(nim)
  } else {
    expandedUasCards.value.add(nim)
  }
}

// Handle Login - panggil API untuk validasi password
const handleLogin = async () => {
  errorMessage.value = ''
  
  try {
    const response = await fetch('/api/validate-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mkCode: mkCode.value,
        password: passwordInput.value
      })
    })
    
    const data = await response.json()
    
    if (data.success) {
      isAuthenticated.value = true
      spreadsheetId.value = data.spreadsheetId
      errorMessage.value = ''
      
      if (process.client) {
        sessionStorage.setItem(`auth_${mkCode.value}`, 'true')
        sessionStorage.setItem(`sheet_${mkCode.value}`, data.spreadsheetId)
      }
      
      fetchData()
    } else {
      errorMessage.value = data.message || 'Password salah!'
    }
  } catch (error) {
    errorMessage.value = 'Gagal validasi password'
    console.error('Login error:', error)
  }
}

// Handle Logout
const handleLogout = () => {
  isAuthenticated.value = false
  students.value = []
  passwordInput.value = ''
  spreadsheetId.value = ''
  if (process.client) {
    sessionStorage.removeItem(`auth_${mkCode.value}`)
    sessionStorage.removeItem(`sheet_${mkCode.value}`)
  }
}

// Fetch Data from GAS via API Route
const fetchData = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    const sheetId = spreadsheetId.value
    
    if (!sheetId) {
      students.value = []
      errorMessage.value = 'Spreadsheet ID tidak ditemukan'
      return
    }

    const response = await fetch('/api/sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        spreadsheetId: sheetId,
        sheetName: 'Nilai'
      })
    })

    if (!response.ok) {
      throw new Error('Gagal mengambil data dari server')
    }

    const data = await response.json()
    
    if (data.success) {
      students.value = parseStudentData(data.data)
    } else {
      throw new Error(data.message || 'Gagal mengambil data')
    }
  } catch (error) {
    errorMessage.value = error.message || 'Terjadi kesalahan'
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

// Helper function untuk format angka (max 2 desimal)
const formatNumber = (value) => {
  if (value === null || value === undefined || value === '') return '-'
  
  const num = typeof value === 'number' ? value : parseFloat(value)
  
  if (isNaN(num)) return value
  
  return Number(num.toFixed(0)).toString()
}

// Parse Student Data dari GAS
const parseStudentData = (rawData) => {
  const rows = rawData.slice(1) // Skip header
  
  return rows.map(row => {
    // Conditional: DMJK struktur kolom berbeda
    if (mkCode.value === 'dmjk') {
      return {
        nim: row[0] || '',
        nama: row[1] || '',
        weekly: [
          { week: 'Minggu 1', pekan: row[2] || '-', tugas: row[3] || '-' },
          { week: 'Minggu 2', pekan: row[4] || '-', tugas: row[5] || '-' },
          { week: 'Minggu 3', pekan: row[6] || '-', tugas: row[7] || '-' },
          { week: 'Minggu 4', pekan: row[8] || '-', tugas: row[9] || '-' },
          { week: 'Minggu 5', pekan: row[10] || '-', tugas: row[11] || '-' },
          { week: 'Minggu 6', pekan: row[12] || '-', tugas: row[13] || '-' },
          { week: 'Minggu 7', pekan: row[14] || '-', tugas: row[15] || '-' },
          { week: 'Minggu UTS', pekan: row[16] || '-', tugas: '' }, // Pekan 8 - TANPA TUGAS
          { week: 'Minggu 9', pekan: row[17] || '-', tugas: row[18] || '-' },
          { week: 'Minggu 10', pekan: row[19] || '-', tugas: row[20] || '-' }
        ],
        tugas: formatNumber(row[21]),        // Kolom V (index 21)
        kehadiran: formatNumber(row[22]),    // Kolom W (index 22)
        uts: formatNumber(row[23]),          // Kolom X (index 23)
        uas: formatNumber(row[24]),          // Kolom Y (index 24)
        nilaiHasil: formatNumber(row[25]),   // Kolom Z (index 25)
        nilaiHuruf: row[26] || '-',          // Kolom AA (index 26)
        peerReview: null,                    // DMJK tidak punya Peer Review
        uasDetail: {
          soal1: formatNumber(row[27]),      // Kolom AB (index 27)
          soal2: formatNumber(row[28]),      // Kolom AC (index 28)
          soal3: formatNumber(row[29]),      // Kolom AD (index 29)
          soalFinal: formatNumber(row[30])   // Kolom AE (index 30)
        }
      }
    } else {
      // Default untuk PM, KKA, KKB
      return {
        nim: row[0] || '',
        nama: row[1] || '',
        weekly: [
          { week: 'Minggu 1', pekan: row[2] || '-', tugas: row[3] || '-' },
          { week: 'Minggu 2', pekan: row[4] || '-', tugas: row[5] || '-' },
          { week: 'Minggu 3', pekan: row[6] || '-', tugas: row[7] || '-' },
          { week: 'Minggu 4', pekan: row[8] || '-', tugas: row[9] || '-' },
          { week: 'Minggu 5', pekan: row[10] || '-', tugas: row[11] || '-' },
          { week: 'Minggu 6', pekan: row[12] || '-', tugas: row[13] || '-' },
          { week: 'Minggu 7', pekan: row[14] || '-', tugas: row[15] || '-' },
          { week: 'Minggu UTS', pekan: row[16] || '-', tugas: '' }
        ],
        tugas: formatNumber(row[17]),
        kehadiran: formatNumber(row[18]),
        uts: formatNumber(row[19]),
        uas: formatNumber(row[20]),
        peerReview: formatNumber(row[21]),
        nilaiHasil: formatNumber(row[22]),
        nilaiHuruf: row[23] || '-',
        uasDetail: {
          monitoring1: formatNumber(row[24]),      // Kolom Y
          monitoring2: formatNumber(row[25]),      // Kolom Z
          presentasiFinal: formatNumber(row[26])   // Kolom AA
        }
      }
    }
  })
}

// Check auth on mount
onMounted(() => {
  if (process.client) {
    const savedAuth = sessionStorage.getItem(`auth_${mkCode.value}`)
    const savedSheet = sessionStorage.getItem(`sheet_${mkCode.value}`)
    
    if (savedAuth === 'true' && savedSheet) {
      isAuthenticated.value = true
      spreadsheetId.value = savedSheet
      fetchData()
    }
  }
})
</script>

<style scoped>
/* Book Float Animation */
@keyframes book-float {
  0%, 100% { transform: translateY(0) rotateY(0deg); }
  50% { transform: translateY(-8px) rotateY(3deg); }
}

/* Writing Lines Animation */
@keyframes writing-1 {
  0% { width: 0; }
  100% { width: 100%; }
}

@keyframes writing-2 {
  0% { width: 0; }
  100% { width: 80%; }
}

@keyframes writing-3 {
  0% { width: 0; }
  100% { width: 90%; }
}

/* Floating Academic Elements */
@keyframes float-1 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

@keyframes float-2 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(-3deg); }
}

@keyframes float-3 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-6px) scale(1.1); }
}

@keyframes float-4 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(8deg); }
}

/* Text Animations */
@keyframes text-glow {
  0%, 100% { color: #374151; }
  50% { color: #3b82f6; }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Blue Progress Dots */
@keyframes dot-1 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-12px) scale(1.2); }
}

@keyframes dot-2 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-12px) scale(1.2); }
}

@keyframes dot-3 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-12px) scale(1.2); }
}

@keyframes dot-4 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-12px) scale(1.2); }
}

@keyframes dot-5 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-12px) scale(1.2); }
}

/* Fade In Messages */
@keyframes fade-in-1 {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-2 {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Apply Animations */
.animate-book-float {
  animation: book-float 2.5s ease-in-out infinite;
}

.animate-writing-1 {
  animation: writing-1 2s ease-out infinite;
}

.animate-writing-2 {
  animation: writing-2 2s ease-out infinite 0.3s;
}

.animate-writing-3 {
  animation: writing-3 2s ease-out infinite 0.6s;
}

.animate-float-1 {
  animation: float-1 2s ease-in-out infinite;
}

.animate-float-2 {
  animation: float-2 2.2s ease-in-out infinite 0.2s;
}

.animate-float-3 {
  animation: float-3 1.8s ease-in-out infinite 0.4s;
}

.animate-float-4 {
  animation: float-4 2.3s ease-in-out infinite 0.6s;
}

.animate-text-glow {
  animation: text-glow 3s ease-in-out infinite;
}

.animate-slide-up {
  animation: slide-up 1s ease-out;
}

.animate-dot-1 {
  animation: dot-1 1.5s ease-in-out infinite;
}

.animate-dot-2 {
  animation: dot-2 1.5s ease-in-out infinite 0.2s;
}

.animate-dot-3 {
  animation: dot-3 1.5s ease-in-out infinite 0.4s;
}

.animate-dot-4 {
  animation: dot-4 1.5s ease-in-out infinite 0.6s;
}

.animate-dot-5 {
  animation: dot-5 1.5s ease-in-out infinite 0.8s;
}

.animate-fade-in-1 {
  animation: fade-in-1 2s ease-out infinite;
}

.animate-fade-in-2 {
  animation: fade-in-2 2s ease-out infinite 2s;
}

/* Dark Mode Support */
.dark .animate-text-glow {
  animation: text-glow-dark 3s ease-in-out infinite;
}

@keyframes text-glow-dark {
  0%, 100% { color: #d1d5db; }
  50% { color: #60a5fa; }
}

/* Existing Styles */
.hover\:shadow-3xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.hover\:shadow-purple-500\/50:hover {
  box-shadow: 0 20px 40px -10px rgba(168, 85, 247, 0.5);
}

.dark .hover\:shadow-3xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
}
</style>
