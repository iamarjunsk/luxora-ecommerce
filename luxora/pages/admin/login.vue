<template>
    <div class="min-h-screen flex flex-col md:flex-row bg-white">
        <!-- Image Section (Left) -->
        <div class="w-full md:w-1/2 h-64 md:h-screen relative overflow-hidden">
            <NuxtImg src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop"
                alt="Luxora Admin" class="w-full h-full object-cover object-center" />
            <div class="absolute inset-0 bg-black/40"></div>
            <div class="absolute bottom-12 left-12 text-white p-6 hidden md:block">
                <h2 class="text-4xl font-serif mb-2">Admin Portal.</h2>
                <p class="text-lg font-light tracking-wide">Manage your store with elegance.</p>
            </div>
        </div>

        <!-- Form Section (Right) -->
        <div class="w-full md:w-1/2 flex items-center justify-center p-8 md:p-24">
            <div class="w-full max-w-md">
                <div class="text-center mb-12">
                    <h1 class="font-serif text-3xl md:text-4xl mb-3 text-luxora-black">Admin Access</h1>
                    <p class="text-gray-500 text-sm uppercase tracking-wider">Secure Dashboard Login</p>
                </div>

                <form @submit.prevent="login" class="space-y-6">
                    <div>
                        <label class="block text-xs font-bold mb-2 uppercase tracking-wider text-luxora-black">Email
                            Address</label>
                        <input v-model="email" type="email"
                            class="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxora-black transition-colors bg-transparent"
                            placeholder="admin@luxora.com" required />
                    </div>
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <label
                                class="block text-xs font-bold uppercase tracking-wider text-luxora-black">Password</label>
                        </div>
                        <input v-model="password" type="password"
                            class="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxora-black transition-colors bg-transparent"
                            placeholder="••••••••" required />
                    </div>

                    <div v-if="error" class="text-red-500 text-sm text-center py-2">{{ error }}</div>

                    <button type="submit" :disabled="loading"
                        class="w-full bg-luxora-black text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-luxora-gold hover:text-luxora-black transition-all duration-300 disabled:opacity-50 mt-8">
                        {{ loading ? 'Authenticating...' : 'Access Dashboard' }}
                    </button>
                </form>

                <div class="mt-12 text-center">
                    <p class="text-xs text-gray-400">
                        &copy; {{ new Date().getFullYear() }} Luxora. Authorized personnel only.
                    </p>
                </div>
            </div>
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
        error.value = e.data?.statusMessage || 'Invalid credentials. Please try again.'
    } finally {
        loading.value = false
    }
}
</script>
