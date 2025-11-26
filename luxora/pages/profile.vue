<template>
    <div class="container mx-auto px-6 py-12 max-w-4xl">
        <h1 class="text-3xl font-serif mb-8">My Profile</h1>

        <div class="bg-white border border-gray-100 p-8 rounded-lg shadow-sm">
            <div class="flex items-center gap-6 mb-8">
                <div
                    class="w-20 h-20 bg-luxora-gold text-luxora-black rounded-full flex items-center justify-center text-3xl font-bold font-serif">
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

        <!-- Order History -->
        <div class="mt-12">
            <h2 class="text-2xl font-serif mb-6">Order History</h2>
            <div v-if="orders && orders.length > 0" class="space-y-6">
                <div v-for="order in orders" :key="order.id"
                    class="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <p class="font-bold text-lg">Order #{{ order.id }}</p>
                            <p class="text-sm text-gray-500">{{ new Date(order.createdAt).toLocaleDateString() }}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-luxora-gold">₹{{ order.total.toLocaleString() }}</p>
                            <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full mt-1" :class="{
                                'bg-yellow-100 text-yellow-800': order.deliveryStatus === 'PENDING',
                                'bg-blue-100 text-blue-800': order.deliveryStatus === 'SHIPPED',
                                'bg-green-100 text-green-800': order.deliveryStatus === 'DELIVERED'
                            }">
                                {{ order.deliveryStatus }}
                            </span>
                        </div>
                    </div>
                    <div class="border-t border-gray-100 pt-4">
                        <div v-for="item in order.items" :key="item.id" class="flex justify-between text-sm py-1">
                            <span class="text-gray-600">{{ item.product.name }} (x{{ item.quantity }})</span>
                            <span class="font-medium">₹{{ (item.price * item.quantity).toLocaleString() }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="bg-gray-50 p-8 text-center text-gray-500 rounded-lg">
                No orders found.
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
