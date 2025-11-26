<template>
    <div class="group relative h-full flex flex-col">
        <!-- Image -->
        <div class="aspect-[3/4] overflow-hidden bg-gray-100 relative mb-4">
            <NuxtImg :src="product.images?.[0]?.url || config.public.assets.placeholder.product" :alt="product.name"
                class="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
            
            <!-- Wishlist Button -->
            <button @click.prevent="wishlistStore.toggleWishlist(product)"
                class="absolute top-2 right-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <HeartIcon class="h-6 w-6"
                    :class="wishlistStore.isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-white'" />
            </button>
        </div>

        <!-- Details -->
        <div class="text-left flex flex-col flex-grow">
            <h3 class="text-base font-medium text-luxora-black mb-1 line-clamp-1">
                <NuxtLink :to="`/product/${product.slug}`">
                    {{ product.name }}
                </NuxtLink>
            </h3>
            <p class="text-sm text-gray-900 mb-4">₹{{ product.price.toLocaleString() }}</p>
            
            <div class="mt-auto">
                <button @click.prevent="addToCart"
                    class="w-full bg-[#1A1A1A] text-white py-3 text-xs font-bold tracking-widest uppercase hover:bg-luxora-gold hover:text-luxora-black transition-colors duration-300">
                    [ Add to Bag ]
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ShoppingBagIcon, HeartIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const config = useRuntimeConfig()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const addToCart = () => {
    cartStore.addToCart(props.product)
    // Optional: Show toast notification
}
</script>
