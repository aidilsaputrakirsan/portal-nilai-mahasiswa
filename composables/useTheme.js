import { ref, readonly } from 'vue'

export const useTheme = () => {
  const theme = ref('system')
  const isDark = ref(false)

  const apply = () => {
    if (!process.client) return
    const el = document.documentElement
    
    el.classList.remove('dark')
    console.log('🔄 Theme:', theme.value)

    if (theme.value === 'dark') {
      el.classList.add('dark')
      isDark.value = true
    } else if (theme.value === 'light') {
      isDark.value = false
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        el.classList.add('dark')
        isDark.value = true
      } else {
        isDark.value = false
      }
    }
    
    localStorage.setItem('theme', theme.value)
  }

  const setTheme = (newTheme) => {
    theme.value = newTheme
    apply()
  }

  const toggleTheme = () => {
    const themes = ['system', 'light', 'dark']
    const currentIndex = themes.indexOf(theme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const initTheme = () => {
    if (!process.client) return
    
    const saved = localStorage.getItem('theme') || 'system'
    theme.value = saved
    apply()
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (theme.value === 'system') {
        apply()
      }
    }
    mediaQuery.addEventListener('change', handler)
  }

  return {
    theme: readonly(theme),
    isDark: readonly(isDark),
    setTheme,
    toggleTheme,
    initTheme
  }
}
