<template>
    <div v-if="product" class="container mx-auto px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <!-- Image -->
            <div class="bg-white border border-gray-100 p-4">
                <img :src="product.image" :alt="product.name" class="w-full h-auto object-cover" />
            </div>

            <!-- Details -->
            <div class="flex flex-col justify-center">
                <p class="text-sm text-luxora-gray uppercase tracking-wider mb-2">{{ product.category }}</p>
                <h1 class="text-4xl md:text-5xl font-serif text-luxora-black mb-4">{{ product.name }}</h1>
                <p class="text-2xl font-medium text-luxora-gold mb-8">${{ product.price.toLocaleString() }}</p>

                <p class="text-gray-600 leading-relaxed mb-8 text-lg">
                    {{ product.description }}
                </p>

                <div class="flex gap-4 mb-8">
                    <div class="flex items-center border border-gray-300">
                        <button @click="quantity > 1 ? quantity-- : null" class="px-4 py-2 hover:bg-gray-100">-</button>
                        <span class="px-4 py-2 font-medium">{{ quantity }}</span>
                        <button @click="quantity++" class="px-4 py-2 hover:bg-gray-100">+</button>
                    </div>
                    <button @click="addToCart"
                        class="flex-grow bg-luxora-black text-white px-8 py-3 font-bold tracking-widest hover:bg-luxora-gold hover:text-luxora-black transition-colors duration-300">
                        ADD TO CART
                    </button>
                </div>

                <div class="border-t border-gray-200 pt-6 space-y-3 text-sm text-gray-500">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                        In Stock & Ready to Ship
                    </div>
                    <p>Free shipping on orders over $500.</p>
                    <p>30-day money-back guarantee.</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="container mx-auto px-6 py-20 text-center">
        <h1 class="text-2xl font-serif mb-4">Product Not Found</h1>
        <NuxtLink to="/shop" class="text-luxora-gold hover:underline">Return to Shop</NuxtLink>
    </div>
</template>

<script setup>
import { useProductStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const product = computed(() => productStore.getProductById(route.params.id))
const quantity = ref(1)

const addToCart = () => {
    if (product.value) {
        for (let i = 0; i < quantity.value; i++) {
            cartStore.addToCart(product.value)
        }
        // Optional: Show success message
        alert('Added to cart!')
    }
}
</script>
