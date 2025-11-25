<template>
    <div class="container mx-auto px-6 py-12 max-w-4xl">
        <h1 class="text-3xl font-serif mb-8 text-center">Checkout</h1>

        <div v-if="!orderPlaced" class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Form -->
            <!-- Form -->
            <div class="space-y-6">
                <h2 class="text-xl font-serif mb-4">Shipping Information</h2>
                <div class="grid grid-cols-2 gap-4">
                    <input v-model="customer.firstName" type="text" placeholder="First Name" required
                        class="border border-gray-300 p-3 w-full focus:outline-none focus:border-luxora-gold" />
                    <input v-model="customer.lastName" type="text" placeholder="Last Name" required
                        class="border border-gray-300 p-3 w-full focus:outline-none focus:border-luxora-gold" />
                </div>
                <input v-model="customer.email" type="email" placeholder="Email Address" required
                    class="border border-gray-300 p-3 w-full focus:outline-none focus:border-luxora-gold" />
                <input v-model="customer.address" type="text" placeholder="Address" required
                    class="border border-gray-300 p-3 w-full focus:outline-none focus:border-luxora-gold" />
                <div class="grid grid-cols-2 gap-4">
                    <input v-model="customer.city" type="text" placeholder="City" required
                        class="border border-gray-300 p-3 w-full focus:outline-none focus:border-luxora-gold" />
                    <input v-model="customer.zip" type="text" placeholder="Zip Code" required
                        class="border border-gray-300 p-3 w-full focus:outline-none focus:border-luxora-gold" />
                </div>

                <h2 class="text-xl font-serif mb-4 mt-8">Payment Details</h2>
                <div class="bg-gray-50 p-4 rounded border border-gray-200">
                    <p class="text-sm text-gray-600 mb-2">Secure Payment via Razorpay</p>
                    <p class="text-xs text-gray-500">You will be redirected to Razorpay to complete your payment
                        securely.</p>
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
import { useSnackbar } from '~/composables/useSnackbar'

definePageMeta({
    middleware: 'user-auth'
})

const cartStore = useCartStore()
const { showSnackbar } = useSnackbar()
const router = useRouter()
const { user } = useAuth()
const orderPlaced = ref(false)
const config = useRuntimeConfig()

const customer = ref({
    firstName: user.value?.name?.split(' ')[0] || '',
    lastName: user.value?.name?.split(' ').slice(1).join(' ') || '',
    email: user.value?.email || '',
    address: user.value?.address || '',
    city: user.value?.city || '',
    zip: user.value?.zip || ''
})

// Watch for user changes (e.g. on page load)
watchEffect(() => {
    if (user.value) {
        if (!customer.value.firstName) customer.value.firstName = user.value.name?.split(' ')[0] || ''
        if (!customer.value.lastName) customer.value.lastName = user.value.name?.split(' ').slice(1).join(' ') || ''
        if (!customer.value.email) customer.value.email = user.value.email || ''
        if (!customer.value.address) customer.value.address = user.value.address || ''
        if (!customer.value.city) customer.value.city = user.value.city || ''
        if (!customer.value.zip) customer.value.zip = user.value.zip || ''
    }
})

// Load Razorpay script
useHead({
    script: [
        {
            src: 'https://checkout.razorpay.com/v1/checkout.js',
            async: true,
            defer: true
        }
    ]
})

const placeOrder = async () => {
    // Basic validation
    if (!customer.value.firstName || !customer.value.email || !customer.value.address) {
        showSnackbar('Please fill in all required shipping details', 'error')
        return
    }

    try {
        // 1. Create Order
        const order = await $fetch('/api/payment/create-order', {
            method: 'POST',
            body: { amount: cartStore.cartTotal }
        })

        // 2. Initialize Razorpay
        const options = {
            key: config.public.razorpayKeyId,
            amount: order.amount,
            currency: order.currency,
            name: 'Luxora',
            description: 'Purchase from Luxora',
            image: config.public.assets.logo,
            order_id: order.id,
            handler: async function (response) {
                // 3. Verify Payment & Save Order
                try {
                    const verifyResponse = await $fetch('/api/payment/verify', {
                        method: 'POST',
                        body: {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            customer: customer.value,
                            items: cartStore.items.map(item => ({
                                productId: item.product.id,
                                quantity: item.quantity,
                                price: item.product.price
                            })),
                            userId: user.value?.id // Pass user ID if logged in
                        }
                    })
                    orderPlaced.value = true
                    cartStore.clearCart()
                } catch (e) {
                    showSnackbar('Payment verification failed', 'error')
                }
            },
            prefill: {
                name: `${customer.value.firstName} ${customer.value.lastName}`,
                email: customer.value.email,
                contact: '9999999999'
            },
            theme: {
                color: '#D4AF37' // Luxora Gold
            }
        }

        const rzp1 = new Razorpay(options)
        rzp1.open()
    } catch (e) {
        showSnackbar('Failed to initiate payment', 'error')
    }
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
