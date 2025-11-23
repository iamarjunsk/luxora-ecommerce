<template>
    <div class="container mx-auto px-6 py-12">
        <div class="flex flex-col md:flex-row gap-12">
            <!-- Sidebar Filters -->
            <aside class="w-full md:w-64 flex-shrink-0">
                <h2 class="text-xl font-serif mb-6 border-b border-gray-200 pb-2">Filters</h2>

                <div class="mb-8">
                    <h3 class="font-bold text-sm uppercase tracking-wider mb-4">Category</h3>
                    <ul class="space-y-2 text-sm">
                        <li>
                            <button @click="selectedCategory = null"
                                :class="{ 'text-luxora-gold font-bold': !selectedCategory }"
                                class="hover:text-luxora-gold transition">All Categories</button>
                        </li>
                        <li>
                            <button @click="selectedCategory = 'Men'"
                                :class="{ 'text-luxora-gold font-bold': selectedCategory === 'Men' }"
                                class="hover:text-luxora-gold transition">Men's Collection</button>
                        </li>
                        <li>
                            <button @click="selectedCategory = 'Women'"
                                :class="{ 'text-luxora-gold font-bold': selectedCategory === 'Women' }"
                                class="hover:text-luxora-gold transition">Women's Collection</button>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="font-bold text-sm uppercase tracking-wider mb-4">Price Range</h3>
                    <div class="flex items-center gap-2 text-sm">
                        <span class="text-gray-500">Min: ₹0</span>
                        <span class="text-gray-500">-</span>
                        <span class="text-gray-500">Max: ₹5000+</span>
                    </div>
                    <input type="range" min="0" max="5000" class="w-full mt-2 accent-luxora-gold" />
                </div>
            </aside>

            <!-- Product Grid -->
            <div class="flex-grow">
                <div class="flex justify-between items-center mb-8">
                    <h1 class="text-3xl font-serif">{{ pageTitle }}</h1>
                    <span class="text-sm text-gray-500">{{ filteredProducts.length }} Products</span>
                </div>

                <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
                </div>
                <div v-else class="text-center py-20 text-gray-500">
                    No products found in this category.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProductStore } from '~/stores/products'
import { storeToRefs } from 'pinia'

const route = useRoute()
const productStore = useProductStore()
const { products } = storeToRefs(productStore)

// Fetch products if not already loaded or force refresh
await useAsyncData('shop-products', async () => {
    await productStore.fetchProducts()
    return true
})

const selectedCategory = ref(route.query.category || null)

// Watch for route query changes
watch(() => route.query.category, (newCategory) => {
    selectedCategory.value = newCategory || null
})

const filteredProducts = computed(() => {
    if (!selectedCategory.value) return products.value
    return products.value.filter(p => p.category === selectedCategory.value)
})

const pageTitle = computed(() => {
    return selectedCategory.value ? `${selectedCategory.value}'s Collection` : 'All Products'
})
</script>
