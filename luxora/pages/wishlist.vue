<template>
    <div class="min-h-screen bg-white pt-12 pb-24">
        <div class="container mx-auto px-6">
            <!-- Header -->
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-5xl font-serif text-luxora-black mb-4">My Wishlist</h1>
                <p class="text-gray-500 tracking-wide uppercase text-xs">Your Curated Favorites</p>
            </div>

            <!-- Wishlist Grid -->
            <div v-if="wishlistStore.items.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                <ProductCard v-for="item in wishlistStore.items" :key="item.id" :product="item.product" />
            </div>

            <!-- Empty State -->
            <div v-else class="flex flex-col items-center justify-center py-20 text-center">
                <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <HeartIcon class="h-10 w-10 text-gray-300" />
                </div>
                <h2 class="text-2xl font-serif text-luxora-black mb-3">Your wishlist is empty</h2>
                <p class="text-gray-500 mb-8 max-w-md">
                    Items added to your wishlist will appear here. Start discovering our collection.
                </p>
                <NuxtLink to="/shop" 
                    class="inline-block bg-luxora-black text-white px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-luxora-gold hover:text-luxora-black transition-colors duration-300">
                    Start Shopping
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useWishlistStore } from '~/stores/wishlist'
import { HeartIcon } from '@heroicons/vue/24/outline'

definePageMeta({
    middleware: 'user-auth'
})

const wishlistStore = useWishlistStore()

onMounted(() => {
    wishlistStore.fetchWishlist()
})
</script>
