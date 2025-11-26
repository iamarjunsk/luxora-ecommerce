<template>
    <div class="container mx-auto px-6 py-12">
        <h1 class="text-3xl font-serif mb-8">My Wishlist</h1>

        <div v-if="wishlistStore.items.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProductCard v-for="item in wishlistStore.items" :key="item.id" :product="item.product" />
        </div>
        <div v-else class="text-center py-20 bg-gray-50 rounded-lg">
            <p class="text-gray-500 mb-4">Your wishlist is empty.</p>
            <NuxtLink to="/shop" class="text-luxora-gold hover:underline">Continue Shopping</NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { useWishlistStore } from '~/stores/wishlist'

definePageMeta({
    middleware: 'user-auth'
})

const wishlistStore = useWishlistStore()

onMounted(() => {
    wishlistStore.fetchWishlist()
})
</script>
