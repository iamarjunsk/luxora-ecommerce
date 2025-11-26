<template>
    <div class="min-h-screen bg-white pt-12 pb-24">
        <div class="container mx-auto px-6 max-w-6xl">
            <!-- Header -->
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-5xl font-serif text-luxora-black mb-4">My Account</h1>
                <p class="text-gray-500 tracking-wide uppercase text-xs">Welcome back, {{ user?.name?.split(' ')[0] }}</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <!-- Profile Summary (Left Column) -->
                <div class="lg:col-span-4">
                    <div class="bg-gray-50 p-8 text-center sticky top-24 border border-gray-100">
                        <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-3xl font-serif text-luxora-gold border border-gray-100">
                             {{ user?.name?.charAt(0) || user?.email?.charAt(0) }}
                        </div>
                        <h2 class="text-xl font-serif text-luxora-black mb-1">{{ user?.name || 'Valued Customer' }}</h2>
                        <p class="text-sm text-gray-500 mb-8">{{ user?.email }}</p>
                        
                        <button @click="logout" class="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 border-b border-red-200 hover:border-red-700 pb-1 transition-all">
                            Log Out
                        </button>
                    </div>
                </div>

                <!-- Order History (Right Column) -->
                <div class="lg:col-span-8">
                    <h2 class="text-xl font-serif mb-8 text-luxora-black border-b border-gray-100 pb-4">Order History</h2>
                    
                    <div v-if="orders && orders.length > 0" class="space-y-6">
                        <div v-for="order in orders" :key="order.id" class="border border-gray-100 p-6 hover:shadow-sm transition-shadow bg-white group">
                            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <div>
                                    <p class="font-serif text-lg text-luxora-black mb-1">Order #{{ order.id }}</p>
                                    <p class="text-xs text-gray-500 uppercase tracking-wider">{{ new Date(order.createdAt).toLocaleDateString() }}</p>
                                </div>
                                <span class="px-3 py-1 text-xs font-bold uppercase tracking-widest border" :class="{
                                    'bg-yellow-50 text-yellow-700 border-yellow-100': order.deliveryStatus === 'PENDING',
                                    'bg-blue-50 text-blue-700 border-blue-100': order.deliveryStatus === 'SHIPPED',
                                    'bg-green-50 text-green-700 border-green-100': order.deliveryStatus === 'DELIVERED'
                                }">
                                    {{ order.deliveryStatus }}
                                </span>
                            </div>
                            
                            <div class="space-y-3 mb-6 bg-gray-50 p-4 rounded-sm">
                                <div v-for="item in order.items" :key="item.id" class="flex justify-between text-sm">
                                    <span class="text-gray-600">{{ item.product.name }} <span class="text-gray-400">x{{ item.quantity }}</span></span>
                                    <span class="font-medium text-luxora-black">₹{{ (item.price * item.quantity).toLocaleString() }}</span>
                                </div>
                            </div>
                            
                            <div class="flex justify-between items-center pt-2">
                                <span class="text-sm text-gray-500 uppercase tracking-wider">Total Amount</span>
                                <span class="font-serif text-xl text-luxora-black">₹{{ order.total.toLocaleString() }}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div v-else class="text-center py-16 bg-gray-50 border border-gray-100">
                        <p class="text-gray-500 mb-6 font-serif text-lg">You haven't placed any orders yet.</p>
                        <NuxtLink to="/shop" class="inline-block bg-luxora-black text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-luxora-gold hover:text-luxora-black transition-colors duration-300">
                            Start Shopping
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'user-auth'
})

const { user } = useAuth()
const router = useRouter()

const { data: orders } = await useFetch('/api/user/orders')

const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    router.push('/')
}
</script>
