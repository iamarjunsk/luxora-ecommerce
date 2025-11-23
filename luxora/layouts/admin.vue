<template>
    <div class="min-h-screen bg-gray-50 flex">
        <!-- Sidebar -->
        <aside class="w-64 bg-gray-900 text-white hidden md:block">
            <div class="p-6">
                <h1 class="text-2xl font-serif font-bold">Luxora Admin</h1>
            </div>
            <nav class="mt-6">
                <NuxtLink to="/admin" class="block py-3 px-6 hover:bg-gray-800 transition-colors"
                    active-class="bg-gray-800 border-l-4 border-gold-500">
                    Dashboard
                </NuxtLink>
                <NuxtLink to="/admin/orders" class="block py-3 px-6 hover:bg-gray-800 transition-colors"
                    active-class="bg-gray-800 border-l-4 border-gold-500">
                    Orders
                </NuxtLink>
                <NuxtLink to="/admin/products" class="block py-3 px-6 hover:bg-gray-800 transition-colors"
                    active-class="bg-gray-800 border-l-4 border-gold-500">
                    Products
                </NuxtLink>
                <NuxtLink to="/admin/categories" class="block py-3 px-6 hover:bg-gray-800 transition-colors"
                    active-class="bg-gray-800 border-l-4 border-gold-500">
                    Categories
                </NuxtLink>

                <button @click="logout"
                    class="w-full text-left py-3 px-6 hover:bg-gray-800 transition-colors text-red-400">
                    Logout
                </button>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto">
            <div class="p-8">
                <slot />
            </div>
        </main>
        <AppSnackbar />
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
})

const router = useRouter()

async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
}
</script>
