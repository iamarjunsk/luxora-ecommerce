<template>
    <div class="min-h-screen bg-gray-50 flex font-sans">
        <!-- Sidebar -->
        <aside class="w-72 bg-luxora-black text-white hidden md:flex flex-col shadow-2xl z-20 border-r border-gray-800">
            <!-- Header / Logo -->
            <div class="h-24 flex items-center justify-center px-6 border-b border-gray-800 bg-luxora-charcoal/50 backdrop-blur-sm">
                <NuxtLink to="/admin" class="text-center group">
                    <h1 class="text-3xl font-serif font-bold tracking-wider text-luxora-gold group-hover:text-luxora-gold-light transition-colors">
                        LUXORA
                    </h1>
                    <span class="text-[10px] uppercase tracking-[0.3em] text-gray-400 group-hover:text-white transition-colors">Admin Panel</span>
                </NuxtLink>
            </div>

            <!-- Navigation -->
            <nav class="flex-1 overflow-y-auto py-8 px-4 space-y-2">
                <div class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 px-4">Main Menu</div>
                
                <NuxtLink to="/admin" 
                    class="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden"
                    active-class="bg-gradient-to-r from-luxora-gold/20 to-transparent text-luxora-gold shadow-sm border-l-4 border-luxora-gold"
                    :class="[$route.path === '/admin' ? '' : 'text-gray-400 hover:text-white hover:bg-white/5']">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 transition-colors group-hover:scale-110">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                    <span class="font-medium tracking-wide">Dashboard</span>
                </NuxtLink>

                <NuxtLink to="/admin/orders" 
                    class="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden"
                    active-class="bg-gradient-to-r from-luxora-gold/20 to-transparent text-luxora-gold shadow-sm border-l-4 border-luxora-gold"
                    :class="[$route.path.startsWith('/admin/orders') ? '' : 'text-gray-400 hover:text-white hover:bg-white/5']">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 transition-colors group-hover:scale-110">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <span class="font-medium tracking-wide">Orders</span>
                </NuxtLink>

                <NuxtLink to="/admin/products" 
                    class="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden"
                    active-class="bg-gradient-to-r from-luxora-gold/20 to-transparent text-luxora-gold shadow-sm border-l-4 border-luxora-gold"
                    :class="[$route.path.startsWith('/admin/products') ? '' : 'text-gray-400 hover:text-white hover:bg-white/5']">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 transition-colors group-hover:scale-110">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.593l6.25-2.083a2.25 2.25 0 001.513-2.14l.001-6.586a2.25 2.25 0 00-.659-1.591l-9.581-9.581A2.25 2.25 0 009.568 3z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
                    </svg>
                    <span class="font-medium tracking-wide">Products</span>
                </NuxtLink>

                <NuxtLink to="/admin/categories" 
                    class="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden"
                    active-class="bg-gradient-to-r from-luxora-gold/20 to-transparent text-luxora-gold shadow-sm border-l-4 border-luxora-gold"
                    :class="[$route.path.startsWith('/admin/categories') ? '' : 'text-gray-400 hover:text-white hover:bg-white/5']">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 transition-colors group-hover:scale-110">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <span class="font-medium tracking-wide">Categories</span>
                </NuxtLink>

                <NuxtLink to="/admin/reviews" 
                    class="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden"
                    active-class="bg-gradient-to-r from-luxora-gold/20 to-transparent text-luxora-gold shadow-sm border-l-4 border-luxora-gold"
                    :class="[$route.path.startsWith('/admin/reviews') ? '' : 'text-gray-400 hover:text-white hover:bg-white/5']">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 transition-colors group-hover:scale-110">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.545.044.77.77.326 1.163l-4.304 3.86a.562.562 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.304-3.86a.562.562 0 01.326-1.163l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <span class="font-medium tracking-wide">Reviews</span>
                </NuxtLink>
            </nav>

            <!-- Footer / Logout -->
            <div class="p-6 border-t border-gray-800 bg-luxora-charcoal/30">
                <button @click="logout"
                    class="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group border border-transparent hover:border-red-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 transition-transform group-hover:translate-x-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    <span class="font-medium tracking-wide">Logout</span>
                </button>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto h-screen bg-gray-50/50">
            <div class="p-8 max-w-7xl mx-auto">
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
