<template>
    <div>
        <h1 class="text-3xl font-serif font-bold mb-8">Dashboard</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-gray-500 text-sm font-medium uppercase">Total Sales</h3>
                <p class="text-3xl font-bold mt-2">₹0.00</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-gray-500 text-sm font-medium uppercase">Total Orders</h3>
                <p class="text-3xl font-bold mt-2">0</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 class="text-gray-500 text-sm font-medium uppercase">Total Products</h3>
                <p class="text-3xl font-bold mt-2">0</p>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: 'auth'
})
</script>
