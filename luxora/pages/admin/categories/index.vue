<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-serif font-bold">Categories</h1>
        </div>

        <!-- Add Category Form -->
        <div class="bg-white rounded-lg shadow p-6 mb-8">
            <h2 class="text-xl font-serif mb-4">Add New Category</h2>
            <form @submit.prevent="addCategory" class="flex gap-4 items-end">
                <div class="flex-grow">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input v-model="newCategoryName" type="text" required placeholder="e.g. Watches"
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold-500 focus:border-gold-500 sm:text-sm p-2 border">
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
                            <div class="text-sm font-medium text-gray-900">{{ category.name }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">{{ new Date(category.createdAt).toLocaleDateString() }}
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button @click="deleteCategory(category.id)"
                                class="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                    </tr>
                    <tr v-if="categories.length === 0">
                        <td colspan="3" class="px-6 py-4 text-center text-sm text-gray-500">
                            No categories found.
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

const { showSnackbar } = useSnackbar()
const loading = ref(false)
const newCategoryName = ref('')

// Fetch categories
const { data: categories, refresh } = await useFetch('/api/categories')

async function addCategory() {
    if (!newCategoryName.value.trim()) return

    loading.value = true
    try {
        await $fetch('/api/categories', {
            method: 'POST',
            body: { name: newCategoryName.value }
        })
        showSnackbar('Category added successfully', 'success')
        newCategoryName.value = ''
        refresh()
    } catch (e) {
        showSnackbar('Failed to add category', 'error')
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
