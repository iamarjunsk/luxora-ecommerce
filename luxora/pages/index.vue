<template>
    <div class="bg-white">
        <!-- Hero Section -->
        <!-- Hero Section -->
        <!-- Hero Section -->
        <section class="relative min-h-[85vh] flex items-center bg-[#F2F0EB] overflow-hidden">
            <div class="container mx-auto px-6 h-full flex flex-col md:flex-row items-center pt-24 md:pt-0">
                <!-- Text Content (Left) -->
                <div class="w-full md:w-1/2 z-10 pr-0 md:pr-12 mb-12 md:mb-0 text-center md:text-left">
                    <h1 class="text-5xl md:text-6xl lg:text-7xl font-serif text-luxora-black mb-6 leading-tight animate-fade-in-up">
                        Effortless Essentials <br />
                        for the Modern Day.
                    </h1>
                    <p class="text-lg text-gray-600 mb-10 animate-fade-in-up delay-100">
                        Discover the new season drop.
                    </p>
                    <div class="animate-fade-in-up delay-200">
                        <NuxtLink to="/shop"
                            class="inline-block bg-[#C18C7E] text-white px-8 py-3 text-sm font-bold tracking-widest hover:bg-[#A67568] transition-colors duration-300 uppercase">
                            [ Shop New Arrivals ]
                        </NuxtLink>
                    </div>
                </div>
                
                <!-- Image Content (Right) -->
                <div class="w-full md:w-1/2 h-[50vh] md:h-full md:absolute md:right-0 md:top-0 overflow-hidden">
                    <NuxtImg src="/assets/hero-woman-face.png" alt="Luxora Jewelry" 
                        class="h-full w-full object-cover object-top md:object-center"
                        width="960" height="1080" />
                </div>
            </div>
        </section>

        <!-- Categories -->
        <section v-if="categories && categories.length > 0" class="py-16 bg-white container mx-auto px-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <NuxtLink v-for="(category, index) in categories" :key="category.id"
                    :to="`/shop?category=${encodeURIComponent(category.name)}`"
                    class="relative group overflow-hidden h-[300px] cursor-pointer block">
                    <NuxtImg :src="category.image || config.public.assets.placeholder.category" :alt="category.name"
                        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <h3 class="text-white text-xl md:text-2xl font-serif tracking-widest uppercase border-b-2 border-transparent group-hover:border-white pb-1 transition-all duration-300">
                            {{ category.name }}
                        </h3>
                    </div>
                </NuxtLink>
            </div>
        </section>

        <!-- The Weekly Edit (Featured) -->
        <section class="py-24 bg-white">
            <div class="container mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-serif mb-4">The Weekly Edit</h2>
                    <p class="text-gray-600">Our most coveted pieces right now.</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
                </div>
            </div>
        </section>

        <!-- Date Night Ready Banner -->
        <section class="bg-[#F2F0EB]">
            <div class="grid grid-cols-1 md:grid-cols-2">
                <!-- Image Left -->
                <div class="h-[500px] md:h-[600px]">
                    <NuxtImg src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop" 
                        alt="Date Night Ready" 
                        class="h-full w-full object-cover" />
                </div>
                <!-- Text Right -->
                <div class="flex flex-col justify-center items-start p-12 md:p-24">
                    <h2 class="text-4xl md:text-5xl font-serif mb-6">Date Night Ready</h2>
                    <p class="text-lg text-gray-600 mb-8 max-w-md">
                        From sleek dresses to the finishing sparkle. Curated looks for your evening plans.
                    </p>
                    <NuxtLink to="/shop?collection=date-night"
                        class="text-luxora-black font-bold tracking-widest uppercase text-sm border-b-2 border-luxora-black pb-1 hover:text-luxora-gold hover:border-luxora-gold transition-colors duration-300">
                        [ Shop The Occasion Edit ]
                    </NuxtLink>
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
                        <NuxtImg src="https://i.pravatar.cc/150?img=32" alt="Customer"
                            class="w-full h-full object-cover" />
                    </div>
                    <div class="text-left">
                        <p class="font-bold text-luxora-gold">Sarah Jenkins</p>
                        <p class="text-sm text-gray-400">Verified Buyer</p>
                    </div>
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
await useAsyncData('featured-products', async () => {
    await productStore.fetchProducts({ featured: true, limit: 4 })
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
