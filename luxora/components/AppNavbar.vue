<template>
  <nav class="bg-white text-luxora-black sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
    <div class="container mx-auto px-6 h-20 flex justify-between items-center relative">
      <!-- Left Section: Mobile Menu Button & Desktop Menu -->
      <div class="flex items-center">
        <!-- Mobile Menu Button (Left) -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden hover:text-luxora-gold transition-colors mr-4 focus:outline-none">
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Desktop Menu (Left) -->
        <div class="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase">
          <NuxtLink to="/" class="hover:text-luxora-gold transition-colors relative group">
            Home
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxora-gold transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
          <NuxtLink to="/shop" class="hover:text-luxora-gold transition-colors relative group">
            Shop
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxora-gold transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
          <div class="relative group">
            <button class="hover:text-luxora-gold transition-colors flex items-center gap-1">
              Categories
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <!-- Dropdown -->
            <div class="absolute top-full left-0 w-48 bg-white shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <NuxtLink v-for="category in categories" :key="category.id" :to="`/shop?category=${encodeURIComponent(category.name)}`"
                class="block px-4 py-2 hover:bg-gray-50 hover:text-luxora-gold transition-colors">
                {{ category.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Logo (Center) -->
      <NuxtLink to="/" class="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <div class="w-28 md:w-40">
          <NuxtImg :src="config.public.assets.logo" alt="Luxora"
            class="w-full h-auto object-contain" />
        </div>
      </NuxtLink>

      <!-- Icons (Right) -->
      <div class="flex items-center gap-4 md:gap-6">
        <button @click="toggleSearch" class="hover:text-luxora-gold transition-colors">
          <MagnifyingGlassIcon class="h-5 w-5" />
        </button>
        <ClientOnly>
          <NuxtLink :to="user ? (user.role === 'ADMIN' ? '/admin' : '/profile') : '/login'"
            class="hover:text-luxora-gold transition-colors">
            <UserIcon class="h-5 w-5" />
          </NuxtLink>
          <NuxtLink to="/wishlist" class="relative hover:text-luxora-gold transition-colors hidden md:block">
            <HeartIcon class="h-5 w-5" />
            <span v-if="wishlistStore.wishlistCount > 0"
              class="absolute -top-1.5 -right-1.5 bg-luxora-black text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {{ wishlistStore.wishlistCount }}
            </span>
          </NuxtLink>
          <NuxtLink to="/cart" class="relative hover:text-luxora-gold transition-colors">
            <ShoppingBagIcon class="h-5 w-5" />
            <span v-if="cartStore.cartCount > 0"
              class="absolute -top-1.5 -right-1.5 bg-luxora-black text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {{ cartStore.cartCount }}
            </span>
          </NuxtLink>
        </ClientOnly>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-x-full opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-x-0 opacity-100"
      leave-to-class="transform -translate-x-full opacity-0"
    >
      <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-white z-40 flex flex-col md:hidden">
        <!-- Header -->
        <div class="h-20 flex items-center justify-between px-6 border-b border-gray-100">
          <span class="text-sm font-bold uppercase tracking-widest text-luxora-black">Menu</span>
          <button @click="isMobileMenuOpen = false" class="text-gray-400 hover:text-luxora-black transition-colors">
            <span class="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto py-8 px-6">
          <div class="flex flex-col gap-8">
            <!-- Main Links -->
            <div class="flex flex-col gap-6">
              <NuxtLink to="/" @click="isMobileMenuOpen = false" 
                class="text-3xl font-serif text-luxora-black hover:text-luxora-gold transition-colors">
                Home
              </NuxtLink>
              <NuxtLink to="/shop" @click="isMobileMenuOpen = false" 
                class="text-3xl font-serif text-luxora-black hover:text-luxora-gold transition-colors">
                Shop All
              </NuxtLink>
            </div>

            <!-- Categories (Expandable) -->
            <div class="pt-6 border-t border-gray-100">
              <button @click="isCollectionsOpen = !isCollectionsOpen" 
                class="w-full flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 focus:outline-none group">
                Collections
                <svg xmlns="http://www.w3.org/2000/svg" 
                  class="h-4 w-4 transition-transform duration-300"
                  :class="{ 'rotate-180': isCollectionsOpen }"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div v-show="isCollectionsOpen" class="flex flex-col gap-4 pl-2 transition-all duration-300">
                <NuxtLink v-for="category in categories" :key="category.id" 
                  :to="`/shop?category=${encodeURIComponent(category.name)}`"
                  @click="isMobileMenuOpen = false"
                  class="text-lg text-gray-600 hover:text-luxora-black transition-colors flex items-center justify-between group">
                  {{ category.name }}
                  <span class="w-0 h-px bg-luxora-black transition-all duration-300 group-hover:w-4"></span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-6 bg-gray-50 border-t border-gray-100">
          <div class="flex flex-col gap-4">
            <NuxtLink to="/login" @click="isMobileMenuOpen = false" 
              class="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-luxora-black hover:text-luxora-gold transition-colors">
              <UserIcon class="h-5 w-5" />
              Sign In / Register
            </NuxtLink>
            <NuxtLink to="/wishlist" @click="isMobileMenuOpen = false" 
              class="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-luxora-black hover:text-luxora-gold transition-colors">
              <HeartIcon class="h-5 w-5" />
              Wishlist
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Search Bar -->
    <div v-if="isSearchOpen"
      class="absolute top-full left-0 w-full bg-white text-black p-8 shadow-xl border-t border-gray-100 animate-fade-in-down z-40">
      <div class="container mx-auto relative max-w-2xl">
        <input v-model="searchQuery" @keyup.enter="handleSearch" type="text" placeholder="Search for products..."
          class="w-full border-b border-gray-300 py-4 text-2xl font-serif focus:outline-none focus:border-luxora-black transition-colors bg-transparent placeholder-gray-300"
          ref="searchInput" />
        <button @click="handleSearch"
          class="absolute right-0 top-6 text-xs font-bold uppercase tracking-widest hover:text-luxora-gold transition-colors">
          Search
        </button>
        <button @click="isSearchOpen = false" class="absolute -right-12 top-6 text-gray-400 hover:text-luxora-black transition-colors">
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
import { MagnifyingGlassIcon, UserIcon, ShoppingBagIcon, HeartIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'

const config = useRuntimeConfig()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const { data: categories } = await useFetch('/api/categories')
const { user, fetchUser } = useAuth()
const router = useRouter()

const isSearchOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isCollectionsOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

await fetchUser()
if (user.value) {
  await wishlistStore.fetchWishlist()
}

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    isMobileMenuOpen.value = false // Close mobile menu if search opens
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

// Close mobile menu on route change
watch(() => router.currentRoute.value.fullPath, () => {
  isMobileMenuOpen.value = false
})
</script>

<style scoped>
.logo-container {
  width: 120px;
  height: auto;
}

@media (min-width: 768px) {
  .logo-container {
    width: 160px;
    height: auto;
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
