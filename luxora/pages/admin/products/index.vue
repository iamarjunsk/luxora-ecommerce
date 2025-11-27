<template>
    <div>
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-3xl font-serif font-bold text-luxora-black">Products</h1>
                <p class="text-sm text-gray-500 mt-1">Manage your inventory and catalog</p>
            </div>
            <NuxtLink to="/admin/products/create"
                class="bg-luxora-black text-white px-6 py-3 rounded-xl hover:bg-luxora-gold hover:text-luxora-black transition-all duration-300 flex items-center gap-2 shadow-lg group">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 transition-transform group-hover:rotate-90">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span class="font-bold text-xs uppercase tracking-widest">Add Product</span>
            </NuxtLink>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table class="min-w-full divide-y divide-gray-100">
                <thead class="bg-luxora-charcoal">
                    <tr>
                        <th class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">Image
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">Name</th>
                        <th class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">Price
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">Stock
                        </th>
                        <th class="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-widest">
                            Featured</th>
                        <th class="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-widest">Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                    <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 transition-colors group">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div
                                class="h-12 w-12 rounded-lg overflow-hidden border border-gray-200 group-hover:border-luxora-gold transition-colors">
                                <NuxtImg :src="product.images?.[0]?.url || 'https://placehold.co/100'" alt=""
                                    class="h-full w-full object-cover" />
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-bold text-gray-900 font-serif">{{ product.name }}</div>
                            <div class="text-xs text-gray-500 uppercase tracking-wide mt-0.5">{{ product.category }}
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">₹{{ product.price.toLocaleString() }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-3 py-1 text-xs font-bold rounded-full"
                                :class="product.stock > 10 ? 'bg-green-100 text-green-700' : (product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700')">
                                {{ product.stock }} in stock
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-center">
                            <button @click="toggleFeatured(product)"
                                class="transition-transform hover:scale-110 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-colors"
                                    :class="product.isFeatured ? 'text-luxora-gold fill-current' : 'text-gray-300 hover:text-gray-400'"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.545.044.77.77.326 1.163l-4.304 3.86a.562.562 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.304-3.86a.562.562 0 01.326-1.163l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                            </button>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div class="flex items-center justify-end gap-3">
                                <NuxtLink :to="`/admin/products/edit/${product.id}`"
                                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </NuxtLink>
                                <button @click="deleteProduct(product.id)"
                                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
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
