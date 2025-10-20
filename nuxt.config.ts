import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
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
    public: {
      passwords: {
        pm: 'pm7x9k2',
        kka: 'kk4a8m1',
        kkb: 'kk5b3n7',
        dmjk: 'dm6j2p9'
      },
      spreadsheetIds: {
        pm: '15eQiYlMmJvAhEE15sx9FUL7bLirhniOb9oErCOWJHY0',
        kka: '',
        kkb: '',
        dmjk: ''
      },
      sheetName: 'Nilai' 
    }
  }
})