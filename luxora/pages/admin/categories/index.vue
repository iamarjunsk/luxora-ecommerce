<template>
    <div>
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-3xl font-serif font-bold text-luxora-black">Categories</h1>
                <p class="text-sm text-gray-500 mt-1">Manage your product categories</p>
            </div>
        </div>

        <!-- Add Category Form -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
            <h2 class="text-xl font-serif font-bold text-luxora-black mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6 text-luxora-gold">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add New Category
            </h2>
            <form @submit.prevent="addCategory" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Name</label>
                        <input v-model="newCategoryName" type="text" required placeholder="e.g. Watches"
                            class="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-luxora-gold focus:border-luxora-gold sm:text-sm p-3 border transition-colors">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Image</label>
                        <div class="flex gap-2 mb-3">
                            <button type="button" @click="imageInputType = 'url'"
                                :class="['px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors', imageInputType === 'url' ? 'bg-luxora-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200']">
                                URL
                            </button>
                            <button type="button" @click="imageInputType = 'upload'"
                                :class="['px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors', imageInputType === 'upload' ? 'bg-luxora-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200']">
                                Upload
                            </button>
                        </div>
                        <input v-if="imageInputType === 'url'" v-model="newCategoryImage" type="url"
                            placeholder="https://example.com/image.jpg"
                            class="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-luxora-gold focus:border-luxora-gold sm:text-sm p-3 border transition-colors">
                        <input v-else type="file" accept="image/*" @change="handleFileUpload"
                            class="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-luxora-gold focus:border-luxora-gold sm:text-sm p-2 border file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-luxora-black file:text-white hover:file:bg-luxora-gold transition-colors">
                    </div>
                </div>
                <div class="flex justify-end">
                    <button type="submit" :disabled="loading"
                        class="bg-luxora-black text-white px-8 py-3 rounded-xl hover:bg-luxora-gold hover:text-luxora-black transition-all duration-300 disabled:opacity-50 shadow-lg font-bold text-xs uppercase tracking-widest">
                        {{ loading ? 'Adding...' : 'Add Category' }}
                    </button>
                </div>
            </form>
        </div>

        <!-- Categories List -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table class="min-w-full divide-y divide-gray-100">
                <thead class="bg-luxora-charcoal">
                    <tr>
                        <th scope="col"
                            class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">Image
                        </th>
                        <th scope="col"
                            class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">Name</th>
                        <th scope="col"
                            class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">Created
                            At</th>
                        <th scope="col"
                            class="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-widest">Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                    <tr v-for="category in categories" :key="category.id"
                        class="hover:bg-gray-50 transition-colors group">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div
                                class="h-16 w-16 rounded-lg overflow-hidden border border-gray-200 group-hover:border-luxora-gold transition-colors">
                                <NuxtImg v-if="category.image" :src="category.image" :alt="category.name"
                                    class="h-full w-full object-cover" />
                                <div v-else
                                    class="h-full w-full bg-gray-50 flex items-center justify-center text-gray-400 text-xs">
                                    No Image
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-bold text-gray-900 font-serif">{{ category.name }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-xs text-gray-500 font-mono">{{ new
                                Date(category.createdAt).toLocaleDateString() }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div class="flex items-center justify-end gap-3">
                                <button @click="editCategory(category)"
                                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </button>
                                <button @click="deleteCategory(category.id)"
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
                    <tr v-if="categories.length === 0">
                        <td colspan="4" class="px-6 py-12 text-center text-sm text-gray-500 italic">
                            No categories found. Add one above to get started.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Edit Modal -->
        <div v-if="showEditModal"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all">
                <h2 class="text-2xl font-serif font-bold text-luxora-black mb-6">Edit Category</h2>
                <form @submit.prevent="updateCategory" class="space-y-6">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Name</label>
                        <input v-model="editForm.name" type="text" required
                            class="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-luxora-gold focus:border-luxora-gold sm:text-sm p-3 border transition-colors">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Image</label>
                        <div class="flex gap-2 mb-3">
                            <button type="button" @click="editImageInputType = 'url'"
                                :class="['px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors', editImageInputType === 'url' ? 'bg-luxora-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200']">
                                URL
                            </button>
                            <button type="button" @click="editImageInputType = 'upload'"
                                :class="['px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors', editImageInputType === 'upload' ? 'bg-luxora-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200']">
                                Upload
                            </button>
                        </div>
                        <input v-if="editImageInputType === 'url'" v-model="editForm.image" type="url"
                            class="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-luxora-gold focus:border-luxora-gold sm:text-sm p-3 border transition-colors">
                        <input v-else type="file" accept="image/*" @change="handleEditFileUpload"
                            class="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-luxora-gold focus:border-luxora-gold sm:text-sm p-2 border file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-luxora-black file:text-white hover:file:bg-luxora-gold transition-colors">
                    </div>
                    <div class="flex gap-4 justify-end pt-4">
                        <button type="button" @click="closeEditModal"
                            class="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-bold text-xs uppercase tracking-widest transition-colors">
                            Cancel
                        </button>
                        <button type="submit" :disabled="loading"
                            class="bg-luxora-black text-white px-8 py-2.5 rounded-xl hover:bg-luxora-gold hover:text-luxora-black transition-all duration-300 disabled:opacity-50 font-bold text-xs uppercase tracking-widest shadow-lg">
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
