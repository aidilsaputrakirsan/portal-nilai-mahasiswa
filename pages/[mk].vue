<template>
  <div class="min-h-screen p-4 pb-20">
    <!-- Back Button -->
    <NuxtLink 
      to="/" 
      class="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4"
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Kembali
    </NuxtLink>

    <!-- Header -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-1">
        {{ mkTitle }}
      </h1>
      <p class="text-sm text-gray-500">Data Nilai dan Absensi</p>
    </div>

    <!-- Password Form (jika belum authenticated) -->
    <div v-if="!isAuthenticated" class="max-w-md mx-auto">
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">
          🔒 Masukkan Password
        </h2>
        
        <form @submit.prevent="handleLogin">
          <input 
            v-model="passwordInput"
            type="password" 
            placeholder="Password MK"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            :class="{ 'border-red-500': errorMessage }"
          />
          
          <p v-if="errorMessage" class="text-red-500 text-sm mb-4">
            {{ errorMessage }}
          </p>

          <button 
            type="submit"
            class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            Akses Data
          </button>
        </form>
      </div>
    </div>

    <!-- Data Display (jika sudah authenticated) -->
    <div v-else>
     <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="relative">
          <!-- Animated Book Icon -->
          <div class="text-8xl animate-bounce">
            📚
          </div>
          <div class="text-4xl animate-spin absolute top-0 left-1/2 transform -translate-x-1/2 opacity-30">
            
          </div>
        </div>
        <p class="text-gray-700 font-semibold mt-6">Bentar ya, lagi ambil nilai kamu...</p>
        <p class="text-gray-500 text-sm mt-2">Gak lama kok! 😊</p>
        
        <!-- Progress Bar Animation -->
        <div class="max-w-xs mx-auto mt-4">
          <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-progress"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="errorMessage" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p class="text-red-600 mb-2">{{ errorMessage }}</p>
        <button 
          @click="fetchData"
          class="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Coba Lagi
        </button>
      </div>

      <!-- Data Cards -->
      <div v-else-if="students.length > 0" class="space-y-4">
        <!-- Search Bar -->
        <div class="bg-white rounded-xl shadow-md p-4">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="🔍 Cari NIM atau Nama..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Student Cards -->
        <div 
          v-for="student in filteredStudents" 
          :key="student.nim"
          class="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <!-- Header Card -->
          <div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
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

          <!-- Data Content -->
          <div class="p-4">
            <!-- NILAI AKHIR - HIGHLIGHT CARD -->
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6 shadow-lg">
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

            <!-- Breakdown Nilai Komponen -->
            <h4 class="text-sm font-semibold text-gray-700 mb-3">📋 Breakdown Nilai Komponen</h4>
              <div class="grid grid-cols-2 gap-3 mb-4">
                <div class="bg-blue-50 rounded-lg p-3">
                  <p class="text-xs text-gray-600 mb-1">Tugas (15%)</p>
                  <p class="text-lg font-bold text-blue-600">{{ student.tugas }}</p>
                </div>
                <div class="bg-green-50 rounded-lg p-3">
                  <p class="text-xs text-gray-600 mb-1">Kehadiran (10%)</p>
                  <p class="text-lg font-bold text-green-600">{{ student.kehadiran }}</p>
                </div>
                <div class="bg-yellow-50 rounded-lg p-3">
                  <p class="text-xs text-gray-600 mb-1">UTS (10%)</p>
                  <p class="text-lg font-bold text-yellow-600">{{ student.uts }}</p>
                </div>
                <div class="bg-purple-50 rounded-lg p-3">
                  <p class="text-xs text-gray-600 mb-1">Peer Review (5%)</p>
                  <p class="text-2xl font-bold text-pink-600">{{ student.peerReview }}</p>
                </div>
              </div>

              <!-- Peer Review - Full Width, Centered -->
              <div class="bg-pink-50 rounded-lg p-4 mb-4 text-center">
                <p class="text-xs text-gray-600 mb-1">UAS (60%)</p>
                <p class="text-lg font-bold text-purple-600">{{ student.uas }}</p>
              </div>

            <!-- Detail Button -->
            <button 
              @click="toggleDetail(student.nim)"
              class="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-colors flex items-center justify-center"
            >
              <span>{{ expandedCards.has(student.nim) ? 'Sembunyikan' : 'Lihat' }} Detail Mingguan</span>
              <svg 
                class="w-5 h-5 ml-2 transition-transform" 
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
              class="mt-4 overflow-x-auto"
            >
              <table class="min-w-full text-sm">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="px-3 py-2 text-left font-semibold text-gray-700">Minggu</th>
                    <th class="px-3 py-2 text-center font-semibold text-gray-700">Pekan</th>
                    <th class="px-3 py-2 text-center font-semibold text-gray-700">Tugas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="week in student.weekly" :key="week.week" class="border-b">
                    <td class="px-3 py-2 font-medium text-gray-700">{{ week.week }}</td>
                    <td class="px-3 py-2 text-center">
                      <span class="inline-block px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">
                        {{ week.pekan }}
                      </span>
                    </td>
                    <td class="px-3 py-2 text-center">
                      <span 
                        v-if="week.tugas" 
                        class="inline-block px-2 py-1 rounded bg-green-100 text-green-700 font-medium"
                      >
                        {{ week.tugas }}
                      </span>
                      <span v-else class="text-gray-400">-</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- TAMBAH INI - Button Detail UAS -->
            <button 
              @click="toggleUasDetail(student.nim)"
              class="w-full mt-3 py-2 bg-purple-50 hover:bg-purple-100 rounded-lg font-medium text-purple-700 transition-colors flex items-center justify-center"
            >
              <span>{{ expandedUasCards.has(student.nim) ? 'Sembunyikan' : 'Lihat' }} Detail UAS</span>
              <svg 
                class="w-5 h-5 ml-2 transition-transform" 
                :class="{ 'rotate-180': expandedUasCards.has(student.nim) }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- TAMBAH INI - Tabel Detail UAS -->
            <div 
              v-if="expandedUasCards.has(student.nim)"
              class="mt-4 p-4 bg-purple-50 rounded-lg"
            >
              <h4 class="text-sm font-semibold text-gray-700 mb-3">
                📊 Breakdown Nilai UAS (60%)
              </h4>
              <p class="text-xs text-gray-600 mb-4">
                Nilai UAS dihitung dari: <strong>Monitoring 1 (30%)</strong> + <strong>Monitoring 2 (30%)</strong> + <strong>Presentasi Final (40%)</strong>
              </p>
              
              <div class="grid grid-cols-1 gap-3">
                <div class="bg-white rounded-lg p-3 border border-purple-200">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700">Monitoring 1 - Minggu 12</span>
                    <span class="text-xs text-gray-500">(30%)</span>
                  </div>
                  <p class="text-2xl font-bold text-purple-600 mt-1">
                    {{ student.uasDetail.monitoring1 }}
                  </p>
                </div>
                
                <div class="bg-white rounded-lg p-3 border border-purple-200">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700">Monitoring 2 - Minggu 14</span>
                    <span class="text-xs text-gray-500">(30%)</span>
                  </div>
                  <p class="text-2xl font-bold text-purple-600 mt-1">
                    {{ student.uasDetail.monitoring2 }}
                  </p>
                </div>
                
                <div class="bg-white rounded-lg p-3 border border-purple-200">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700">Presentasi Final - Minggu 16</span>
                    <span class="text-xs text-gray-500">(40%)</span>
                  </div>
                  <p class="text-2xl font-bold text-purple-600 mt-1">
                    {{ student.uasDetail.presentasiFinal }}
                  </p>
                </div>

                <div class="bg-purple-600 rounded-lg p-3 text-white mt-2">
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-semibold">Total Nilai UAS</span>
                    <span class="text-xs opacity-90">(100%)</span>
                  </div>
                  <p class="text-3xl font-bold mt-1">
                    {{ student.uas }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-if="filteredStudents.length === 0" class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <p class="text-yellow-700">Tidak ada data yang cocok dengan pencarian "{{ searchQuery }}"</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
        <p class="text-gray-600">Belum ada koneksi ke Google Sheets</p>
        <p class="text-sm text-gray-500 mt-2">Setup Google Apps Script terlebih dahulu</p>
      </div>

      <!-- Logout Button -->
      <div class="mt-6 text-center">
        <button 
          @click="handleLogout"
          class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors"
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

// Toggle Detail UAS - TAMBAH INI
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
        { week: 'Minggu UTS', pekan: row[16] || '-', tugas: '' },
      ],
      tugas: formatNumber(row[17]),
      kehadiran: formatNumber(row[18]),
      uts: formatNumber(row[19]),
      uas: formatNumber(row[20]),
      peerReview: formatNumber(row[21]),
      nilaiHasil: formatNumber(row[22]),
      nilaiHuruf: row[23] || '-',
      uasDetail: {
        monitoring1: formatNumber(row[24]), // Kolom Y (index 24)
        monitoring2: formatNumber(row[25]), // Kolom Z (index 25)
        presentasiFinal: formatNumber(row[26]) // Kolom AA (index 26)
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
@keyframes progress {
  0% {
    width: 0%;
  }
  50% {
    width: 70%;
  }
  100% {
    width: 100%;
  }
}

.animate-progress {
  animation: progress 2s ease-in-out infinite;
}
</style>