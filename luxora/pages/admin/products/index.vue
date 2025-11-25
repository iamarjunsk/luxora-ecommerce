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
        showSnackbar('Failed to delete product', 'error')
    }
}
</script>
