<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-serif font-bold">Products</h1>
            <NuxtLink to="/admin/products/create"
                class="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                Add Product
            </NuxtLink>
        </div>

        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Featured
                        </th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="product in products" :key="product.id">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <NuxtImg :src="product.images?.[0]?.url || 'https://placehold.co/100'" alt=""
                                class="h-10 w-10 rounded-full object-cover" />
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                            <div class="text-sm text-gray-500">{{ product.category }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">₹{{ product.price.toFixed(2) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ product.stock }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button @click="toggleFeatured(product)"
                                :class="product.isFeatured ? 'text-yellow-500' : 'text-gray-300'"
                                class="hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </button>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <NuxtLink :to="`/admin/products/edit/${product.id}`"
                                class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</NuxtLink>
                            <button @click="deleteProduct(product.id)"
                                class="text-red-600 hover:text-red-900">Delete</button>
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

const { data: products, refresh } = await useFetch('/api/products')
const { showSnackbar } = useSnackbar()

async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
        await $fetch(`/api/products/${id}`, { method: 'DELETE' })
        refresh()
        showSnackbar('Product deleted successfully', 'success')
    } catch (e) {
    }
}

async function toggleFeatured(product) {
    try {
        const newValue = !product.isFeatured

        // Optimistic update
        const index = products.value.findIndex(p => p.id === product.id)
        if (index !== -1) {
            // Create a new object to force reactivity
            const updatedProduct = { ...products.value[index], isFeatured: newValue }
            // Update the array at index
            products.value[index] = updatedProduct
            // Trigger array update (optional but safe)
            products.value = [...products.value]
        }

        await $fetch(`/api/products/${product.id}`, {
            method: 'PUT',
            body: { isFeatured: newValue }
        })
        showSnackbar(newValue ? 'Product marked as featured' : 'Product removed from featured', 'success')
    } catch (e) {
        // Revert on failure
        refresh() // Safest fallback
        showSnackbar('Failed to update featured status', 'error')
    }
}
</script>
