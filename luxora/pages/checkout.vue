<template>
    <div class="min-h-screen bg-white pt-12 pb-24">
        <div class="container mx-auto px-6">
            <!-- Header -->
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-5xl font-serif text-luxora-black mb-4">Checkout</h1>
                <p class="text-gray-500 tracking-wide uppercase text-xs">Secure Payment</p>
            </div>

            <div v-if="!orderPlaced" class="flex flex-col lg:flex-row gap-12 lg:gap-24">
                <!-- Left Column: Forms -->
                <div class="flex-grow space-y-12">
                    <!-- Shipping Information -->
                    <div>
                        <h2 class="text-xl font-serif mb-6 text-luxora-black border-b border-gray-100 pb-4">Shipping Information</h2>
                        <div class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="text-xs font-bold uppercase tracking-widest text-gray-500">First Name</label>
                                    <input v-model="customer.firstName" type="text" required
                                        class="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxora-black transition-colors bg-transparent" />
                                </div>
                                <div class="space-y-2">
                                    <label class="text-xs font-bold uppercase tracking-widest text-gray-500">Last Name</label>
                                    <input v-model="customer.lastName" type="text" required
                                        class="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxora-black transition-colors bg-transparent" />
                                </div>
                            </div>

                            <div class="space-y-2">
                                <label class="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                                <input v-model="customer.email" type="email" required
                                    class="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxora-black transition-colors bg-transparent" />
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="text-xs font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
                                    <input v-model="customer.phone" type="tel" required
                                        class="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxora-black transition-colors bg-transparent" />
                                </div>
                                <div class="space-y-2">
                                    <label class="text-xs font-bold uppercase tracking-widest text-gray-500">Address</label>
                                    <input v-model="customer.address" type="text" required
                                        class="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxora-black transition-colors bg-transparent" />
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="text-xs font-bold uppercase tracking-widest text-gray-500">City</label>
                                    <input v-model="customer.city" type="text" required
                                        class="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxora-black transition-colors bg-transparent" />
                                </div>
                                <div class="space-y-2">
                                    <label class="text-xs font-bold uppercase tracking-widest text-gray-500">Zip Code</label>
                                    <input v-model="customer.zip" type="text" required
                                        class="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxora-black transition-colors bg-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Payment Details -->
                    <div>
                        <h2 class="text-xl font-serif mb-6 text-luxora-black border-b border-gray-100 pb-4">Payment Method</h2>
                        <div class="bg-gray-50 p-6 border border-gray-100 flex items-center gap-4">
                            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-luxora-gold">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                            </div>
                            <div>
                                <p class="font-bold text-sm text-luxora-black">Secure Payment via Razorpay</p>
                                <p class="text-xs text-gray-500 mt-1">You will be redirected to Razorpay to complete your payment securely.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Order Summary -->
                <div class="w-full lg:w-[400px] flex-shrink-0">
                    <div class="bg-gray-50 p-8 sticky top-24 border border-gray-100">
                        <h2 class="text-xl font-serif mb-8 text-luxora-black">Your Order</h2>
                        
                        <div class="space-y-6 mb-8 border-b border-gray-200 pb-8 max-h-96 overflow-y-auto custom-scrollbar">
                            <div v-for="item in cartStore.items" :key="item.product.id" class="flex gap-4">
                                <NuxtImg :src="item.product.images?.[0]?.url || config.public.assets.placeholder.product"
                                    :alt="item.product.name" class="w-16 h-20 object-cover bg-white" />
                                <div class="flex-grow">
                                    <p class="font-serif text-sm text-luxora-black mb-1">{{ item.product.name }}</p>
                                    <p class="text-xs text-gray-500 mb-2">Qty: {{ item.quantity }}</p>
                                    <p class="font-medium text-sm">₹{{ (item.product.price * item.quantity).toLocaleString() }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-3 mb-8">
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Subtotal</span>
                                <span class="font-medium">₹{{ cartStore.cartTotal.toLocaleString() }}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Shipping</span>
                                <span class="font-medium text-green-600">Free</span>
                            </div>
                        </div>

                        <div class="flex justify-between text-xl font-serif mb-8 text-luxora-black pt-6 border-t border-gray-200">
                            <span>Total</span>
                            <span>₹{{ cartStore.cartTotal.toLocaleString() }}</span>
                        </div>

                        <button @click="placeOrder" :disabled="!isFormValid"
                            :class="{ 'opacity-50 cursor-not-allowed': !isFormValid, 'hover:bg-luxora-gold hover:text-luxora-black': isFormValid }"
                            class="block w-full bg-luxora-black text-white py-4 font-bold tracking-widest uppercase transition-colors duration-300">
                            Place Order
                        </button>
                        
                        <p class="text-xs text-gray-400 text-center mt-4">
                            By placing your order, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Success Message -->
            <div v-else class="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
                <div class="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-12 h-12 text-green-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
                <h2 class="text-4xl font-serif text-luxora-black mb-4">Order Placed Successfully!</h2>
                <p class="text-gray-500 mb-10 max-w-md">
                    Thank you for your purchase. A confirmation email has been sent to {{ customer.email }}.
                </p>
                <NuxtLink to="/"
                    class="inline-block bg-luxora-black text-white px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-luxora-gold hover:text-luxora-black transition-colors duration-300">
                    Continue Shopping
                </NuxtLink>
            </div>
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
    zip: user.value?.zip || '',
    phone: ''
})

const isFormValid = computed(() => {
    return customer.value.firstName &&
        customer.value.lastName &&
        customer.value.email &&
        customer.value.phone &&
        customer.value.address &&
        customer.value.city &&
        customer.value.zip
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
                contact: customer.value.phone
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

/* Custom Scrollbar for Order Summary */
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}
</style>
