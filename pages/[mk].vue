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

        <!-- Password Hint (untuk testing) -->
        <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p class="text-xs text-yellow-700">
            💡 <strong>Password Testing:</strong> {{ config.public.passwords[mkCode] }}
          </p>
        </div>
      </div>
    </div>

    <!-- Data Display (jika sudah authenticated) -->
    <div v-else>
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="text-gray-600 mt-4">Memuat data...</p>
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
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm opacity-90">NIM</p>
                <p class="text-lg font-bold">{{ student.nim }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm opacity-90">Nilai Akhir</p>
                <p class="text-2xl font-bold">{{ student.nilaiHuruf }}</p>
              </div>
            </div>
            <p class="text-xl font-semibold mt-2">{{ student.nama }}</p>
          </div>

          <!-- Data Content -->
          <div class="p-4">
            <!-- Nilai Akhir Summary -->
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
                <p class="text-xs text-gray-600 mb-1">UAS (60%)</p>
                <p class="text-lg font-bold text-purple-600">{{ student.uas }}</p>
              </div>
              <div class="bg-pink-50 rounded-lg p-3">
                <p class="text-xs text-gray-600 mb-1">Peer Review (5%)</p>
                <p class="text-lg font-bold text-pink-600">{{ student.peerReview }}</p>
              </div>
              <div class="bg-indigo-50 rounded-lg p-3">
                <p class="text-xs text-gray-600 mb-1">Nilai Hasil (100%)</p>
                <p class="text-lg font-bold text-indigo-600">{{ student.nilaiHasil }}</p>
              </div>
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
const config = useRuntimeConfig()

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

// Filtered Students
const filteredStudents = computed(() => {
  if (!searchQuery.value) return students.value
  
  const query = searchQuery.value.toLowerCase()
  return students.value.filter(student => 
    student.nim.toLowerCase().includes(query) ||
    student.nama.toLowerCase().includes(query)
  )
})

// Toggle Detail
const toggleDetail = (nim) => {
  if (expandedCards.value.has(nim)) {
    expandedCards.value.delete(nim)
  } else {
    expandedCards.value.add(nim)
  }
}

// Handle Login
const handleLogin = () => {
  const correctPassword = config.public.passwords[mkCode.value]
  
  if (passwordInput.value === correctPassword) {
    isAuthenticated.value = true
    errorMessage.value = ''
    // Save to sessionStorage
    if (process.client) {
      sessionStorage.setItem(`auth_${mkCode.value}`, 'true')
    }
    // Fetch data
    fetchData()
  } else {
    errorMessage.value = 'Password salah!'
  }
}

// Handle Logout
const handleLogout = () => {
  isAuthenticated.value = false
  students.value = []
  passwordInput.value = ''
  if (process.client) {
    sessionStorage.removeItem(`auth_${mkCode.value}`)
  }
}

// Fetch Data from GAS
// Fetch Data from GAS via API Route
const fetchData = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    const spreadsheetId = config.public.spreadsheetIds[mkCode.value]
    
    if (!spreadsheetId) {
      // Untuk testing tanpa spreadsheet ID
      students.value = generateDummyData()
      return
    }

    // Panggil API route Nuxt (bukan langsung ke GAS)
    const response = await fetch('/api/sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        spreadsheetId: spreadsheetId,
        sheetName: config.public.sheetName
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
    errorMessage.value = error.message
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}


// Helper function untuk format angka (max 2 desimal)
const formatNumber = (value) => {
  if (value === null || value === undefined || value === '') return '-'
  
  const num = typeof value === 'number' ? value : parseFloat(value)
  
  if (isNaN(num)) return value // Kalau bukan angka, return apa adanya
  
  // Bulatkan ke 2 desimal, lalu hapus trailing zeros
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
        { week: 'Minggu UTS', pekan: row[16] || '-', tugas: '' }, // Minggu 8 tanpa tugas
      ],
      tugas: formatNumber(row[17]),
      kehadiran: formatNumber(row[18]),
      uts: formatNumber(row[19]),
      uas: formatNumber(row[20]),
      peerReview: formatNumber(row[21]),
      nilaiHasil: formatNumber(row[22]),
      nilaiHuruf: row[23] || '-'
    }
  })
}

// Check auth on mount
onMounted(() => {
  if (process.client) {
    const savedAuth = sessionStorage.getItem(`auth_${mkCode.value}`)
    if (savedAuth === 'true') {
      isAuthenticated.value = true
      fetchData()
    }
  }
})
</script>