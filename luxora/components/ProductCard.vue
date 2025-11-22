<template>
    <div class="group relative bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <!-- Image -->
        <div class="aspect-square overflow-hidden bg-gray-100 relative">
            <img :src="product.image" :alt="product.name"
                class="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />

            <!-- Quick Add Button (Visible on Hover) -->
            <button @click.prevent="addToCart"
                class="absolute bottom-4 right-4 bg-luxora-gold text-luxora-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-luxora-gold-light">
                <ShoppingBagIcon class="h-5 w-5" />
            </button>
        </div>

        <!-- Details -->
        <div class="p-4">
            <p class="text-xs text-luxora-gray uppercase tracking-wider mb-1">{{ product.category }}</p>
            <h3 class="text-lg font-serif text-luxora-black mb-2 group-hover:text-luxora-gold transition-colors">
                <NuxtLink :to="`/product/${product.id}`">
                    {{ product.name }}
                </NuxtLink>
            </h3>
            <p class="font-medium text-luxora-charcoal">${{ product.price.toLocaleString() }}</p>
        </div>
    </div>
</template>

<script setup>
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '~/stores/cart'

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const cartStore = useCartStore()

const addToCart = () => {
    cartStore.addToCart(props.product)
    // Optional: Show toast notification
}
</script>
