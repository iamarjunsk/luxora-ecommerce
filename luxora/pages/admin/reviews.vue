<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-serif font-bold">Reviews</h1>
        </div>

        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rating
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Review
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="review in reviews" :key="review.id">
                        <td class="px-6 py-4">
                            <NuxtLink :to="`/product/${review.product.slug}`"
                                class="text-sm font-medium text-luxora-gold hover:underline">
                                {{ review.product.name }}
                            </NuxtLink>
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm font-medium text-gray-900">{{ review.user.name }}</div>
                            <div class="text-sm text-gray-500">{{ review.user.email }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <StarRating :rating="review.rating" readonly size="sm" />
                        </td>
                        <td class="px-6 py-4">
                            <p class="text-sm text-gray-700 line-clamp-2">{{ review.comment }}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">{{ new Date(review.createdAt).toLocaleDateString() }}
                            </div>
                        </td>
                    </tr>
                    <tr v-if="reviews.length === 0">
                        <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
                            No reviews found.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: 'auth'
})

const { data: reviews } = await useFetch('/api/admin/reviews')
</script>
