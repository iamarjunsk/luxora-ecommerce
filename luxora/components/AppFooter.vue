<template>
  <footer class="bg-luxora-black text-white py-16 border-t border-luxora-charcoal">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <!-- Brand (4 cols) -->
        <div class="md:col-span-4">
          <div class="mb-8 w-32">
            <NuxtImg :src="config.public.assets.logo" alt="Luxora" class="w-full h-auto brightness-0 invert" />
          </div>
          <p class="text-gray-400 text-sm leading-relaxed font-light max-w-xs">
            Premium jewelry for the modern individual. Elevate your style with our exquisite collection of timeless pieces.
          </p>
        </div>

        <!-- Links (2 cols) -->
        <div class="md:col-span-2">
          <h4 class="font-serif text-lg mb-6">Shop</h4>
          <ul class="space-y-4 text-sm text-gray-400">
            <li>
              <NuxtLink to="/shop" class="hover:text-white transition-colors">All Products</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/shop?category=Men" class="hover:text-white transition-colors">Men's Collection</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/shop?category=Women" class="hover:text-white transition-colors">Women's Collection</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/shop?sort=newest" class="hover:text-white transition-colors">New Arrivals</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal (2 cols) -->
        <div class="md:col-span-2">
          <h4 class="font-serif text-lg mb-6">Support</h4>
          <ul class="space-y-4 text-sm text-gray-400">
            <li>
              <NuxtLink to="/contact-us" class="hover:text-white transition-colors">Contact Us</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/shipping-policy" class="hover:text-white transition-colors">Shipping Policy</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/refund-policy" class="hover:text-white transition-colors">Returns & Refunds</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy-policy" class="hover:text-white transition-colors">Privacy Policy</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter (4 cols) -->
        <div class="md:col-span-4">
          <h4 class="font-serif text-lg mb-6">Stay Connected</h4>
          <p class="text-gray-400 text-sm mb-6 font-light">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <div class="flex flex-col gap-4">
            <div class="relative">
              <input type="email" placeholder="Enter your email"
                class="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder-gray-600" />
              <button class="absolute right-0 top-3 text-xs font-bold uppercase tracking-widest hover:text-luxora-gold transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="pt-8 border-t border-gray-900 text-center">
        <p class="text-xs text-gray-600 uppercase tracking-widest">
          &copy; {{ new Date().getFullYear() }} Luxora. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const config = useRuntimeConfig()
</script>
