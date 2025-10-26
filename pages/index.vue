<template>
  <div class="relative min-h-screen">
    <!-- Particles Background -->
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="particlesOptions"
      class="absolute inset-0 -z-10"
    />

    <!-- Content -->
    <div class="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
      <!-- Header -->
      <div class="text-center mb-8 backdrop-blur-sm bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
          📊 Grade Verse
        </h1>
        <p class="text-gray-700 font-medium">Pilih Mata Kuliah untuk melihat nilai</p>
      </div>

      <!-- MK Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <!-- Pemrograman Mobile -->
        <NuxtLink 
          to="/pm" 
          class="group bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
        >
          <div class="relative z-10 text-center">
            <div class="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg">
              <span class="text-3xl">📱</span>
            </div>
            <h2 class="text-xl font-bold text-gray-800 mb-2">
              Pemrograman Mobile
            </h2>
            <p class="text-sm text-gray-600">Klik untuk akses</p>
          </div>
          <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl group-hover:bg-blue-400/20 transition-colors"></div>
        </NuxtLink>

        <!-- Komputasi Awan A -->
        <NuxtLink 
          to="/kka" 
          class="group bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
        >
          <div class="relative z-10 text-center">
            <div class="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg">
              <span class="text-3xl">☁️</span>
            </div>
            <h2 class="text-xl font-bold text-gray-800 mb-2">
              Komputasi Awan A
            </h2>
            <p class="text-sm text-gray-600">Klik untuk akses</p>
          </div>
          <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-green-400/10 rounded-full blur-2xl group-hover:bg-green-400/20 transition-colors"></div>
        </NuxtLink>

        <!-- Komputasi Awan B -->
        <NuxtLink 
          to="/kkb" 
          class="group bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
        >
          <div class="relative z-10 text-center">
            <div class="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg">
              <span class="text-3xl">☁️</span>
            </div>
            <h2 class="text-xl font-bold text-gray-800 mb-2">
              Komputasi Awan B
            </h2>
            <p class="text-sm text-gray-600">Klik untuk akses</p>
          </div>
          <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl group-hover:bg-purple-400/20 transition-colors"></div>
        </NuxtLink>

        <!-- DMJK B -->
        <NuxtLink 
          to="/dmjk" 
          class="group bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
        >
          <div class="relative z-10 text-center">
            <div class="w-16 h-16 mx-auto bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg">
              <span class="text-3xl">🌐</span>
            </div>
            <h2 class="text-xl font-bold text-gray-800 mb-2">
              Desain & Manajemen Jaringan Komputer B
            </h2>
            <p class="text-sm text-gray-600">Klik untuk akses</p>
          </div>
          <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl group-hover:bg-orange-400/20 transition-colors"></div>
        </NuxtLink>
      </div>

      <!-- Footer -->
      <div class="mt-12 text-center backdrop-blur-sm bg-white/10 rounded-2xl px-6 py-3 border border-white/20 shadow-lg">
        <p class="text-gray-700 text-sm font-medium">© 2025 Grade Verse - ADL</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Particles Configuration
const particlesOptions = {
  background: {
    color: {
      value: "transparent"
    }
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push"
      },
      onHover: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      push: {
        quantity: 2
      },
      repulse: {
        distance: 100,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: ["#6366f1", "#8b5cf6", "#3b82f6", "#06b6d4"]
    },
    links: {
      color: "#6366f1",
      distance: 150,
      enable: true,
      opacity: 0.15,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      outModes: {
        default: "bounce"
      }
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 60
    },
    opacity: {
      value: 0.3,
      animation: {
        enable: true,
        speed: 0.5,
        minimumValue: 0.1
      }
    },
    shape: {
      type: "circle"
    },
    size: {
      value: { min: 1, max: 4 }
    }
  },
  detectRetina: true
}
</script>

<style scoped>
.hover\:shadow-3xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>