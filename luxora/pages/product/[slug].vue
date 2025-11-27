<template>
    <div v-if="product" class="bg-white min-h-screen font-sans text-luxora-black">
        <!-- Breadcrumbs -->
        <div class="container mx-auto px-6 py-4 text-xs uppercase tracking-widest text-gray-500">
            <NuxtLink to="/" class="hover:text-luxora-gold transition-colors">Home</NuxtLink>
            <span class="mx-2">/</span>
            <NuxtLink to="/shop" class="hover:text-luxora-gold transition-colors">Shop</NuxtLink>
            <span class="mx-2">/</span>
            <span class="text-luxora-black font-medium">{{ product.category }}</span>
        </div>

        <div class="container mx-auto px-6 pt-4 pb-24">
            <div class="flex flex-col lg:flex-row gap-12 lg:gap-20">
                <!-- Image Gallery (Left) -->
                <div class="w-full lg:w-3/5">
                    <!-- Mobile Carousel (Hidden on Desktop) -->
                    <div v-if="product.images && product.images.length > 0"
                        class="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:hidden">
                        <div v-for="(img, index) in product.images" :key="img.id"
                            class="min-w-full snap-center bg-gray-50 aspect-[3/4] overflow-hidden relative">
                            <NuxtImg :src="img.url" :alt="`${product.name} - View ${index + 1}`"
                                class="w-full h-full object-cover object-center" />
                        </div>
                    </div>

                    <!-- Desktop Gallery (Hidden on Mobile) -->
                    <div class="hidden lg:flex flex-col gap-4">
                        <!-- Main Image -->
                        <div class="w-full bg-gray-50 aspect-[3/4] overflow-hidden relative group cursor-zoom-in">
                            <NuxtImg :src="activeImage || product.images?.[0]?.url" :alt="product.name"
                                class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <!-- Thumbnails -->
                        <div v-if="product.images && product.images.length > 1" class="grid grid-cols-5 gap-4">
                            <button v-for="(img, index) in product.images" :key="img.id" @click="activeImage = img.url"
                                class="aspect-[3/4] overflow-hidden border-2 transition-all duration-300"
                                :class="activeImage === img.url ? 'border-luxora-black opacity-100' : 'border-transparent opacity-70 hover:opacity-100'">
                                <NuxtImg :src="img.url" :alt="`${product.name} - Thumbnail ${index + 1}`"
                                    class="w-full h-full object-cover object-center" />
                            </button>
                        </div>
                    </div>

                    <div v-if="(!product.images || product.images.length === 0)"
                        class="w-full bg-gray-50 aspect-[3/4] overflow-hidden relative">
                        <NuxtImg :src="config.public.assets.placeholder.product" :alt="product.name"
                            class="w-full h-full object-cover object-center" />
                    </div>

                    <!-- Mobile Dots Indicator -->
                    <div v-if="product.images && product.images.length > 1"
                        class="flex justify-center gap-2 mt-4 lg:hidden">
                        <div v-for="(img, index) in product.images" :key="index"
                            class="w-1.5 h-1.5 rounded-full bg-gray-300 transition-colors"
                            :class="{ 'bg-luxora-black': activeImageIndex === index }"></div>
                    </div>
                </div>

                <!-- Details (Right - Sticky) -->
                <div class="w-full lg:w-2/5 relative">
                    <div class="sticky top-8 space-y-8">
                        <!-- Header -->
                        <div class="border-b border-gray-100 pb-6">
                            <h2 class="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">{{
                                product.category }}</h2>
                            <h1
                                class="text-3xl md:text-4xl lg:text-5xl font-serif text-luxora-black mb-4 leading-tight">
                                {{ product.name }}</h1>
                            <div class="flex items-center justify-between">
                                <p class="text-2xl font-medium text-gray-900">₹{{ product.price.toLocaleString() }}</p>
                                <div class="flex items-center gap-1" v-if="reviewsData?.averageRating">
                                    <StarRating :rating="reviewsData.averageRating" readonly size="sm" />
                                    <span class="text-xs text-gray-500 ml-2">({{ reviewsData.totalReviews }})</span>
                                </div>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="space-y-4">
                            <div class="flex gap-4">
                                <!-- Quantity -->
                                <div class="flex items-center border border-gray-200 w-32 h-14">
                                    <button @click="quantity > 1 ? quantity-- : null"
                                        class="w-10 h-full flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500">-</button>
                                    <span class="flex-grow text-center font-medium">{{ quantity }}</span>
                                    <button @click="quantity++"
                                        class="w-10 h-full flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500">+</button>
                                </div>
                                <!-- Wishlist -->
                                <button @click="wishlistStore.toggleWishlist(product)"
                                    class="border border-gray-200 w-14 h-14 flex items-center justify-center hover:border-luxora-black transition-colors duration-300 group">
                                    <HeartIcon class="h-6 w-6 transition-colors"
                                        :class="wishlistStore.isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400 group-hover:text-luxora-black'" />
                                </button>
                            </div>

                            <button @click="addToCart"
                                class="w-full bg-luxora-black text-white h-14 text-sm font-bold tracking-[0.2em] uppercase hover:bg-luxora-gold hover:text-luxora-black transition-all duration-300 shadow-lg hover:shadow-xl">
                                Add to Bag
                            </button>

                            <p class="text-xs text-center text-gray-500 mt-2">Free shipping on all orders over ₹500</p>
                        </div>

                        <!-- Accordions -->
                        <div class="border-t border-gray-200 pt-2">
                            <!-- Description -->
                            <div class="border-b border-gray-200">
                                <button @click="toggleSection('description')"
                                    class="w-full py-4 flex justify-between items-center text-left group">
                                    <span
                                        class="font-serif text-lg text-gray-900 group-hover:text-luxora-gold transition-colors">Description</span>
                                    <span class="text-xl font-light text-gray-400 transition-transform duration-300"
                                        :class="{ 'rotate-45': openSections.description }">+</span>
                                </button>
                                <div v-show="openSections.description"
                                    class="pb-6 text-gray-600 font-light leading-relaxed text-sm">
                                    {{ product.description }}
                                </div>
                            </div>

                            <!-- Shipping & Returns -->
                            <div class="border-b border-gray-200">
                                <button @click="toggleSection('shipping')"
                                    class="w-full py-4 flex justify-between items-center text-left group">
                                    <span
                                        class="font-serif text-lg text-gray-900 group-hover:text-luxora-gold transition-colors">Shipping
                                        & Returns</span>
                                    <span class="text-xl font-light text-gray-400 transition-transform duration-300"
                                        :class="{ 'rotate-45': openSections.shipping }">+</span>
                                </button>
                                <div v-show="openSections.shipping"
                                    class="pb-6 text-gray-600 font-light leading-relaxed text-sm space-y-2">
                                    <p><strong>Shipping:</strong> Free standard shipping on orders over ₹500. Estimated
                                        delivery: 3-5 business days.</p>
                                    <p><strong>Returns:</strong> We accept returns within 30 days of delivery. Items
                                        must be unworn and in original packaging.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reviews Section (Full Width) -->
            <div class="mt-32 max-w-4xl mx-auto border-t border-gray-200 pt-16">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-serif mb-4">Customer Reviews</h2>
                    <div v-if="reviewsData" class="flex items-center justify-center gap-2">
                        <StarRating :rating="reviewsData.averageRating" readonly size="md" />
                        <span class="text-gray-500 text-sm tracking-wide">{{ reviewsData.totalReviews }} Reviews</span>
                    </div>
                </div>

                <div class="grid md:grid-cols-3 gap-12">
                    <!-- Review Form -->
                    <div class="md:col-span-1">
                        <div v-if="canReview" class="bg-gray-50 p-8 sticky top-8">
                            <h3 class="font-serif text-xl mb-6">Write a Review</h3>
                            <form @submit.prevent="submitReview">
                                <div class="mb-6">
                                    <label class="block text-xs font-bold uppercase tracking-wider mb-2">Rating</label>
                                    <StarRating v-model:rating="newReview.rating" />
                                </div>
                                <div class="mb-6">
                                    <label class="block text-xs font-bold uppercase tracking-wider mb-2">Review</label>
                                    <textarea v-model="newReview.comment" rows="4"
                                        class="w-full bg-white border border-gray-200 focus:border-luxora-black focus:ring-0 p-4 text-sm transition-colors"
                                        placeholder="Share your thoughts..." required minlength="10"></textarea>
                                </div>
                                <button type="submit" :disabled="submittingReview || newReview.rating === 0"
                                    class="w-full bg-luxora-black text-white py-3 text-xs font-bold tracking-widest uppercase hover:bg-luxora-gold hover:text-luxora-black transition-colors duration-300 disabled:opacity-50">
                                    {{ submittingReview ? 'Submitting...' : 'Submit' }}
                                </button>
                            </form>
                        </div>
                        <div v-else class="bg-gray-50 p-8 text-center">
                            <p class="text-sm text-gray-500">Please <NuxtLink to="/login"
                                    class="text-luxora-gold underline">login</NuxtLink> or purchase this item to leave a
                                review.</p>
                        </div>
                    </div>

                    <!-- Reviews List -->
                    <div class="md:col-span-2 space-y-10">
                        <div v-if="reviewsData && reviewsData.reviews.length > 0">
                            <div v-for="review in reviewsData.reviews" :key="review.id"
                                class="border-b border-gray-100 pb-10 last:border-0">
                                <div class="flex justify-between items-start mb-4">
                                    <div>
                                        <p class="font-bold text-sm uppercase tracking-wider mb-2">{{ review.user.name
                                            || 'Anonymous' }}</p>
                                        <StarRating :rating="review.rating" readonly size="sm" />
                                    </div>
                                    <span class="text-xs text-gray-400 font-mono">{{ new
                                        Date(review.createdAt).toLocaleDateString() }}</span>
                                </div>
                                <p class="text-gray-600 font-light leading-relaxed">{{ review.comment }}</p>
                            </div>
                        </div>
                        <div v-else class="text-center py-12 text-gray-400 italic bg-gray-50 rounded-lg">
                            No reviews yet. Be the first to review this product.
                        </div>
                    </div>
                </div>
            </div>

            <!-- Related Products -->
            <div v-if="relatedProducts.length > 0" class="mt-32 border-t border-gray-200 pt-16">
                <h2 class="text-3xl font-serif mb-12 text-center">You May Also Like</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    <ProductCard v-for="relatedProduct in relatedProducts" :key="relatedProduct.id"
                        :product="relatedProduct" />
                </div>
            </div>
        </div>
    </div>
    <div v-else class="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 class="text-4xl font-serif mb-6 text-luxora-black">Product Not Found</h1>
        <NuxtLink to="/shop"
            class="text-sm font-bold uppercase tracking-widest border-b-2 border-luxora-gold pb-1 hover:text-luxora-gold transition-colors">
            Return to Shop
        </NuxtLink>
    </div>
</template>

<script setup>
import { useProductStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import { storeToRefs } from 'pinia'
import { HeartIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const config = useRuntimeConfig()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const { showSnackbar } = useSnackbar()

// Fetch product by slug
const { data: product, error } = await useFetch(`/api/products/${route.params.slug}`)

if (error.value || !product.value) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

const quantity = ref(1)
const activeImage = ref(product.value.images?.[0]?.url || '')
const activeImageIndex = ref(0)
const openSections = ref({
    description: true,
    shipping: false
})

const toggleSection = (section) => {
    openSections.value[section] = !openSections.value[section]
}

// Update active index on scroll (for mobile dots)
onMounted(() => {
    const gallery = document.querySelector('.snap-x')
    if (gallery) {
        gallery.addEventListener('scroll', () => {
            const scrollLeft = gallery.scrollLeft
            const width = gallery.offsetWidth
            activeImageIndex.value = Math.round(scrollLeft / width)
        })
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

// Fetch related products from the same category
const { data: relatedProductsData } = await useFetch('/api/products', {
    query: {
        category: product.value.category,
        limit: 4
    }
})

// Filter out the current product from related products
const relatedProducts = computed(() => {
    if (!relatedProductsData.value) return []
    return relatedProductsData.value.filter(p => p.id !== product.value?.id).slice(0, 4)
})

// Reviews functionality
const { data: reviewsData, refresh: refreshReviews } = await useFetch(`/api/reviews/${product.value.id}`)

const newReview = ref({
    rating: 0,
    comment: ''
})

const submittingReview = ref(false)
const canReview = ref(false)

// Check if user can review (has purchased the product)
const checkCanReview = () => {
    const { user } = useAuth()
    // Show form to logged-in users, API will handle verification
    canReview.value = !!user.value
}

onMounted(() => {
    checkCanReview()
})

const submitReview = async () => {
    if (newReview.value.rating === 0) {
        showSnackbar('Please select a rating', 'error')
        return
    }

    submittingReview.value = true
    try {
        await $fetch(`/api/reviews/${product.value.id}`, {
            method: 'POST',
            body: {
                rating: newReview.value.rating,
                comment: newReview.value.comment
            }
        })

        showSnackbar('Review submitted successfully!', 'success')
        newReview.value = { rating: 0, comment: '' }
        await refreshReviews()
    } catch (error) {
        const message = error.data?.statusMessage || 'Failed to submit review'
        showSnackbar(message, 'error')
    } finally {
        submittingReview.value = false
    }
}
</script>
