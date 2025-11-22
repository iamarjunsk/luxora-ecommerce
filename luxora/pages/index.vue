<template>
    <div>
        <!-- Hero Section -->
        <section class="relative h-[80vh] flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0">
                <img src="/assets/images/hero.png" alt="Luxora Jewelry" class="h-full w-full object-cover" />
                <div class="absolute inset-0 bg-black/40"></div>
            </div>
            <div class="relative text-center text-white px-6 max-w-4xl mx-auto">
                <h1 class="text-5xl md:text-7xl font-serif mb-6 leading-tight animate-fade-in-up">
                    Timeless Elegance <br /> <span class="text-luxora-gold">Redefined</span>
                </h1>
                <p class="text-lg md:text-xl mb-10 font-light tracking-wide text-gray-200 max-w-2xl mx-auto">
                    Discover our exclusive collection of handcrafted jewelry for men and women.
                </p>
                <NuxtLink to="/shop"
                    class="inline-block bg-luxora-gold text-luxora-black px-10 py-4 font-bold tracking-widest hover:bg-white transition-colors duration-300">
                    SHOP COLLECTION
                </NuxtLink>
            </div>
        </section>

        <!-- Featured Collection -->
        <section class="py-20 container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-serif mb-4">Featured Pieces</h2>
                <div class="w-24 h-1 bg-luxora-gold mx-auto"></div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
            </div>
        </section>

        <!-- Categories -->
        <section class="grid grid-cols-1 md:grid-cols-2 h-[600px]">
            <div class="relative group overflow-hidden">
                <img src="/assets/images/mens-chain.png" alt="Men's Collection"
                    class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div
                    class="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                    <div class="text-center">
                        <h3 class="text-4xl font-serif text-white mb-4">For Him</h3>
                        <NuxtLink to="/shop?category=Men"
                            class="inline-block border-b-2 border-luxora-gold text-white pb-1 hover:text-luxora-gold transition">
                            View Collection
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div class="relative group overflow-hidden">
                <img src="/assets/images/womens-necklace.png" alt="Women's Collection"
                    class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div
                    class="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                    <div class="text-center">
                        <h3 class="text-4xl font-serif text-white mb-4">For Her</h3>
                        <NuxtLink to="/shop?category=Women"
                            class="inline-block border-b-2 border-luxora-gold text-white pb-1 hover:text-luxora-gold transition">
                            View Collection
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useProductStore } from '~/stores/products'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const { featuredProducts } = storeToRefs(productStore)
</script>

<style scoped>
.animate-fade-in-up {
    animation: fadeInUp 1s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
