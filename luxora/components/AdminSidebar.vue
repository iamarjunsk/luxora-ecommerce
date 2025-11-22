<template>
    <aside class="w-64 bg-luxora-black text-white min-h-screen flex-shrink-0">
        <div class="p-6 border-b border-luxora-charcoal">
            <h1 class="font-serif text-2xl text-luxora-gold">LUXORA <span
                    class="text-xs text-gray-500 block font-sans tracking-widest mt-1">ADMIN</span></h1>
        </div>

        <nav class="p-6 space-y-2">
            <NuxtLink to="/admin" class="block py-3 px-4 rounded hover:bg-luxora-charcoal transition"
                :class="{ 'bg-luxora-charcoal text-luxora-gold': route.path === '/admin' }">
                Dashboard
            </NuxtLink>
            <NuxtLink to="/admin/products" class="block py-3 px-4 rounded hover:bg-luxora-charcoal transition"
                :class="{ 'bg-luxora-charcoal text-luxora-gold': route.path.includes('/admin/products') }">
                Products
            </NuxtLink>
            <NuxtLink to="/"
                class="block py-3 px-4 rounded hover:bg-luxora-charcoal transition mt-8 text-gray-400 hover:text-white">
                View Shop
            </NuxtLink>
            <button @click="logout"
                class="block w-full text-left py-3 px-4 rounded hover:bg-luxora-charcoal transition text-red-400 hover:text-red-300">
                Logout
            </button>
        </nav>
    </aside>
</template>

<script setup>
import { useUserStore } from '~/stores/user'

const route = useRoute()
const userStore = useUserStore()
const router = useRouter()

const logout = () => {
    userStore.logout()
    router.push('/login')
}
</script>
