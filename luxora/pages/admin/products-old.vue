<template>
    <div>
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-serif">Products</h1>
            <button @click="showAddModal = true"
                class="bg-luxora-gold text-luxora-black px-6 py-2 font-bold hover:bg-luxora-gold-light transition">
                ADD PRODUCT
            </button>
        </div>

        <!-- Product List -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <table class="w-full text-left">
                <thead class="bg-gray-50">
                    <tr class="text-gray-500 text-sm uppercase tracking-wider">
                        <th class="p-4">Image</th>
                        <th class="p-4">Name</th>
                        <th class="p-4">Category</th>
                        <th class="p-4">Price</th>
                        <th class="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr v-for="product in productStore.products" :key="product.id" class="hover:bg-gray-50 transition">
                        <td class="p-4">
                            <NuxtImg :src="product.image" class="w-12 h-12 object-cover rounded bg-gray-100" />
                        </td>
                        <td class="p-4 font-medium">{{ product.name }}</td>
                        <td class="p-4 text-gray-500">{{ product.category }}</td>
                        <td class="p-4">₹{{ product.price.toLocaleString() }}</td>
                        <td class="p-4">
                            <button @click="productStore.deleteProduct(product.id)"
                                class="text-red-500 hover:text-red-700 text-sm font-bold">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Add Product Modal -->
        <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div class="bg-white p-8 rounded-lg w-full max-w-lg">
                <h2 class="text-2xl font-serif mb-6">Add New Product</h2>

                <form @submit.prevent="addProduct" class="space-y-4">
                    <div>
                        <label class="block text-sm font-bold mb-1">Name</label>
                        <input v-model="newProduct.name" type="text" class="w-full border border-gray-300 p-2 rounded"
                            required />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold mb-1">Price</label>
                            <input v-model="newProduct.price" type="number"
                                class="w-full border border-gray-300 p-2 rounded" required />
                        </div>
                        <div>
                            <label class="block text-sm font-bold mb-1">Category</label>
                            <select v-model="newProduct.category" class="w-full border border-gray-300 p-2 rounded">
                                <option>Men</option>
                                <option>Women</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-bold mb-1">Image URL</label>
                        <input v-model="newProduct.image" type="text" class="w-full border border-gray-300 p-2 rounded"
                            placeholder="/assets/images/..." required />
                    </div>
                    <div>
                        <label class="block text-sm font-bold mb-1">Description</label>
                        <textarea v-model="newProduct.description" class="w-full border border-gray-300 p-2 rounded"
                            rows="3"></textarea>
                    </div>

                    <div class="flex justify-end gap-4 mt-6">
                        <button type="button" @click="showAddModal = false"
                            class="text-gray-500 hover:text-gray-700">Cancel</button>
                        <button type="submit"
                            class="bg-luxora-gold text-luxora-black px-6 py-2 font-bold hover:bg-luxora-gold-light transition">Save
                            Product</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProductStore } from '~/stores/products'

definePageMeta({
    layout: 'admin'
})

const productStore = useProductStore()
const showAddModal = ref(false)

const newProduct = ref({
    name: '',
    price: 0,
    category: 'Men',
    image: '/assets/images/mens-ring.png', // Default for demo
    description: ''
})

const addProduct = () => {
    productStore.addProduct({ ...newProduct.value })
    showAddModal.value = false
    // Reset form
    newProduct.value = {
        name: '',
        price: 0,
        category: 'Men',
        image: '/assets/images/mens-ring.png',
        description: ''
    }
}
</script>
