<template>
  <client-only>
    <Particles
      v-if="isReady"
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="options"
      class="absolute inset-0 -z-10"
    />
  </client-only>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { loadSlim } from 'tsparticles-slim'

const props = defineProps({
  options: {
    type: Object,
    required: true
  }
})

const isReady = ref(false)
let Particles = null

onMounted(async () => {
  if (process.client) {
    const module = await import('vue3-particles')
    Particles = module.default
    isReady.value = true
  }
})

const particlesInit = async (engine) => {
  await loadSlim(engine)
}
</script>