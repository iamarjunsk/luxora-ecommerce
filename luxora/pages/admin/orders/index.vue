<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-serif font-bold">Orders</h1>
        </div>

        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Delivery
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                        </th>
                        <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="order in orders" :key="order.id">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">#{{ order.id }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ order.customerName }}</div>
                            <div class="text-sm text-gray-500">{{ order.customerEmail }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">{{ new Date(order.createdAt).toLocaleDateString() }}
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span
                                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {{ order.status }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="{
                                'bg-yellow-100 text-yellow-800': order.deliveryStatus === 'PENDING',
                                'bg-blue-100 text-blue-800': order.deliveryStatus === 'SHIPPED',
                                'bg-green-100 text-green-800': order.deliveryStatus === 'DELIVERED'
                            }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                                {{ order.deliveryStatus }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">₹{{ order.total.toLocaleString() }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button @click="viewOrderDetails(order)"
                                class="text-luxora-gold hover:text-luxora-black">View</button>
                        </td>
                    </tr>
                    <tr v-if="orders.length === 0">
                        <td colspan="7" class="px-6 py-4 text-center text-sm text-gray-500">
                            No orders found.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Order Details Modal -->
        <div v-if="selectedOrder" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <h2 class="text-2xl font-serif font-bold">Order #{{ selectedOrder.id }}</h2>
                        <p class="text-sm text-gray-500">{{ new Date(selectedOrder.createdAt).toLocaleString() }}</p>
                    </div>
                    <button @click="selectedOrder = null" class="text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Close</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 class="font-bold text-gray-900 mb-2">Customer Details</h3>
                        <p class="text-sm text-gray-600">{{ selectedOrder.customerName }}</p>
                        <p class="text-sm text-gray-600">{{ selectedOrder.customerEmail }}</p>
                        <p class="text-sm text-gray-600 mt-2">{{ selectedOrder.customerAddress }}</p>
                        <p class="text-sm text-gray-600">{{ selectedOrder.customerCity }}, {{ selectedOrder.customerZip
                        }}</p>
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-900 mb-2">Payment Info</h3>
                        <p class="text-sm text-gray-600">Status: <span class="font-semibold text-green-600">{{
                            selectedOrder.status }}</span></p>
                        <p class="text-sm text-gray-600">Payment ID: {{ selectedOrder.paymentId }}</p>
                        <p class="text-sm text-gray-600 mt-2">Total: <span class="font-bold text-lg">₹{{
                            selectedOrder.total.toLocaleString() }}</span></p>

                        <div class="mt-4">
                            <h3 class="font-bold text-gray-900 mb-2">Delivery Status</h3>
                            <select v-model="selectedOrder.deliveryStatus" @change="updateStatus(selectedOrder)"
                                class="border border-gray-300 rounded p-2 text-sm w-full">
                                <option value="PENDING">PENDING</option>
                                <option value="SHIPPED">SHIPPED</option>
                                <option value="DELIVERED">DELIVERED</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="font-bold text-gray-900 mb-4">Order Items</h3>
                    <div class="border rounded-lg overflow-hidden">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product
                                    </th>
                                    <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Qty
                                    </th>
                                    <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Price
                                    </th>
                                    <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                <tr v-for="item in selectedOrder.items" :key="item.id">
                                    <td class="px-4 py-2 text-sm text-gray-900">{{ item.product.name }}</td>
                                    <td class="px-4 py-2 text-sm text-gray-900 text-right">{{ item.quantity }}</td>
                                    <td class="px-4 py-2 text-sm text-gray-900 text-right">₹{{
                                        item.price.toLocaleString() }}</td>
                                    <td class="px-4 py-2 text-sm text-gray-900 text-right font-medium">₹{{ (item.price *
                                        item.quantity).toLocaleString() }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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

const { data: orders, refresh } = await useFetch('/api/orders')
const { showSnackbar } = useSnackbar()
const selectedOrder = ref(null)

function viewOrderDetails(order) {
    selectedOrder.value = order
}

async function updateStatus(order) {
    try {
        await $fetch(`/api/orders/${order.id}`, {
            method: 'PUT',
            body: { deliveryStatus: order.deliveryStatus }
        })
        await refresh()
        showSnackbar('Status updated successfully', 'success')
    } catch (e) {
        showSnackbar('Failed to update status', 'error')
    }
}
</script>
