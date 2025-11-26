<template>
    <div class="min-h-screen flex flex-col md:flex-row bg-white">
        <!-- Image Section (Left) -->
        <div class="w-full md:w-1/2 h-64 md:h-screen relative overflow-hidden">
            <NuxtImg src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop" 
                alt="Login to Luxora" 
                class="w-full h-full object-cover object-center" />
            <div class="absolute inset-0 bg-black/20"></div>
            <div class="absolute bottom-12 left-12 text-white p-6 hidden md:block">
                <h2 class="text-4xl font-serif mb-2">Welcome Back.</h2>
                <p class="text-lg font-light tracking-wide">Continue your journey with Luxora.</p>
            </div>
        </div>

        <!-- Form Section (Right) -->
        <div class="w-full md:w-1/2 flex items-center justify-center p-8 md:p-24">
            <div class="w-full max-w-md">
                <div class="text-center mb-12">
                    <h1 class="font-serif text-3xl md:text-4xl mb-3 text-luxora-black">Sign In</h1>
                    <p class="text-gray-500 text-sm uppercase tracking-wider">Access your account</p>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-6">
                    <div>
                        <label class="block text-xs font-bold mb-2 uppercase tracking-wider text-luxora-black">Email Address</label>
                        <input v-model="email" type="email"
                            class="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxora-black transition-colors bg-transparent"
                            placeholder="name@example.com"
                            required />
                    </div>
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <label class="block text-xs font-bold uppercase tracking-wider text-luxora-black">Password</label>
                            <a href="#" class="text-xs text-gray-400 hover:text-luxora-black transition-colors">Forgot?</a>
                        </div>
                        <input v-model="password" type="password"
                            class="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxora-black transition-colors bg-transparent"
                            placeholder="••••••••"
                            required />
                    </div>

                    <div v-if="error" class="text-red-500 text-sm text-center py-2">{{ error }}</div>

                    <button type="submit" :disabled="loading"
                        class="w-full bg-luxora-black text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-luxora-gold hover:text-luxora-black transition-all duration-300 disabled:opacity-50 mt-8">
                        {{ loading ? 'Signing In...' : 'Sign In' }}
                    </button>
                </form>

                <div class="mt-12 text-center border-t border-gray-100 pt-8">
                    <p class="text-sm text-gray-500">
                        New to Luxora?
                        <NuxtLink to="/register"
                            class="font-bold text-luxora-black hover:text-luxora-gold transition-colors ml-1 uppercase tracking-wider text-xs border-b border-luxora-black pb-0.5 hover:border-luxora-gold">
                            Create Account
                        </NuxtLink>
                    </p>
                </div>
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
