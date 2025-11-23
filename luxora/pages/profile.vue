<template>
    <div class="container mx-auto px-6 py-12 max-w-4xl">
        <h1 class="text-3xl font-serif mb-8">My Profile</h1>

        <div class="bg-white border border-gray-100 p-8 rounded-lg shadow-sm">
            <div class="flex items-center gap-6 mb-8">
                <div class="w-20 h-20 bg-luxora-gold text-luxora-black rounded-full flex items-center justify-center text-3xl font-bold font-serif">
                    {{ user?.name?.charAt(0) || user?.email?.charAt(0) }}
                </div>
                <div>
                    <h2 class="text-2xl font-serif">{{ user?.name || 'Valued Customer' }}</h2>
                    <p class="text-gray-600">{{ user?.email }}</p>
                </div>
            </div>

            <div class="border-t border-gray-100 pt-8">
                <h3 class="text-xl font-serif mb-6">Account Actions</h3>
                <button @click="logout" class="text-red-500 hover:text-red-700 font-medium transition-colors">
                    Log Out
                </button>
            </div>
        </div>

        <!-- Placeholder for Order History -->
        <div class="mt-12">
            <h2 class="text-2xl font-serif mb-6">Order History</h2>
            <div class="bg-gray-50 p-8 text-center text-gray-500 rounded-lg">
                No orders found.
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
})

const { user } = useAuth()
const router = useRouter()

const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    router.push('/')
}
</script>
