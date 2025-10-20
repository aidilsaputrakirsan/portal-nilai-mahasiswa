<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        📊 Grade Verse
      </h1>
      <p class="text-gray-600">Pilih Mata Kuliah untuk melihat nilai</p>
    </div>

    <!-- MK Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
      <!-- Pemrograman Mobile -->
      <NuxtLink 
        to="/pm" 
        class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:scale-105 active:scale-95"
      >
        <div class="text-center">
          <div class="text-4xl mb-3">📱</div>
          <h2 class="text-xl font-bold text-gray-800 mb-2">
            Pemrograman Mobile
          </h2>
          <p class="text-sm text-gray-500">Klik untuk akses</p>
        </div>
      </NuxtLink>

      <!-- Komputasi Awan A -->
      <NuxtLink 
        to="/kka" 
        class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:scale-105 active:scale-95"
      >
        <div class="text-center">
          <div class="text-4xl mb-3">☁️</div>
          <h2 class="text-xl font-bold text-gray-800 mb-2">
            Komputasi Awan A
          </h2>
          <p class="text-sm text-gray-500">Klik untuk akses</p>
        </div>
      </NuxtLink>

      <!-- Komputasi Awan B -->
      <NuxtLink 
        to="/kkb" 
        class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:scale-105 active:scale-95"
      >
        <div class="text-center">
          <div class="text-4xl mb-3">☁️</div>
          <h2 class="text-xl font-bold text-gray-800 mb-2">
            Komputasi Awan B
          </h2>
          <p class="text-sm text-gray-500">Klik untuk akses</p>
        </div>
      </NuxtLink>

      <!-- DMJK B -->
      <NuxtLink 
        to="/dmjk" 
        class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:scale-105 active:scale-95"
      >
        <div class="text-center">
          <div class="text-4xl mb-3">🌐</div>
          <h2 class="text-xl font-bold text-gray-800 mb-2">
            Desain & Manajemen Jaringan Komputer B
          </h2>
          <p class="text-sm text-gray-500">Klik untuk akses</p>
        </div>
      </NuxtLink>
    </div>

    <!-- Footer -->
    <div class="mt-12 text-center text-gray-500 text-sm">
      <p>© 2025 Grade Verse - ADL</p>
    </div>
  </div>
</template>

<script setup>
// Landing page untuk memilih MK
</script>