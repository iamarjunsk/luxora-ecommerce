<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-serif font-bold">Categories</h1>
        </div>

        <!-- Add Category Form -->
        <div class="bg-white rounded-lg shadow p-6 mb-8">
            <h2 class="text-xl font-serif mb-4">Add New Category</h2>
            <form @submit.prevent="addCategory" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input v-model="newCategoryName" type="text" required placeholder="e.g. Watches"
                            class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold-500 focus:border-gold-500 sm:text-sm p-2 border">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <div class="flex gap-2 mb-2">
                            <button type="button" @click="imageInputType = 'url'"
                                :class="['px-3 py-1 text-xs rounded', imageInputType === 'url' ? 'bg-luxora-black text-white' : 'bg-gray-200']">
                                URL
                            </button>
                            <button type="button" @click="imageInputType = 'upload'"
                                :class="['px-3 py-1 text-xs rounded', imageInputType === 'upload' ? 'bg-luxora-black text-white' : 'bg-gray-200']">
                                Upload
                            </button>
                        </div>
                        <input v-if="imageInputType === 'url'" v-model="newCategoryImage" type="url"
                            placeholder="https://example.com/image.jpg"
                            class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold-500 focus:border-gold-500 sm:text-sm p-2 border">
                        <input v-else type="file" accept="image/*" @change="handleFileUpload"
                            class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold-500 focus:border-gold-500 sm:text-sm p-2 border">
                    </div>
                </div>
                <button type="submit" :disabled="loading"
                    class="bg-luxora-black text-white px-6 py-2 rounded-md hover:bg-luxora-gold hover:text-luxora-black transition-colors duration-300 disabled:opacity-50">
                    {{ loading ? 'Adding...' : 'Add Category' }}
                </button>
            </form>
        </div>

        <!-- Categories List -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Image
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created At
                        </th>
                        <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="category in categories" :key="category.id">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <NuxtImg v-if="category.image" :src="category.image" :alt="category.name"
                                class="h-16 w-16 object-cover rounded" />
                            <div v-else
                                class="h-16 w-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                                No Image
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ category.name }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">{{ new Date(category.createdAt).toLocaleDateString() }}
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button @click="editCategory(category)"
                                class="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                            <button @click="deleteCategory(category.id)"
                                class="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                    </tr>
                    <tr v-if="categories.length === 0">
                        <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">
                            No categories found.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Edit Modal -->
        <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                <h2 class="text-2xl font-serif mb-6">Edit Category</h2>
                <form @submit.prevent="updateCategory" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input v-model="editForm.name" type="text" required
                            class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold-500 focus:border-gold-500 sm:text-sm p-2 border">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <div class="flex gap-2 mb-2">
                            <button type="button" @click="editImageInputType = 'url'"
                                :class="['px-3 py-1 text-xs rounded', editImageInputType === 'url' ? 'bg-luxora-black text-white' : 'bg-gray-200']">
                                URL
                            </button>
                            <button type="button" @click="editImageInputType = 'upload'"
                                :class="['px-3 py-1 text-xs rounded', editImageInputType === 'upload' ? 'bg-luxora-black text-white' : 'bg-gray-200']">
                                Upload
                            </button>
                        </div>
                        <input v-if="editImageInputType === 'url'" v-model="editForm.image" type="url"
                            class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold-500 focus:border-gold-500 sm:text-sm p-2 border">
                        <input v-else type="file" accept="image/*" @change="handleEditFileUpload"
                            class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold-500 focus:border-gold-500 sm:text-sm p-2 border">
                    </div>
                    <div class="flex gap-4 justify-end">
                        <button type="button" @click="closeEditModal"
                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                            Cancel
                        </button>
                        <button type="submit" :disabled="loading"
                            class="bg-luxora-black text-white px-6 py-2 rounded-md hover:bg-luxora-gold hover:text-luxora-black transition-colors duration-300 disabled:opacity-50">
                            {{ loading ? 'Updating...' : 'Update' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: 'auth'
})

const { showSnackbar } = useSnackbar()
const loading = ref(false)
const newCategoryName = ref('')
const newCategoryImage = ref('')
const imageInputType = ref('url')
const editImageInputType = ref('url')
const showEditModal = ref(false)
const editForm = ref({
    id: null,
    name: '',
    image: ''
})

// Fetch categories
const { data: categories, refresh } = await useFetch('/api/categories')

async function handleFileUpload(event) {
    const file = event.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
        const response = await $fetch('/api/upload/image', {
            method: 'POST',
            body: formData
        })
        newCategoryImage.value = response.url
        showSnackbar('Image uploaded successfully', 'success')
    } catch (e) {
        showSnackbar('Failed to upload image', 'error')
    }
}

async function handleEditFileUpload(event) {
    const file = event.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
        const response = await $fetch('/api/upload/image', {
            method: 'POST',
            body: formData
        })
        editForm.value.image = response.url
        showSnackbar('Image uploaded successfully', 'success')
    } catch (e) {
        showSnackbar('Failed to upload image', 'error')
    }
}

async function addCategory() {
    if (!newCategoryName.value.trim()) return

    loading.value = true
    try {
        await $fetch('/api/categories', {
            method: 'POST',
            body: {
                name: newCategoryName.value,
                image: newCategoryImage.value || null
            }
        })
        showSnackbar('Category added successfully', 'success')
        newCategoryName.value = ''
        newCategoryImage.value = ''
        refresh()
    } catch (e) {
        showSnackbar('Failed to add category', 'error')
    } finally {
        loading.value = false
    }
}

function editCategory(category) {
    editForm.value = {
        id: category.id,
        name: category.name,
        image: category.image || ''
    }
    showEditModal.value = true
}

function closeEditModal() {
    showEditModal.value = false
    editForm.value = { id: null, name: '', image: '' }
}

async function updateCategory() {
    if (!editForm.value.name.trim()) return

    loading.value = true
    try {
        await $fetch(`/api/categories/${editForm.value.id}`, {
            method: 'PUT',
            body: {
                name: editForm.value.name,
                image: editForm.value.image || null
            }
        })
        showSnackbar('Category updated successfully', 'success')
        closeEditModal()
        refresh()
    } catch (e) {
        showSnackbar('Failed to update category', 'error')
    } finally {
        loading.value = false
    }
}

async function deleteCategory(id) {
    if (!confirm('Are you sure you want to delete this category?')) return

    try {
        await $fetch(`/api/categories/${id}`, {
            method: 'DELETE'
        })
        showSnackbar('Category deleted successfully', 'success')
        refresh()
    } catch (e) {
        showSnackbar('Failed to delete category', 'error')
    }
}
</script>
