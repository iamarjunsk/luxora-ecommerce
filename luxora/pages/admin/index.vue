<template>
    <div>
        <h1 class="text-3xl font-serif mb-8">Dashboard</h1>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-gray-500 text-sm uppercase tracking-wider mb-2">Total Sales</h3>
                <p class="text-3xl font-bold text-luxora-gold">$12,450</p>
                <span class="text-green-500 text-sm">+15% from last month</span>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-gray-500 text-sm uppercase tracking-wider mb-2">Total Orders</h3>
                <p class="text-3xl font-bold text-luxora-black">45</p>
                <span class="text-green-500 text-sm">+8% from last month</span>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-gray-500 text-sm uppercase tracking-wider mb-2">Total Products</h3>
                <p class="text-3xl font-bold text-luxora-black">{{ productStore.products.length }}</p>
                <span class="text-gray-400 text-sm">Active Inventory</span>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 class="text-xl font-serif mb-6">Recent Orders</h2>
            <table class="w-full text-left">
                <thead>
                    <tr class="border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                        <th class="pb-4">Order ID</th>
                        <th class="pb-4">Customer</th>
                        <th class="pb-4">Date</th>
                        <th class="pb-4">Total</th>
                        <th class="pb-4">Status</th>
                    </tr>
                </thead>
                <tbody class="text-sm">
                    <tr class="border-b border-gray-50">
                        <td class="py-4">#ORD-001</td>
                        <td class="py-4">John Doe</td>
                        <td class="py-4">Oct 24, 2023</td>
                        <td class="py-4">$250.00</td>
                        <td class="py-4"><span
                                class="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-bold">Completed</span>
                        </td>
                    </tr>
                    <tr class="border-b border-gray-50">
                        <td class="py-4">#ORD-002</td>
                        <td class="py-4">Jane Smith</td>
                        <td class="py-4">Oct 23, 2023</td>
                        <td class="py-4">$1,200.00</td>
                        <td class="py-4"><span
                                class="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs font-bold">Pending</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="py-4">#ORD-003</td>
                        <td class="py-4">Mike Johnson</td>
                        <td class="py-4">Oct 22, 2023</td>
                        <td class="py-4">$850.00</td>
                        <td class="py-4"><span
                                class="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-bold">Shipped</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { useProductStore } from '~/stores/products'

definePageMeta({
    layout: 'admin'
})

const productStore = useProductStore()
</script>
