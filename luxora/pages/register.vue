<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
            <div>
                <h2 class="mt-6 text-center text-3xl font-serif font-bold text-gray-900">
                    Create your account
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    Or
                    <NuxtLink to="/login" class="font-medium text-luxora-gold hover:text-luxora-gold-dark">
                        sign in to your existing account
                    </NuxtLink>
                </p>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="name" class="sr-only">Full Name</label>
                        <input id="name" name="name" type="text" required v-model="name"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-luxora-gold focus:border-luxora-gold focus:z-10 sm:text-sm"
                            placeholder="Full Name">
                    </div>
                    <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" required
                            v-model="email"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-luxora-gold focus:border-luxora-gold focus:z-10 sm:text-sm"
                            placeholder="Email address">
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" name="password" type="password" autocomplete="new-password" required
                            v-model="password"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-luxora-gold focus:border-luxora-gold focus:z-10 sm:text-sm"
                            placeholder="Password">
                    </div>
                </div>

                <div v-if="error" class="text-red-500 text-sm text-center">
                    {{ error }}
                </div>

                <div>
                    <button type="submit" :disabled="loading"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-luxora-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-luxora-gold disabled:opacity-50">
                        <span v-if="loading">Creating Account...</span>
                        <span v-else>Sign up</span>
                    </button>
                </div>
            </form>
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
