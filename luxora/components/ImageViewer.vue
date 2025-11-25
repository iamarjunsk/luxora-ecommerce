<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      @click="close">
      <!-- Close Button -->
      <button @click="close" class="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Image -->
      <div class="relative max-w-[90vw] max-h-[90vh]" @click.stop>
        <NuxtImg :src="imageUrl" alt="Full screen view" class="max-w-full max-h-[90vh] object-contain shadow-2xl" />
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  imageUrl: String
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

// Close on Escape key
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
