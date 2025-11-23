<template>
    <div v-if="product" class="container mx-auto px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <!-- Image Gallery -->
            <div class="flex flex-col gap-4">
                <div class="bg-white border border-gray-100 p-4 aspect-square overflow-hidden cursor-zoom-in"
                    @click="isViewerOpen = true">
                    <img :src="activeImage" :alt="product.name" class="w-full h-full object-cover object-center" />
                </div>
                <div v-if="product.images && product.images.length > 1" class="flex gap-4 overflow-x-auto pb-2">
                    <button v-for="img in product.images" :key="img.id" @click="activeImage = img.url"
                        class="w-20 h-20 flex-shrink-0 border-2 transition-colors duration-200 overflow-hidden"
                        :class="activeImage === img.url ? 'border-luxora-gold' : 'border-transparent hover:border-gray-200'">
                        <img :src="img.url" :alt="product.name" class="w-full h-full object-cover" />
                    </button>
                </div>
            </div>

            <!-- Details -->
            <div class="flex flex-col justify-center">
                <p class="text-sm text-luxora-gray uppercase tracking-wider mb-2">{{ product.category }}</p>
                <h1 class="text-4xl md:text-5xl font-serif text-luxora-black mb-4">{{ product.name }}</h1>
                <p class="text-2xl font-medium text-luxora-gold mb-8">₹{{ product.price.toLocaleString() }}</p>

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
                    <p>Free shipping on orders over ₹500.</p>
                    <p>30-day money-back guarantee.</p>
                </div>
            </div>
        </div>

        <!-- Image Viewer -->
        <ImageViewer :is-open="isViewerOpen" :image-url="activeImage" @close="isViewerOpen = false" />
    </div>
    <div v-else class="container mx-auto px-6 py-20 text-center">
        <h1 class="text-2xl font-serif mb-4">Product Not Found</h1>
        <NuxtLink to="/shop" class="text-luxora-gold hover:underline">Return to Shop</NuxtLink>
    </div>
</template>

<script setup>
import { useProductStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'
import { storeToRefs } from 'pinia'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const { showSnackbar } = useSnackbar()

const { currentProduct: product, loading } = storeToRefs(productStore)

// Fetch product details
await useAsyncData(`product-${route.params.id}`, async () => {
    await productStore.fetchProduct(route.params.id)
    return true
})

const quantity = ref(1)
const activeImage = ref('')
const isViewerOpen = ref(false)

// Initialize active image
watchEffect(() => {
    if (product.value) {
        activeImage.value = product.value.image || ''
    }
})

const addToCart = () => {
    if (product.value) {
        for (let i = 0; i < quantity.value; i++) {
            cartStore.addToCart(product.value)
        }
        showSnackbar('Added to cart successfully!', 'success')
    }
}
</script>
