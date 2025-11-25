<template>
    <div v-if="product" class="container mx-auto px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <!-- Image Gallery -->
            <div class="flex flex-col gap-4">
                <div class="bg-white border border-gray-100 p-4 aspect-square overflow-hidden cursor-zoom-in"
                    @click="isViewerOpen = true">
                    <NuxtImg :src="activeImage" :alt="product.name" class="w-full h-full object-cover object-center" />
                </div>
                <div v-if="product.images && product.images.length > 1" class="flex gap-4 overflow-x-auto pb-2">
                    <button v-for="img in product.images" :key="img.id" @click="activeImage = img.url"
                        class="w-20 h-20 flex-shrink-0 border-2 transition-colors duration-200 overflow-hidden"
                        :class="activeImage === img.url ? 'border-luxora-gold' : 'border-transparent hover:border-gray-200'">
                        <NuxtImg :src="img.url" :alt="product.name" class="w-full h-full object-cover" />
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
                    <button @click="wishlistStore.toggleWishlist(product)"
                        class="border border-gray-300 p-3 hover:border-luxora-gold transition-colors duration-300">
                        <HeartIcon class="h-6 w-6"
                            :class="wishlistStore.isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'" />
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

        <!-- Reviews Section -->
        <div class="mt-16 border-t border-gray-200 pt-12">
            <h2 class="text-2xl font-serif mb-2">Customer Reviews</h2>
            <div v-if="reviewsData" class="flex items-center gap-4 mb-8">
                <StarRating :rating="reviewsData.averageRating" readonly size="lg" />
                <span class="text-xl font-medium">{{ reviewsData.averageRating.toFixed(1) }}</span>
                <span class="text-gray-500">({{ reviewsData.totalReviews }} {{ reviewsData.totalReviews === 1 ? 'review'
                    : 'reviews' }})</span>
            </div>

            <!-- Review Form (Verified Buyers Only) -->
            <div v-if="canReview" class="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 class="text-lg font-semibold mb-4">Write a Review</h3>
                <form @submit.prevent="submitReview">
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-2">Your Rating</label>
                        <StarRating v-model:rating="newReview.rating" />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-2">Your Review</label>
                        <textarea v-model="newReview.comment" rows="4"
                            class="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-luxora-gold"
                            placeholder="Share your thoughts about this product..." required minlength="10"></textarea>
                    </div>
                    <button type="submit" :disabled="submittingReview || newReview.rating === 0"
                        class="bg-luxora-black text-white px-6 py-2 font-bold tracking-widest hover:bg-luxora-gold hover:text-luxora-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        {{ submittingReview ? 'Submitting...' : 'Submit Review' }}
                    </button>
                </form>
            </div>

            <!-- Reviews List -->
            <div v-if="reviewsData && reviewsData.reviews.length > 0" class="space-y-6">
                <div v-for="review in reviewsData.reviews" :key="review.id" class="border-b border-gray-100 pb-6">
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-10 h-10 bg-luxora-gold text-luxora-black rounded-full flex items-center justify-center font-bold">
                                {{ review.user.name?.charAt(0) || 'U' }}
                            </div>
                            <div>
                                <p class="font-medium">{{ review.user.name || 'Anonymous' }}</p>
                                <StarRating :rating="review.rating" readonly size="sm" />
                            </div>
                        </div>
                        <span class="text-sm text-gray-500">{{ new Date(review.createdAt).toLocaleDateString() }}</span>
                    </div>
                    <p class="text-gray-700 mt-3">{{ review.comment }}</p>
                </div>
            </div>
            <div v-else-if="reviewsData" class="text-center py-12 text-gray-500">
                <p>No reviews yet. Be the first to review this product!</p>
            </div>
        </div>

        <!-- Related Products -->
        <div v-if="relatedProducts.length > 0" class="mt-16">
            <h2 class="text-2xl font-serif mb-8 text-center">You May Also Like</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <ProductCard v-for="relatedProduct in relatedProducts" :key="relatedProduct.id"
                    :product="relatedProduct" />
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
