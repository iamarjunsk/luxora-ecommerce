<template>
    <div class="container mx-auto px-6 py-12 max-w-4xl">
        <h1 class="text-3xl font-serif mb-8 text-center">Checkout</h1>

        <div v-if="!orderPlaced" class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Form -->
            <div class="space-y-6">
                <h2 class="text-xl font-serif mb-4">Shipping Information</h2>
                <div class="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name"
                        class="border border-gray-300 p-3 w-full focus:outline-none focus:border-luxora-gold" />
                    <input type="text" placeholder="Last Name"
                        class="border border-gray-300 p-3 w-full focus:outline-none focus:border-luxora-gold" />
                </div>
                <input type="email" placeholder="Email Address"
                    class="border border-gray-300 p-3 w-full focus:outline-none focus:border-luxora-gold" />
                <input type="text" placeholder="Address"
                    class="border border-gray-300 p-3 w-full focus:outline-none focus:border-luxora-gold" />
                <div class="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="City"
                        class="border border-gray-300 p-3 w-full focus:outline-none focus:border-luxora-gold" />
                    <input type="text" placeholder="Zip Code"
                        class="border border-gray-300 p-3 w-full focus:outline-none focus:border-luxora-gold" />
                </div>

                <h2 class="text-xl font-serif mb-4 mt-8">Payment Details</h2>
                <input type="text" placeholder="Card Number"
                    class="border border-gray-300 p-3 w-full focus:outline-none focus:border-luxora-gold" />
                <div class="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY"
                        class="border border-gray-300 p-3 w-full focus:outline-none focus:border-luxora-gold" />
                    <input type="text" placeholder="CVC"
                        class="border border-gray-300 p-3 w-full focus:outline-none focus:border-luxora-gold" />
                </div>
            </div>

            <!-- Order Summary -->
            <div class="bg-gray-50 p-8 h-fit">
                <h2 class="text-xl font-serif mb-6">Your Order</h2>
                <div class="space-y-4 mb-6 border-b border-gray-200 pb-6">
                    <div v-for="item in cartStore.items" :key="item.product.id" class="flex justify-between text-sm">
                        <span>{{ item.product.name }} x {{ item.quantity }}</span>
                        <span class="font-medium">₹{{ (item.product.price * item.quantity).toLocaleString() }}</span>
                    </div>
                </div>
                <div class="flex justify-between text-lg font-serif mb-8">
                    <span>Total</span>
                    <span>₹{{ cartStore.cartTotal.toLocaleString() }}</span>
                </div>
                <button @click="placeOrder"
                    class="block w-full bg-luxora-black text-white py-4 font-bold tracking-widest hover:bg-luxora-gold hover:text-luxora-black transition-colors duration-300">
                    PLACE ORDER
                </button>
            </div>
        </div>

        <!-- Success Message -->
        <div v-else class="text-center py-20 animate-fade-in-up">
            <div
                class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-10 h-10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </div>
            <h2 class="text-3xl font-serif mb-4">Order Placed Successfully!</h2>
            <p class="text-gray-600 mb-8">Thank you for your purchase. You will receive a confirmation email shortly.
            </p>
            <NuxtLink to="/"
                class="inline-block bg-luxora-gold text-luxora-black px-8 py-3 font-bold tracking-widest hover:bg-luxora-gold-light transition">
                CONTINUE SHOPPING
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const orderPlaced = ref(false)

const placeOrder = () => {
    // Simulate API call
    setTimeout(() => {
        orderPlaced.value = true
        cartStore.clearCart()
    }, 1000)
}
</script>

<style scoped>
.animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
