<template>
  <div class="relative min-h-screen">
    <!-- Content -->
    <div class="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
      <!-- Header -->
      <div class="text-center mb-8 backdrop-blur-sm bg-white/10 dark:bg-gray-800/20 rounded-3xl p-8 border border-white/20 dark:border-gray-600/20 shadow-2xl">
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
          🎓Grade Verse
        </h1>
        <p class="text-gray-700 dark:text-gray-300 font-medium">Pilih Mata Kuliah untuk melihat nilai</p>
      </div>

      <!-- MK Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <!-- Pemrograman Mobile -->
        <NuxtLink 
          to="/pm" 
          class="group bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-700/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 dark:border-gray-600/30 p-6 hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
        >
          <div class="relative z-10 text-center">
            <div class="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg">
              <span class="text-3xl">📱</span>
            </div>
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Pemrograman Mobile
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Klik untuk akses</p>
          </div>
          <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-400/10 dark:bg-blue-400/20 rounded-full blur-2xl group-hover:bg-blue-400/20 dark:group-hover:bg-blue-400/30 transition-colors"></div>
        </NuxtLink>

        <!-- Komputasi Awan A -->
        <NuxtLink 
          to="/kka" 
          class="group bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-700/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 dark:border-gray-600/30 p-6 hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
        >
          <div class="relative z-10 text-center">
            <div class="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg">
              <span class="text-3xl">☁️</span>
            </div>
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Komputasi Awan A
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Klik untuk akses</p>
          </div>
          <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-green-400/10 dark:bg-green-400/20 rounded-full blur-2xl group-hover:bg-green-400/20 dark:group-hover:bg-green-400/30 transition-colors"></div>
        </NuxtLink>

        <!-- Komputasi Awan B -->
        <NuxtLink 
          to="/kkb" 
          class="group bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-700/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 dark:border-gray-600/30 p-6 hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
        >
          <div class="relative z-10 text-center">
            <div class="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg">
              <span class="text-3xl">☁️</span>
            </div>
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Komputasi Awan B
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Klik untuk akses</p>
          </div>
          <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-400/10 dark:bg-purple-400/20 rounded-full blur-2xl group-hover:bg-purple-400/20 dark:group-hover:bg-purple-400/30 transition-colors"></div>
        </NuxtLink>

        <!-- DMJK B -->
        <NuxtLink 
          to="/dmjk" 
          class="group bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-700/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 dark:border-gray-600/30 p-6 hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
        >
          <div class="relative z-10 text-center">
            <div class="w-16 h-16 mx-auto bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg">
              <span class="text-3xl">🌐</span>
            </div>
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Desain & Manajemen Jaringan Komputer B
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Klik untuk akses</p>
          </div>
          <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-400/10 dark:bg-orange-400/20 rounded-full blur-2xl group-hover:bg-orange-400/20 dark:group-hover:bg-orange-400/30 transition-colors"></div>
        </NuxtLink>
      </div>

      <!-- Footer -->
      <div class="mt-12 text-center backdrop-blur-sm bg-white/10 dark:bg-gray-800/20 rounded-2xl px-6 py-3 border border-white/20 dark:border-gray-600/20 shadow-lg">
        <p class="text-gray-700 dark:text-gray-300 text-sm font-medium">© 2025 Grade Verse - ADL</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover\:shadow-3xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.dark .hover\:shadow-3xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
}
</style>
