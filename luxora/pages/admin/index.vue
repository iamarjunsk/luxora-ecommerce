<template>
    <div>
        <div class="mb-8">
            <h1 class="text-4xl font-serif font-bold text-gray-900">Dashboard</h1>
            <p class="text-gray-500 mt-2">Welcome back! Here's what's happening today.</p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <!-- Total Sales Card -->
            <div
                class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-md border border-yellow-200 hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-yellow-700 text-sm font-semibold uppercase tracking-wide">Total Sales</h3>
                        <p class="text-3xl font-bold mt-3 text-yellow-900">₹{{ stats?.totalSales.toLocaleString() }}</p>
                    </div>
                    <div class="bg-yellow-500 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="white" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Total Orders Card -->
            <div
                class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md border border-blue-200 hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-blue-700 text-sm font-semibold uppercase tracking-wide">Total Orders</h3>
                        <p class="text-3xl font-bold mt-3 text-blue-900">{{ stats?.totalOrders }}</p>
                    </div>
                    <div class="bg-blue-500 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="white" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Total Products Card -->
            <div
                class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-md border border-purple-200 hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-purple-700 text-sm font-semibold uppercase tracking-wide">Total Products</h3>
                        <p class="text-3xl font-bold mt-3 text-purple-900">{{ stats?.totalProducts }}</p>
                    </div>
                    <div class="bg-purple-500 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="white" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Customers Card -->
            <div
                class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-md border border-green-200 hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-green-700 text-sm font-semibold uppercase tracking-wide">Customers</h3>
                        <p class="text-3xl font-bold mt-3 text-green-900">{{ stats?.totalCustomers }}</p>
                    </div>
                    <div class="bg-green-500 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="white" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Main Content -->
            <div class="lg:col-span-2 space-y-8">
                <!-- Sales Chart -->
                <div class="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-gray-900">Revenue Overview</h3>
                        <span class="text-sm text-gray-500">Last 7 Days</span>
                    </div>
                    <div class="h-72 flex items-end space-x-2">
                        <div v-for="day in stats?.salesTrend" :key="day.date"
                            class="flex-1 flex flex-col items-center group">
                            <div class="w-full bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg relative hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300 shadow-md"
                                :style="{ height: `${(day.amount / maxSales) * 100}%` }">
                                <div
                                    class="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap">
                                    ₹{{ day.amount.toLocaleString() }}
                                </div>
                            </div>
                            <span class="text-xs text-gray-600 mt-3 font-medium">{{ new
                                Date(day.date).toLocaleDateString('en-US', {
                                    weekday: 'short'
                                }) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Recent Orders -->
                <div class="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    <div class="px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                        <h3 class="text-xl font-bold text-gray-900">Recent Orders</h3>
                        <NuxtLink to="/admin/orders"
                            class="text-sm text-yellow-600 hover:text-yellow-700 font-semibold flex items-center gap-1">
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </NuxtLink>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead class="bg-gray-50 text-gray-700 text-xs font-semibold uppercase tracking-wider">
                                <tr>
                                    <th class="px-8 py-4">Order ID</th>
                                    <th class="px-8 py-4">Customer</th>
                                    <th class="px-8 py-4">Status</th>
                                    <th class="px-8 py-4">Amount</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                <tr v-for="order in stats?.recentOrders" :key="order.id"
                                    class="hover:bg-gray-50 transition-colors">
                                    <td class="px-8 py-5 font-bold text-gray-900">#{{ order.id }}</td>
                                    <td class="px-8 py-5">
                                        <div class="text-sm font-medium text-gray-900">{{ order.customerName }}</div>
                                        <div class="text-xs text-gray-500">{{ order.customerEmail }}</div>
                                    </td>
                                    <td class="px-8 py-5">
                                        <span class="px-3 py-1.5 text-xs font-bold rounded-full" :class="{
                                            'bg-yellow-100 text-yellow-700': order.deliveryStatus === 'PENDING',
                                            'bg-blue-100 text-blue-700': order.deliveryStatus === 'SHIPPED',
                                            'bg-green-100 text-green-700': order.deliveryStatus === 'DELIVERED'
                                        }">
                                            {{ order.deliveryStatus }}
                                        </span>
                                    </td>
                                    <td class="px-8 py-5 font-bold text-gray-900">₹{{ order.total.toLocaleString() }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-8">
                <!-- Visitor Demographics -->
                <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h3 class="text-lg font-bold mb-6 text-gray-900 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-5 h-5 mr-2 text-blue-500">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        Visitor Demographics
                    </h3>

                    <div class="mb-6">
                        <h4 class="text-xs font-bold text-gray-500 uppercase mb-3">Top Countries</h4>
                        <div v-if="stats?.visitorsByCountry.length > 0" class="space-y-3">
                            <div v-for="item in stats?.visitorsByCountry" :key="item.country"
                                class="flex justify-between items-center">
                                <span class="text-sm text-gray-700 font-medium">{{ item.country }}</span>
                                <span class="font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">{{
                                    item._count.id }}</span>
                            </div>
                        </div>
                        <div v-else class="text-sm text-gray-400 italic">No data yet.</div>
                    </div>

                    <div>
                        <h4 class="text-xs font-bold text-gray-500 uppercase mb-3">Top Cities</h4>
                        <div v-if="stats?.visitorsByCity.length > 0" class="space-y-3">
                            <div v-for="item in stats?.visitorsByCity" :key="item.city"
                                class="flex justify-between items-center">
                                <span class="text-sm text-gray-700 font-medium">{{ item.city }}</span>
                                <span class="font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">{{
                                    item._count.id }}</span>
                            </div>
                        </div>
                        <div v-else class="text-sm text-gray-400 italic">No data yet.</div>
                    </div>
                </div>

                <!-- Low Stock Alert -->
                <div class="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl shadow-md border-2 border-red-200">
                    <h3 class="text-lg font-bold mb-4 text-red-700 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-6 h-6 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        Low Stock Alert
                    </h3>
                    <div v-if="stats?.lowStockProducts.length > 0" class="space-y-4">
                        <div v-for="product in stats?.lowStockProducts" :key="product.id"
                            class="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                            <div>
                                <p class="font-semibold text-sm text-gray-900">{{ product.name }}</p>
                                <p class="text-xs text-red-600 mt-1 font-medium">Only {{ product.stock }} left!</p>
                            </div>
                            <NuxtLink :to="`/product/${product.slug}`"
                                class="text-xs bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition-colors font-semibold">
                                Restock
                            </NuxtLink>
                        </div>
                    </div>
                    <div v-else class="text-sm text-green-700 bg-green-100 p-3 rounded-lg font-medium">✓ All products
                        are well stocked.</div>
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
