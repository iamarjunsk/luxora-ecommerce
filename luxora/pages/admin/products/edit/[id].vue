<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-serif font-bold">Edit Product</h1>
        </div>

        <div class="bg-white rounded-lg shadow p-6 max-w-2xl">
            <form @submit.prevent="saveProduct" class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <input v-model="form.name" type="text" required
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold-500 focus:border-gold-500 sm:text-sm p-2 border">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea v-model="form.description" rows="3"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold-500 focus:border-gold-500 sm:text-sm p-2 border"></textarea>
                </div>

                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Price (₹)</label>
                        <input v-model="form.price" type="number" step="0.01" required
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold-500 focus:border-gold-500 sm:text-sm p-2 border">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Stock</label>
                        <input v-model="form.stock" type="number" required
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold-500 focus:border-gold-500 sm:text-sm p-2 border">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Category</label>
                    <select v-model="form.category"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold-500 focus:border-gold-500 sm:text-sm p-2 border">
                        <option v-for="category in categories" :key="category.id" :value="category.name">{{ category.name }}</option>
                    </select>
                </div>

                <!-- Multiple Images Section -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Images</label>

                    <!-- Image Input Type Toggle -->
                    <div class="flex items-center space-x-4 mb-4">
                        <label class="inline-flex items-center">
                            <input type="radio" v-model="imageInputType" value="url" class="form-radio text-gold-600">
                            <span class="ml-2">Image URL</span>
                        </label>
                        <label class="inline-flex items-center">
                            <input type="radio" v-model="imageInputType" value="upload"
                                class="form-radio text-gold-600">
                            <span class="ml-2">Upload Image</span>
                        </label>
                    </div>

                    <!-- URL Input -->
                    <div v-if="imageInputType === 'url'" class="flex gap-2 mb-4">
                        <input v-model="newImageUrl" type="url" placeholder="https://example.com/image.jpg"
                            class="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-gold-500 focus:border-gold-500 sm:text-sm p-2 border">
                        <button type="button" @click="addImageUrl"
                            class="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">Add</button>
                    </div>

                    <!-- Upload Input -->
                    <div v-else class="mb-4">
                        <input type="file" @change="handleFileUpload" accept="image/*"
                            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-50 file:text-gold-700 hover:file:bg-gold-100">
                        <div v-if="uploading" class="text-sm text-gray-500 mt-2">Uploading...</div>
                    </div>

                    <!-- Image List -->
                    <div v-if="form.images.length > 0" class="space-y-2">
                        <p class="text-sm text-gray-700 font-medium">Added Images ({{ form.images.length }}):</p>
                        <div class="grid grid-cols-3 gap-4">
                            <div v-for="(imageUrl, index) in form.images" :key="index" class="relative">
                                <img :src="imageUrl" alt="Product" class="h-24 w-full object-cover rounded-md border">
                                <button type="button" @click="removeImage(index)"
                                    class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end">
                    <NuxtLink to="/admin/products"
                        class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 mr-3">
                        Cancel
                    </NuxtLink>
                    <button type="submit" :disabled="loading"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50">
                        {{ loading ? 'Saving...' : 'Save Changes' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const uploading = ref(false)
const imageInputType = ref('url')
const newImageUrl = ref('')

const form = reactive({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    images: []
})

// Fetch existing product and categories
const { data: product } = await useFetch(`/api/products/${route.params.id}`)
const { data: categories } = await useFetch('/api/categories')

if (product.value) {
    form.name = product.value.name
    form.description = product.value.description
    form.price = product.value.price
    form.stock = product.value.stock
    form.category = product.value.category
    form.images = (product.value.images || []).map(img => img.url)
}

function addImageUrl() {
    if (newImageUrl.value && newImageUrl.value.trim()) {
        form.images.push(newImageUrl.value.trim())
        newImageUrl.value = ''
    }
}

function removeImage(index) {
    form.images.splice(index, 1)
}

async function handleFileUpload(event) {
    const file = event.target.files[0]
    if (!file) return

    uploading.value = true
    const formData = new FormData()
    formData.append('file', file)

    try {
        const response = await $fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        form.images.push(response.url)
        event.target.value = '' // Reset input
    } catch (e) {
        alert('Failed to upload image')
    } finally {
        uploading.value = false
    }
}

async function saveProduct() {
    if (form.images.length === 0) {
        alert('Please add at least one image')
        return
    }

    loading.value = true
    try {
        await $fetch(`/api/products/${route.params.id}`, {
            method: 'PUT',
            body: form
        })
        router.push('/admin/products')
    } catch (e) {
        alert('Failed to update product')
    } finally {
        loading.value = false
    }
}
</script>
