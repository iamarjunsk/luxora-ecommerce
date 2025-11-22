<template>
  <div class="min-h-screen flex flex-col bg-luxora-cream">
    <AppNavbar />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
