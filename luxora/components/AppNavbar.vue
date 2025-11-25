<template>
  <nav class="bg-luxora-black text-luxora-cream sticky top-0 z-50 border-b border-luxora-charcoal">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <div class="logo-container relative shrink-0" style="width: 40px; height: 40px;">
          <NuxtImg :src="config.public.assets.logo" alt="Luxora"
            style="max-width: 40px; max-height: 40px; width: 100%; height: 100%; object-fit: contain;" width="40"
            height="40" />
        </div>
        <span class="font-serif text-2xl tracking-widest text-luxora-gold">LUXORA</span>
      </NuxtLink>

      <!-- Desktop Menu -->
      <div class="hidden md:flex gap-8 text-sm tracking-wide uppercase">
        <NuxtLink to="/" class="hover:text-luxora-gold transition">Home</NuxtLink>
        <NuxtLink to="/shop" class="hover:text-luxora-gold transition">Shop</NuxtLink>
        <NuxtLink v-for="category in categories" :key="category.id" :to="`/shop?category=${category.name}`"
          class="hover:text-luxora-gold transition">{{ category.name }}</NuxtLink>
      </div>

      <!-- Icons -->
      <div class="flex items-center gap-6">
        <button @click="toggleSearch" class="hover:text-luxora-gold transition">
          <MagnifyingGlassIcon class="h-6 w-6" />
        </button>
        <ClientOnly>
          <NuxtLink :to="user ? (user.role === 'ADMIN' ? '/admin' : '/profile') : '/login'"
            class="hover:text-luxora-gold transition">
            <UserIcon class="h-6 w-6" />
          </NuxtLink>
          <NuxtLink to="/cart" class="relative hover:text-luxora-gold transition">
            <ShoppingBagIcon class="h-6 w-6" />
            <span v-if="cartStore.cartCount > 0"
              class="absolute -top-2 -right-2 bg-luxora-gold text-luxora-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartStore.cartCount }}
            </span>
          </NuxtLink>
        </ClientOnly>
      </div>
    </div>

    <!-- Search Bar -->
    <div v-if="isSearchOpen"
      class="absolute top-full left-0 w-full bg-white text-black p-6 shadow-lg border-t border-gray-100 animate-fade-in-down">
      <div class="container mx-auto relative max-w-3xl">
        <input v-model="searchQuery" @keyup.enter="handleSearch" type="text" placeholder="Search for products..."
          class="w-full border-b-2 border-gray-200 py-3 text-xl focus:outline-none focus:border-luxora-gold transition-colors"
          ref="searchInput" />
        <button @click="handleSearch"
          class="absolute right-0 top-4 text-luxora-gold font-bold uppercase tracking-widest text-sm hover:text-luxora-black transition">
          Search
        </button>
        <button @click="isSearchOpen = false" class="absolute -right-12 top-4 text-gray-400 hover:text-red-500">
          <span class="sr-only">Close</span>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { MagnifyingGlassIcon, UserIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '~/stores/cart'

const config = useRuntimeConfig()
const cartStore = useCartStore()
const { data: categories } = await useFetch('/api/categories')
const { user, fetchUser } = useAuth()
const router = useRouter()

const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

await fetchUser()

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/shop', query: { search: searchQuery.value } })
    isSearchOpen.value = false
    searchQuery.value = ''
  }
}
</script>

<style scoped>
.logo-container {
  width: 32px;
  height: 32px;
}

@media (min-width: 768px) {
  .logo-container {
    width: 40px;
    height: 40px;
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.3s ease-out forwards;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
