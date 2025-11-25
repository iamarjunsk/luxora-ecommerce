<template>
  <nav class="bg-luxora-black text-luxora-cream sticky top-0 z-50 border-b border-luxora-charcoal">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <NuxtImg :src="config.public.assets.logo" alt="Luxora" class="h-8 md:h-10" />
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
        <button class="hover:text-luxora-gold transition">
          <MagnifyingGlassIcon class="h-6 w-6" />
        </button>
        <NuxtLink :to="user ? (user.role === 'ADMIN' ? '/admin' : '/profile') : '/login'" class="hover:text-luxora-gold transition">
          <UserIcon class="h-6 w-6" />
        </NuxtLink>
        <NuxtLink to="/cart" class="relative hover:text-luxora-gold transition">
          <ShoppingBagIcon class="h-6 w-6" />
          <span v-if="cartStore.cartCount > 0" class="absolute -top-2 -right-2 bg-luxora-gold text-luxora-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {{ cartStore.cartCount }}
          </span>
        </NuxtLink>
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

await fetchUser()

// Add toggleCart to cart store or handle it here (using a UI state store or just emitting)
// For now, let's assume we'll add a drawer later.
</script>
