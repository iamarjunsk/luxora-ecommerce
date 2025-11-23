<template>
  <Transition name="snackbar">
    <div v-if="isVisible" class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded shadow-lg min-w-[300px]"
      :class="{
        'bg-luxora-black text-white': type === 'success',
        'bg-red-600 text-white': type === 'error',
        'bg-blue-600 text-white': type === 'info'
      }">
      <div class="flex-grow font-medium">{{ message }}</div>
      <button @click="closeSnackbar" class="text-white/80 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup>
const { isVisible, message, type, closeSnackbar } = useSnackbar()
</script>

<style scoped>
.snackbar-enter-active,
.snackbar-leave-active {
  transition: all 0.3s ease;
}

.snackbar-enter-from,
.snackbar-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
