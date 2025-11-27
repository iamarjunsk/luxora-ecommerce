<template>
    <div class="min-h-screen flex flex-col md:flex-row bg-white">
        <!-- Image Section (Left) -->
        <div class="w-full md:w-1/2 h-64 md:h-screen relative overflow-hidden">
            <NuxtImg src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=2070&auto=format&fit=crop" 
                alt="Join Luxora" 
                class="w-full h-full object-cover object-center" />
            <div class="absolute inset-0 bg-black/20"></div>
            <div class="absolute bottom-12 left-12 text-white p-6 hidden md:block">
                <h2 class="text-4xl font-serif mb-2">Join the Club.</h2>
                <p class="text-lg font-light tracking-wide">Experience luxury redefined.</p>
            </div>
        </div>

        <!-- Form Section (Right) -->
        <div class="w-full md:w-1/2 flex items-center justify-center p-8 md:p-24">
            <div class="w-full max-w-md">
                <div class="text-center mb-12">
                    <h1 class="font-serif text-3xl md:text-4xl mb-3 text-luxora-black">Create Account</h1>
                    <p class="text-gray-500 text-sm uppercase tracking-wider">Begin your journey</p>
                </div>

                <form @submit.prevent="handleRegister" class="space-y-6">
                    <div>
                        <label class="block text-xs font-bold mb-2 uppercase tracking-wider text-luxora-black">Full Name</label>
                        <input v-model="name" type="text"
                            class="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxora-black transition-colors bg-transparent"
                            placeholder="John Doe"
                            required />
                    </div>
                    <div>
                        <label class="block text-xs font-bold mb-2 uppercase tracking-wider text-luxora-black">Email Address</label>
                        <input v-model="email" type="email"
                            class="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxora-black transition-colors bg-transparent"
                            placeholder="name@example.com"
                            required />
                    </div>
                    <div>
                        <label class="block text-xs font-bold mb-2 uppercase tracking-wider text-luxora-black">Password</label>
                        <input v-model="password" type="password"
                            class="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxora-black transition-colors bg-transparent"
                            placeholder="••••••••"
                            required />
                    </div>

                    <div v-if="error" class="text-red-500 text-sm text-center py-2">{{ error }}</div>

                    <button type="submit" :disabled="loading"
                        class="w-full bg-luxora-black text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-luxora-gold hover:text-luxora-black transition-all duration-300 disabled:opacity-50 mt-8">
                        {{ loading ? 'Creating Account...' : 'Create Account' }}
                    </button>
                </form>

                <div class="mt-12 text-center border-t border-gray-100 pt-8">
                    <p class="text-sm text-gray-500">
                        Already have an account?
                        <NuxtLink to="/login"
                            class="font-bold text-luxora-black hover:text-luxora-gold transition-colors ml-1 uppercase tracking-wider text-xs border-b border-luxora-black pb-0.5 hover:border-luxora-gold">
                            Sign In
                        </NuxtLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

const handleRegister = async () => {
    loading.value = true
    error.value = ''

    try {
        await $fetch('/api/auth/register', {
            method: 'POST',
            body: {
                name: name.value,
                email: email.value,
                password: password.value
            }
        })

        // Auto login after registration (optional, but good UX)
        // For now, redirect to login page
        router.push('/login?registered=true')
    } catch (e) {
        error.value = e.data?.statusMessage || 'Registration failed'
    } finally {
        loading.value = false
    }
}
</script>
