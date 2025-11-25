<template>
    <div class="bg-luxora-cream">
        <!-- Hero Section -->
        <section class="relative h-screen flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0">
                <NuxtImg :src="config.public.assets.hero" alt="Luxora Jewelry" class="h-full w-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
            </div>
            <div class="relative text-center text-white px-6 max-w-5xl mx-auto z-10">
                <span
                    class="block text-luxora-gold tracking-[0.2em] text-sm md:text-base mb-4 uppercase animate-fade-in">
                    Est. 2024
                </span>
                <h1 class="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-tight animate-fade-in-up">
                    Timeless Elegance <br /> <span class="italic text-luxora-gold">Redefined</span>
                </h1>
                <p
                    class="text-lg md:text-xl mb-12 font-light tracking-wide text-gray-200 max-w-2xl mx-auto animate-fade-in-up delay-100">
                    Discover our exclusive collection of premium jewelry, curated to elevate every moment.
                </p>
                <div class="flex flex-col md:flex-row gap-4 justify-center animate-fade-in-up delay-200">
                    <NuxtLink to="/shop"
                        class="inline-block bg-luxora-gold text-luxora-black px-10 py-4 font-bold tracking-widest hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                        SHOP COLLECTION
                    </NuxtLink>
                    <NuxtLink to="/about"
                        class="inline-block border border-white text-white px-10 py-4 font-bold tracking-widest hover:bg-white hover:text-luxora-black transition-all duration-300 transform hover:-translate-y-1">
                        OUR STORY
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- Trust Signals -->
        <section class="py-16 bg-white border-b border-gray-100">
            <div class="container mx-auto px-6">
                <div
                    class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <div class="p-4">
                        <ShieldCheckIcon class="h-10 w-10 text-luxora-gold mx-auto mb-4" />
                        <h3 class="text-lg font-serif font-bold mb-2">Curated Selection</h3>
                        <p class="text-gray-500 text-sm">Hand-picked designs for the modern lifestyle.</p>
                    </div>
                    <div class="p-4">
                        <TruckIcon class="h-10 w-10 text-luxora-gold mx-auto mb-4" />
                        <h3 class="text-lg font-serif font-bold mb-2">Global Shipping</h3>
                        <p class="text-gray-500 text-sm">Delivered securely to your doorstep.</p>
                    </div>
                    <div class="p-4">
                        <SparklesIcon class="h-10 w-10 text-luxora-gold mx-auto mb-4" />
                        <h3 class="text-lg font-serif font-bold mb-2">Quality Assurance</h3>
                        <p class="text-gray-500 text-sm">Premium quality checks on every order.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Categories -->
        <section v-if="categories && categories.length > 0" class="py-24 container mx-auto px-6">
            <div class="text-center mb-16">
                <span class="text-luxora-gold text-sm tracking-widest uppercase font-bold">Collections</span>
                <h2 class="text-4xl md:text-5xl font-serif mt-2 mb-6">Explore by Category</h2>
                <div class="w-24 h-1 bg-luxora-gold mx-auto"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(category, index) in categories" :key="category.id"
                    :class="['relative group overflow-hidden h-[350px] cursor-pointer', index === 0 ? 'md:col-span-2 lg:col-span-2' : '']">
                    <NuxtImg :src="category.image || config.public.assets.placeholder.category" :alt="category.name"
                        class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    </div>
                    <div class="absolute bottom-0 left-0 p-8 w-full">
                        <h3
                            class="text-3xl font-serif text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            {{ category.name }}</h3>
                        <NuxtLink :to="`/shop?category=${category.name}`"
                            class="inline-block text-luxora-gold text-sm tracking-widest uppercase font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                            View Collection &rarr;
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Collection -->
        <section class="py-24 bg-white">
            <div class="container mx-auto px-6">
                <div class="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div class="text-center md:text-left mb-8 md:mb-0">
                        <span class="text-luxora-gold text-sm tracking-widest uppercase font-bold">Curated For
                            You</span>
                        <h2 class="text-4xl md:text-5xl font-serif mt-2">Featured Pieces</h2>
                    </div>
                    <NuxtLink to="/shop"
                        class="text-luxora-black border-b border-luxora-black pb-1 hover:text-luxora-gold hover:border-luxora-gold transition-colors">
                        View All Products
                    </NuxtLink>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
                </div>
            </div>
        </section>

        <!-- Testimonials -->
        <section class="py-24 bg-luxora-charcoal text-white relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg width="100%" height="100%">
                    <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" class="text-white" fill="currentColor" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#pattern-circles)" />
                </svg>
            </div>
            <div class="container mx-auto px-6 relative z-10 text-center">
                <StarIcon class="h-8 w-8 text-luxora-gold mx-auto mb-6" />
                <h2 class="text-3xl md:text-4xl font-serif mb-12">"Absolutely stunning craftsmanship. <br /> The
                    attention to detail is remarkable."</h2>
                <div class="flex justify-center items-center gap-4">
                    <div class="w-12 h-12 bg-gray-600 rounded-full overflow-hidden">
                        <NuxtImg src="https://i.pravatar.cc/150?img=32" alt="Customer" class="w-full h-full object-cover" />
                    </div>
                    <div class="text-left">
                        <p class="font-bold text-luxora-gold">Sarah Jenkins</p>
                        <p class="text-sm text-gray-400">Verified Buyer</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Newsletter -->
        <section class="py-24 container mx-auto px-6">
            <div class="bg-luxora-gold/10 p-12 md:p-20 text-center rounded-2xl relative overflow-hidden">
                <div class="relative z-10 max-w-2xl mx-auto">
                    <h2 class="text-3xl md:text-4xl font-serif mb-4">Join the Luxora Family</h2>
                    <p class="text-gray-600 mb-8">Subscribe to receive updates, access to exclusive deals, and more.</p>
                    <form @submit.prevent="subscribe" class="flex flex-col md:flex-row gap-4">
                        <input type="email" placeholder="Enter your email address" required
                            class="flex-grow px-6 py-4 bg-white border border-transparent focus:border-luxora-gold focus:outline-none rounded-none" />
                        <button type="submit"
                            class="bg-luxora-black text-white px-10 py-4 font-bold tracking-widest hover:bg-luxora-gold hover:text-luxora-black transition-colors duration-300">
                            SUBSCRIBE
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useProductStore } from '~/stores/products'
import { storeToRefs } from 'pinia'
import { ShieldCheckIcon, TruckIcon, SparklesIcon, StarIcon } from '@heroicons/vue/24/outline'
import { useSnackbar } from '~/composables/useSnackbar'

const config = useRuntimeConfig()
const { showSnackbar } = useSnackbar()
const productStore = useProductStore()
const { featuredProducts } = storeToRefs(productStore)
const { data: categories } = await useFetch('/api/categories')

// Fetch products
await useAsyncData('products', async () => {
    await productStore.fetchProducts()
    return true
})

const subscribe = () => {
    showSnackbar('Thank you for subscribing!', 'success')
}
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 1.5s ease-out forwards;
    opacity: 0;
}

.animate-fade-in-up {
    animation: fadeInUp 1s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
}

.delay-100 {
    animation-delay: 0.2s;
}

.delay-200 {
    animation-delay: 0.4s;
}

@keyframes fadeIn {
    to {
        opacity: 1;
    }
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
