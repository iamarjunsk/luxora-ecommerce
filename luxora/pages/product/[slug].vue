<template>
    <div v-if="product" class="bg-white min-h-screen">
        <div class="container mx-auto px-6 py-12">
            <div class="flex flex-col lg:flex-row gap-12 lg:gap-24">
                <!-- Image Gallery (Left) -->
                <div class="w-full lg:w-3/5 flex flex-col gap-6">
                    <!-- Main Image -->
                    <div class="w-full bg-gray-50 aspect-[3/4] overflow-hidden relative group cursor-zoom-in" 
                        @click="isViewerOpen = true">
                        <NuxtImg :src="activeImage || config.public.assets.placeholder.product" :alt="product.name" 
                            class="w-full h-full object-cover object-center transition-transform duration-700" />
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                    </div>

                    <!-- Thumbnails -->
                    <div v-if="product.images && product.images.length > 1" class="grid grid-cols-4 gap-4">
                        <button v-for="(img, index) in product.images" :key="img.id" 
                            @click="activeImage = img.url"
                            class="aspect-[3/4] overflow-hidden border-2 transition-all duration-300"
                            :class="activeImage === img.url ? 'border-luxora-black opacity-100' : 'border-transparent opacity-70 hover:opacity-100'">
                            <NuxtImg :src="img.url" :alt="`${product.name} - Thumbnail ${index + 1}`" 
                                class="w-full h-full object-cover object-center" />
                        </button>
                    </div>
                </div>

                <!-- Details (Right - Sticky) -->
                <div class="w-full lg:w-2/5">
                    <div class="sticky top-24">
                        <div class="mb-8 border-b border-gray-100 pb-8">
                            <p class="text-sm text-gray-500 uppercase tracking-widest mb-3">{{ product.category }}</p>
                            <h1 class="text-3xl md:text-4xl lg:text-5xl font-serif text-luxora-black mb-4 leading-tight">{{ product.name }}</h1>
                            <p class="text-2xl font-medium text-gray-900">₹{{ product.price.toLocaleString() }}</p>
                        </div>

                        <div class="mb-8">
                            <p class="text-gray-600 leading-relaxed text-base font-light">
                                {{ product.description }}
                            </p>
                        </div>

                        <div class="flex flex-col gap-4 mb-8">
                            <div class="flex gap-4">
                                <div class="flex items-center border border-gray-200 w-32">
                                    <button @click="quantity > 1 ? quantity-- : null" 
                                        class="w-10 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors">-</button>
                                    <span class="flex-grow text-center font-medium">{{ quantity }}</span>
                                    <button @click="quantity++" 
                                        class="w-10 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors">+</button>
                                </div>
                                <button @click="wishlistStore.toggleWishlist(product)"
                                    class="border border-gray-200 w-12 h-12 flex items-center justify-center hover:border-luxora-black transition-colors duration-300 group">
                                    <HeartIcon class="h-6 w-6 transition-colors"
                                        :class="wishlistStore.isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400 group-hover:text-luxora-black'" />
                                </button>
                            </div>
                            
                            <button @click="addToCart"
                                class="w-full bg-luxora-black text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-luxora-gold hover:text-luxora-black transition-all duration-300">
                                [ Add to Bag ]
                            </button>
                        </div>

                        <div class="space-y-4 text-xs text-gray-500 uppercase tracking-wider border-t border-gray-100 pt-6">
                            <div class="flex items-center gap-3">
                                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                                In Stock & Ready to Ship
                            </div>
                            <div class="flex items-center gap-3">
                                <TruckIcon class="h-4 w-4" />
                                Free shipping on orders over ₹500
                            </div>
                            <div class="flex items-center gap-3">
                                <ShieldCheckIcon class="h-4 w-4" />
                                30-day money-back guarantee
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reviews Section -->
            <div class="mt-24 max-w-4xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-serif mb-4">Customer Reviews</h2>
                    <div v-if="reviewsData" class="flex items-center justify-center gap-2">
                        <StarRating :rating="reviewsData.averageRating" readonly size="md" />
                        <span class="text-gray-500 text-sm">Based on {{ reviewsData.totalReviews }} reviews</span>
                    </div>
                </div>

                <!-- Review Form -->
                <div v-if="canReview" class="bg-gray-50 p-8 mb-12">
                    <h3 class="font-serif text-xl mb-6">Write a Review</h3>
                    <form @submit.prevent="submitReview">
                        <div class="mb-6">
                            <label class="block text-xs font-bold uppercase tracking-wider mb-2">Rating</label>
                            <StarRating v-model:rating="newReview.rating" />
                        </div>
                        <div class="mb-6">
                            <label class="block text-xs font-bold uppercase tracking-wider mb-2">Review</label>
                            <textarea v-model="newReview.comment" rows="4"
                                class="w-full bg-white border-0 focus:ring-1 focus:ring-luxora-black p-4 text-sm"
                                placeholder="Share your thoughts..." required minlength="10"></textarea>
                        </div>
                        <button type="submit" :disabled="submittingReview || newReview.rating === 0"
                            class="bg-luxora-black text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-luxora-gold hover:text-luxora-black transition-colors duration-300 disabled:opacity-50">
                            {{ submittingReview ? 'Submitting...' : 'Submit Review' }}
                        </button>
                    </form>
                </div>

                <!-- Reviews List -->
                <div v-if="reviewsData && reviewsData.reviews.length > 0" class="space-y-8">
                    <div v-for="review in reviewsData.reviews" :key="review.id" class="border-b border-gray-100 pb-8">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <p class="font-bold text-sm uppercase tracking-wider mb-1">{{ review.user.name || 'Anonymous' }}</p>
                                <StarRating :rating="review.rating" readonly size="sm" />
                            </div>
                            <span class="text-xs text-gray-400">{{ new Date(review.createdAt).toLocaleDateString() }}</span>
                        </div>
                        <p class="text-gray-600 font-light leading-relaxed">{{ review.comment }}</p>
                    </div>
                </div>
                <div v-else-if="reviewsData" class="text-center py-12 text-gray-400 italic">
                    No reviews yet. Be the first to review this product.
                </div>
            </div>

            <!-- Related Products -->
            <div v-if="relatedProducts.length > 0" class="mt-24 border-t border-gray-200 pt-16">
                <h2 class="text-3xl font-serif mb-12 text-center">You May Also Like</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <ProductCard v-for="relatedProduct in relatedProducts" :key="relatedProduct.id"
                        :product="relatedProduct" />
                </div>
            </div>
        </div>
    </div>
    <div v-else class="container mx-auto px-6 py-32 text-center">
        <h1 class="text-3xl font-serif mb-6">Product Not Found</h1>
        <NuxtLink to="/shop" class="inline-block border-b border-luxora-black pb-1 text-sm font-bold uppercase tracking-widest hover:text-luxora-gold hover:border-luxora-gold transition-all">
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
const selectedSize = ref(null)
const isViewerOpen = ref(false)

// Initialize active image
watchEffect(() => {
    if (product.value && product.value.images && product.value.images.length > 0) {
        activeImage.value = product.value.images[0].url
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
