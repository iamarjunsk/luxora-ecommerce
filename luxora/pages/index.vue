<template>
    <div class="bg-white">
        <!-- Hero Section -->
        <!-- Hero Section -->
        <section class="relative h-[85vh] flex items-center bg-[#F2F0EB] overflow-hidden">
            <div class="container mx-auto px-6 h-full flex flex-col md:flex-row items-center">
                <!-- Text Content (Left) -->
                <div class="w-full md:w-1/2 z-10 pt-20 md:pt-0 pr-0 md:pr-12">
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
                <div class="absolute right-0 top-0 h-full w-full md:w-1/2 overflow-hidden">
                    <NuxtImg src="/assets/hero-woman-face.png" alt="Luxora Jewelry" 
                        class="h-full w-full object-cover object-center"
                        width="960" height="1080" />
                </div>
            </div>
        </section>

        <!-- Categories -->
        <section v-if="categories && categories.length > 0" class="py-16 bg-white container mx-auto px-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="(category, index) in categories" :key="category.id"
                    class="relative group overflow-hidden h-[300px] cursor-pointer">
                    <NuxtImg :src="category.image || config.public.assets.placeholder.category" :alt="category.name"
                        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <h3 class="text-white text-xl md:text-2xl font-serif tracking-widest uppercase border-b-2 border-transparent group-hover:border-white pb-1 transition-all duration-300">
                            {{ category.name }}
                        </h3>
                    </div>
                </div>
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

        <!-- Newsletter / Bottom Bar -->
        <section class="py-12 bg-[#E5E5E5] border-t border-gray-200">
            <div class="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <!-- Left: Signup -->
                <div class="w-full md:w-1/2">
                    <h3 class="text-sm font-bold text-luxora-black mb-4">Email Signup for account</h3>
                    <form @submit.prevent="subscribe" class="flex max-w-md">
                        <input type="email" placeholder="Email address" required
                            class="flex-grow px-4 py-3 bg-white border border-transparent focus:border-luxora-black focus:outline-none text-sm" />
                        <button type="submit"
                            class="bg-black text-white px-6 py-3 text-sm font-bold hover:bg-gray-800 transition-colors duration-300">
                            Sign up
                        </button>
                    </form>
                    <p class="text-xs text-gray-500 mt-4">© 2024 Luxora.</p>
                </div>

                <!-- Right: Links & Socials -->
                <div class="w-full md:w-1/2 flex flex-col md:flex-row justify-end items-center gap-8">
                    <div class="flex gap-6 text-sm text-luxora-black font-medium">
                        <NuxtLink to="/account" class="hover:text-luxora-gold transition-colors">My Account</NuxtLink>
                        <NuxtLink to="/shipping-policy" class="hover:text-luxora-gold transition-colors">Shipping & Returns</NuxtLink>
                        <NuxtLink to="/contact" class="hover:text-luxora-gold transition-colors">Contact Us</NuxtLink>
                    </div>
                    
                    <!-- Social Icons -->
                    <div class="flex gap-4">
                        <a href="#" class="text-luxora-black hover:text-luxora-gold transition-colors">
                            <span class="sr-only">Facebook</span>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                            </svg>
                        </a>
                        <a href="#" class="text-luxora-black hover:text-luxora-gold transition-colors">
                            <span class="sr-only">Instagram</span>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.409-.06 3.809-.06zm0 1.838c-2.527 0-2.833.01-3.825.056-1.003.045-1.546.21-1.91.352a3.08 3.08 0 00-1.127.733c-.38.38-.63.75-.733 1.127-.142.363-.307.907-.352 1.91-.046.992-.056 1.298-.056 3.825 0 2.527.01 2.833.056 3.825.045 1.003.21 1.546.352 1.91.103.377.353.747.733 1.127.38.38.75.63 1.127.733.363.142.907.307 1.91.352.992.046 1.298.056 3.825.056 2.527 0 2.833-.01 3.825-.056 1.003-.045 1.546-.21 1.91-.352a3.08 3.08 0 001.127-.733c.38-.38.63-.75.733-1.127.142-.363.307-.907.352-1.91.046-.992.056-1.298.056-3.825 0-2.527-.01-2.833-.056-3.825-.045-1.003-.21-1.546-.352-1.91a3.08 3.08 0 00-.733-1.127 3.08 3.08 0 00-1.127-.733c-.363-.142-.907-.307-1.91-.352-.992-.046-1.298-.056-3.825-.056zm0 4.54a4.54 4.54 0 110 9.08 4.54 4.54 0 010-9.08zm0 1.838a2.702 2.702 0 100 5.404 2.702 2.702 0 000-5.404zm5.884-5.376a1.096 1.096 0 110 2.192 1.096 1.096 0 010-2.192z" clip-rule="evenodd" />
                            </svg>
                        </a>
                        <a href="#" class="text-luxora-black hover:text-luxora-gold transition-colors">
                            <span class="sr-only">Pinterest</span>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fill-rule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.173 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
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
