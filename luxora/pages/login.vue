<template>
    <div class="min-h-screen flex items-center justify-center bg-luxora-cream">
        <div class="bg-white p-12 shadow-xl border border-gray-100 w-full max-w-md">
            <div class="text-center mb-8">
                <h1 class="font-serif text-3xl mb-2">Welcome Back</h1>
                <p class="text-gray-500">Sign in to your account</p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-6">
                <div>
                    <label class="block text-sm font-bold mb-2 uppercase tracking-wider">Email</label>
                    <input v-model="email" type="email"
                        class="w-full border border-gray-300 p-3 focus:outline-none focus:border-luxora-gold"
                        required />
                </div>
                <div>
                    <label class="block text-sm font-bold mb-2 uppercase tracking-wider">Password</label>
                    <input v-model="password" type="password"
                        class="w-full border border-gray-300 p-3 focus:outline-none focus:border-luxora-gold"
                        required />
                </div>

                <div v-if="error" class="text-red-500 text-sm text-center">{{ error }}</div>

                <button type="submit" :disabled="loading"
                    class="w-full bg-luxora-black text-white py-4 font-bold tracking-widest hover:bg-luxora-gold hover:text-luxora-black transition-colors duration-300 disabled:opacity-50">
                    {{ loading ? 'SIGNING IN...' : 'SIGN IN' }}
                </button>
            </form>

            <div class="mt-6 text-center">
                <p class="text-sm text-gray-600">
                    Don't have an account?
                    <NuxtLink to="/register"
                        class="font-bold text-luxora-gold hover:text-luxora-black transition-colors">
                        Create one
                    </NuxtLink>
                </p>
            </div>

            <div class="mt-8 text-center text-sm text-gray-500">
                <p>Demo Admin: admin@luxora.com / admin123</p>
                <p>Demo User: user@luxora.com / user123</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const { user, fetchUser } = useAuth()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
    loading.value = true
    error.value = ''
    try {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: { email: email.value, password: password.value }
        })
        await fetchUser() // Update auth state

        if (user.value?.role === 'ADMIN') {
            router.push('/admin')
        } else {
            const redirect = route.query.redirect
            router.push(redirect ? redirect : '/')
        }
    } catch (e) {
        error.value = e.data?.statusMessage || 'Invalid credentials'
    } finally {
        loading.value = false
    }
}
</script>
