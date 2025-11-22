<template>
    <div class="container mx-auto px-6 py-12">
        <h1 class="text-3xl font-serif mb-8">Your Shopping Bag</h1>

        <div v-if="cartStore.items.length > 0" class="flex flex-col lg:flex-row gap-12">
            <!-- Cart Items -->
            <div class="flex-grow space-y-6">
                <div v-for="item in cartStore.items" :key="item.product.id"
                    class="flex gap-6 p-4 bg-white border border-gray-100 items-center">
                    <img :src="item.product.image" :alt="item.product.name" class="w-24 h-24 object-cover bg-gray-50" />

                    <div class="flex-grow">
                        <div class="flex justify-between mb-2">
                            <h3 class="font-serif text-lg">
                                <NuxtLink :to="`/product/${item.product.id}`" class="hover:text-luxora-gold">{{
                                    item.product.name }}</NuxtLink>
                            </h3>
                            <p class="font-medium">${{ (item.product.price * item.quantity).toLocaleString() }}</p>
                        </div>
                        <p class="text-xs text-gray-500 uppercase tracking-wider mb-4">{{ item.product.category }}</p>

                        <div class="flex justify-between items-center">
                            <div class="flex items-center border border-gray-200">
                                <button @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                                    class="px-3 py-1 hover:bg-gray-50">-</button>
                                <span class="px-3 py-1 text-sm">{{ item.quantity }}</span>
                                <button @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                                    class="px-3 py-1 hover:bg-gray-50">+</button>
                            </div>
                            <button @click="cartStore.removeFromCart(item.product.id)"
                                class="text-sm text-red-500 hover:text-red-700 underline">Remove</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Summary -->
            <div class="w-full lg:w-96 flex-shrink-0">
                <div class="bg-white border border-gray-100 p-6 sticky top-24">
                    <h2 class="text-xl font-serif mb-6">Order Summary</h2>

                    <div class="space-y-4 mb-6 border-b border-gray-100 pb-6">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Subtotal</span>
                            <span class="font-medium">${{ cartStore.cartTotal.toLocaleString() }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Shipping</span>
                            <span class="font-medium">Free</span>
                        </div>
                    </div>

                    <div class="flex justify-between text-lg font-serif mb-8">
                        <span>Total</span>
                        <span>${{ cartStore.cartTotal.toLocaleString() }}</span>
                    </div>

                    <NuxtLink to="/checkout"
                        class="block w-full bg-luxora-black text-white text-center py-4 font-bold tracking-widest hover:bg-luxora-gold hover:text-luxora-black transition-colors duration-300">
                        PROCEED TO CHECKOUT
                    </NuxtLink>
                </div>
            </div>
        </div>

        <div v-else class="text-center py-20">
            <p class="text-xl text-gray-500 mb-6">Your bag is empty.</p>
            <NuxtLink to="/shop"
                class="inline-block bg-luxora-gold text-luxora-black px-8 py-3 font-bold tracking-widest hover:bg-luxora-gold-light transition">
                START SHOPPING
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
</script>
