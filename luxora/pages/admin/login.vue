<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-3xl font-serif font-bold text-center mb-6 text-gray-900">Admin Login</h2>
            <form @submit.prevent="login" class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="email" type="email" required
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold-500 focus:border-gold-500 sm:text-sm p-2 border">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="password" type="password" required
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gold-500 focus:border-gold-500 sm:text-sm p-2 border">
                </div>
                <div v-if="error" class="text-red-500 text-sm text-center">
                    {{ error }}
                </div>
                <button type="submit" :disabled="loading"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50">
                    {{ loading ? 'Signing in...' : 'Sign In' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: false
})

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

async function login() {
    loading.value = true
    error.value = ''
    try {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: { email: email.value, password: password.value }
        })
        const { fetchUser } = useAuth()
        await fetchUser()
        router.push('/admin')
    } catch (e) {
        error.value = e.data?.statusMessage || 'Login failed'
    } finally {
        loading.value = false
    }
}
</script>
