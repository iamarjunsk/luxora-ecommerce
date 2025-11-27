<template>
    <div class="min-h-screen bg-white pt-12 pb-24">
        <div class="container mx-auto px-6">
            <!-- Header -->
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-5xl font-serif text-luxora-black mb-4">Your Shopping Bag</h1>
                <p class="text-gray-500 tracking-wide uppercase text-xs">
                    {{ cartStore.cartCount }} {{ cartStore.cartCount === 1 ? 'Item' : 'Items' }}
                </p>
            </div>

            <div v-if="cartStore.items.length > 0" class="flex flex-col lg:flex-row gap-12 lg:gap-24">
                <!-- Cart Items -->
                <div class="flex-grow space-y-8">
                    <div v-for="item in cartStore.items" :key="item.product.id"
                        class="flex gap-6 py-6 border-b border-gray-100 last:border-0">
                        <!-- Product Image -->
                        <NuxtImg :src="item.product.images?.[0]?.url || config.public.assets.placeholder.product"
                            :alt="item.product.name" 
                            class="w-32 h-40 object-cover bg-gray-50" />

                        <!-- Product Details -->
                        <div class="flex-grow flex flex-col justify-between">
                            <div>
                                <div class="flex justify-between items-start mb-2">
                                    <h3 class="font-serif text-xl text-luxora-black">
                                        <NuxtLink :to="`/product/${item.product.id}`" class="hover:text-luxora-gold transition-colors">
                                            {{ item.product.name }}
                                        </NuxtLink>
                                    </h3>
                                    <p class="font-bold text-lg">₹{{ (item.product.price * item.quantity).toLocaleString() }}</p>
                                </div>
                                <p class="text-xs text-gray-500 uppercase tracking-widest mb-4">{{ item.product.category }}</p>
                            </div>

                            <div class="flex justify-between items-end">
                                <!-- Quantity Selector -->
                                <div class="flex items-center border border-gray-200">
                                    <button @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                                        class="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-500 transition-colors"
                                        :disabled="item.quantity <= 1">
                                        -
                                    </button>
                                    <span class="w-10 h-8 flex items-center justify-center text-sm font-medium">{{ item.quantity }}</span>
                                    <button @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                                        class="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-500 transition-colors">
                                        +
                                    </button>
                                </div>

                                <!-- Remove Button -->
                                <button @click="cartStore.removeFromCart(item.product.id)"
                                    class="text-xs text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors border-b border-transparent hover:border-red-500 pb-0.5">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Order Summary -->
                <div class="w-full lg:w-[400px] flex-shrink-0">
                    <div class="bg-gray-50 p-8 sticky top-24">
                        <h2 class="text-xl font-serif mb-8 text-luxora-black">Order Summary</h2>

                        <div class="space-y-4 mb-8 border-b border-gray-200 pb-8">
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Subtotal</span>
                                <span class="font-medium">₹{{ cartStore.cartTotal.toLocaleString() }}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Shipping</span>
                                <span class="font-medium text-green-600">Free</span>
                            </div>
                        </div>

                        <div class="flex justify-between text-xl font-serif mb-8 text-luxora-black">
                            <span>Total</span>
                            <span>₹{{ cartStore.cartTotal.toLocaleString() }}</span>
                        </div>

                        <NuxtLink to="/checkout"
                            class="block w-full bg-luxora-black text-white text-center py-4 font-bold tracking-widest uppercase hover:bg-luxora-gold hover:text-luxora-black transition-colors duration-300">
                            Proceed to Checkout
                        </NuxtLink>
                        
                        <div class="mt-6 text-center">
                            <NuxtLink to="/shop" class="text-xs text-gray-500 hover:text-luxora-black border-b border-gray-300 hover:border-luxora-black pb-0.5 transition-all">
                                Continue Shopping
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="flex flex-col items-center justify-center py-20 text-center">
                <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBagIcon class="h-10 w-10 text-gray-300" />
                </div>
                <h2 class="text-2xl font-serif text-luxora-black mb-3">Your bag is empty</h2>
                <p class="text-gray-500 mb-8 max-w-md">
                    Looks like you haven't added any items to your bag yet.
                </p>
                <NuxtLink to="/shop"
                    class="inline-block bg-luxora-black text-white px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-luxora-gold hover:text-luxora-black transition-colors duration-300">
                    Start Shopping
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'

const config = useRuntimeConfig()
const cartStore = useCartStore()
</script>
