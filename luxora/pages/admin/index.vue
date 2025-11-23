<template>
    <div>
        <h1 class="text-3xl font-serif font-bold mb-8">Dashboard</h1>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-gray-500 text-sm font-medium uppercase">Total Sales</h3>
                <p class="text-3xl font-bold mt-2 text-luxora-gold">₹{{ stats?.totalSales.toLocaleString() }}</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-gray-500 text-sm font-medium uppercase">Total Orders</h3>
                <p class="text-3xl font-bold mt-2">{{ stats?.totalOrders }}</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-gray-500 text-sm font-medium uppercase">Total Products</h3>
                <p class="text-3xl font-bold mt-2">{{ stats?.totalProducts }}</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-gray-500 text-sm font-medium uppercase">Customers</h3>
                <p class="text-3xl font-bold mt-2">{{ stats?.totalCustomers }}</p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Main Content -->
            <div class="lg:col-span-2 space-y-8">
                <!-- Sales Chart -->
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 class="text-lg font-bold mb-6">Revenue Overview (Last 7 Days)</h3>
                    <div class="h-64 flex items-end space-x-4">
                        <div v-for="day in stats?.salesTrend" :key="day.date"
                            class="flex-1 flex flex-col items-center group">
                            <div class="w-full bg-luxora-gold/20 rounded-t relative hover:bg-luxora-gold/40 transition-all duration-300"
                                :style="{ height: `${(day.amount / maxSales) * 100}%` }">
                                <div
                                    class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    ₹{{ day.amount.toLocaleString() }}
                                </div>
                            </div>
                            <span class="text-xs text-gray-500 mt-2">{{ new Date(day.date).toLocaleDateString('en-US', {
                                weekday: 'short'
                            }) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Recent Orders -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 class="text-lg font-bold">Recent Orders</h3>
                        <NuxtLink to="/admin/orders" class="text-sm text-luxora-gold hover:underline">View All
                        </NuxtLink>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead class="bg-gray-50 text-gray-600 text-xs uppercase">
                                <tr>
                                    <th class="px-6 py-3">Order ID</th>
                                    <th class="px-6 py-3">Customer</th>
                                    <th class="px-6 py-3">Status</th>
                                    <th class="px-6 py-3">Amount</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                <tr v-for="order in stats?.recentOrders" :key="order.id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 font-medium">#{{ order.id }}</td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm font-medium">{{ order.customerName }}</div>
                                        <div class="text-xs text-gray-500">{{ order.customerEmail }}</div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="px-2 py-1 text-xs font-semibold rounded-full" :class="{
                                            'bg-yellow-100 text-yellow-800': order.deliveryStatus === 'PENDING',
                                            'bg-blue-100 text-blue-800': order.deliveryStatus === 'SHIPPED',
                                            'bg-green-100 text-green-800': order.deliveryStatus === 'DELIVERED'
                                        }">
                                            {{ order.deliveryStatus }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 font-bold">₹{{ order.total.toLocaleString() }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-8">
                <!-- Visitor Demographics -->
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 class="text-lg font-bold mb-4">Visitor Demographics</h3>

                    <div class="mb-6">
                        <h4 class="text-xs font-bold text-gray-500 uppercase mb-3">Top Countries</h4>
                        <div v-if="stats?.visitorsByCountry.length > 0" class="space-y-3">
                            <div v-for="item in stats?.visitorsByCountry" :key="item.country"
                                class="flex justify-between items-center text-sm">
                                <span class="text-gray-700">{{ item.country }}</span>
                                <span class="font-medium bg-gray-100 px-2 py-0.5 rounded-full text-xs">{{ item._count.id
                                    }}</span>
                            </div>
                        </div>
                        <div v-else class="text-sm text-gray-500">No data yet.</div>
                    </div>

                    <div>
                        <h4 class="text-xs font-bold text-gray-500 uppercase mb-3">Top Cities</h4>
                        <div v-if="stats?.visitorsByCity.length > 0" class="space-y-3">
                            <div v-for="item in stats?.visitorsByCity" :key="item.city"
                                class="flex justify-between items-center text-sm">
                                <span class="text-gray-700">{{ item.city }}</span>
                                <span class="font-medium bg-gray-100 px-2 py-0.5 rounded-full text-xs">{{ item._count.id
                                    }}</span>
                            </div>
                        </div>
                        <div v-else class="text-sm text-gray-500">No data yet.</div>
                    </div>
                </div>

                <!-- Low Stock Alert -->
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 class="text-lg font-bold mb-4 text-red-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        Low Stock Alert
                    </h3>
                    <div v-if="stats?.lowStockProducts.length > 0" class="space-y-4">
                        <div v-for="product in stats?.lowStockProducts" :key="product.id"
                            class="flex justify-between items-center">
                            <div>
                                <p class="font-medium text-sm">{{ product.name }}</p>
                                <p class="text-xs text-gray-500">Stock: {{ product.stock }}</p>
                            </div>
                            <NuxtLink :to="`/product/${product.slug}`" class="text-xs text-blue-600 hover:underline">
                                View</NuxtLink>
                        </div>
                    </div>
                    <div v-else class="text-sm text-gray-500">All products are well stocked.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: 'auth'
})

const { data: stats } = await useFetch('/api/admin/stats')

const maxSales = computed(() => {
    if (!stats.value?.salesTrend) return 100
    return Math.max(...stats.value.salesTrend.map(d => d.amount)) || 100
})
</script>
