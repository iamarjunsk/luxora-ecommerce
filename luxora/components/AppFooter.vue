<template>
  <footer class="bg-luxora-black text-luxora-gray py-12 border-t border-luxora-charcoal">
    <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 class="text-luxora-gold font-serif text-xl mb-4">LUXORA</h3>
        <p class="text-sm leading-relaxed">
          Premium jewelry for the modern individual. Elevate your style with our exquisite collection.
        </p>
      </div>
      <div>
        <h4 class="text-white uppercase tracking-wider text-sm mb-4">Shop</h4>
        <ul class="space-y-2 text-sm">
          <li>
            <NuxtLink to="/shop" class="hover:text-luxora-gold">All Products</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/shop?category=Men" class="hover:text-luxora-gold">Men's Collection</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/shop?category=Women" class="hover:text-luxora-gold">Women's Collection</NuxtLink>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="text-white uppercase tracking-wider text-sm mb-4">Help & Legal</h4>
        <ul class="space-y-2 text-sm">
          <li>
            <NuxtLink to="/contact-us" class="hover:text-luxora-gold">Contact Us</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/shipping-policy" class="hover:text-luxora-gold">Shipping Policy</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/refund-policy" class="hover:text-luxora-gold">Refund Policy</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/privacy-policy" class="hover:text-luxora-gold">Privacy Policy</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/terms-conditions" class="hover:text-luxora-gold">Terms & Conditions</NuxtLink>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="text-white uppercase tracking-wider text-sm mb-4">Newsletter</h4>
        <p class="text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
        <div class="flex">
          <input type="email" placeholder="Enter your email"
            class="bg-luxora-charcoal text-white px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-luxora-gold" />
          <button class="bg-luxora-gold text-luxora-black px-4 py-2 font-bold hover:bg-luxora-gold-light transition">
            JOIN
          </button>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-6 mt-12 pt-8 border-t border-luxora-charcoal text-center text-xs">
      &copy; {{ new Date().getFullYear() }} Luxora. All rights reserved.
    </div>
  </footer>
</template>
