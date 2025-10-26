<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-colors duration-500">
    <div class="fixed top-4 right-4 z-50">
      <ThemeToggle />
    </div>
    <NuxtPage />
  </div>
</template>

<script setup>
const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<style>
html {
  scroll-behavior: smooth;
  transition: background-color 0.3s ease;
}

.dark {
  color-scheme: dark;
}
</style>
