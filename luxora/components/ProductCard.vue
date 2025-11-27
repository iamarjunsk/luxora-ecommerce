<template>
    <div class="group relative h-full flex flex-col">
        <!-- Image -->
        <div class="aspect-[3/4] overflow-hidden bg-gray-100 relative mb-4 cursor-pointer" @click="navigateToProduct">
            <NuxtImg :src="product.images?.[0]?.url || config.public.assets.placeholder.product" :alt="product.name"
                class="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />

            <!-- Loading Overlay -->
            <div v-if="isLoading"
                class="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                <div class="animate-spin rounded-full h-8 w-8 border-2 border-luxora-gold border-t-transparent"></div>
            </div>

            <!-- Wishlist Button -->
            <button @click.stop="wishlistStore.toggleWishlist(product)"
                class="absolute top-2 right-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <HeartIcon class="h-6 w-6"
                    :class="wishlistStore.isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-white'" />
            </button>
        </div>

        <!-- Details -->
        <div class="text-left flex flex-col flex-grow">
            <h3 class="text-base font-medium text-luxora-black mb-1 line-clamp-1">
                <a href="#" @click.prevent="navigateToProduct" class="hover:text-luxora-gold transition-colors">
                    {{ product.name }}
                </a>
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
const isLoading = ref(false)
const router = useRouter()

const navigateToProduct = async () => {
    isLoading.value = true
    await router.push(`/product/${props.product.slug}`)
    // isLoading.value = false // No need to reset as page will change
}

const addToCart = () => {
    cartStore.addToCart(props.product)
}
</script>
