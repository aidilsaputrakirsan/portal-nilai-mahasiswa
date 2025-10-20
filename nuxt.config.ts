import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  modules: ['@nuxtjs/tailwindcss'],
  
  ssr: false,
  
  app: {
    head: {
      title: 'Portal Nilai Mahasiswa',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portal untuk melihat nilai, tugas, dan absensi mahasiswa' }
      ]
    }
  },

  runtimeConfig: {
    // Format: password:spreadsheetId
    mkPm: '',
    mkKka: '',
    mkKkb: '',
    mkDmjk: '',
    
    public: {
      sheetName: 'Nilai'
    }
  }
})