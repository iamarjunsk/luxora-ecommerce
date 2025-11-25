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
                            <button @click="selectCategory(null)"
                                :class="{ 'text-luxora-gold font-bold': !selectedCategory }"
                                class="hover:text-luxora-gold transition text-left w-full">All Categories</button>
                        </li>
                        <li v-for="category in categories" :key="category.id">
                            <button @click="selectCategory(category.name)"
                                :class="{ 'text-luxora-gold font-bold': selectedCategory === category.name }"
                                class="hover:text-luxora-gold transition text-left w-full">{{ category.name }}</button>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="font-bold text-sm uppercase tracking-wider mb-4">Max Price: ₹{{
                        priceRange.toLocaleString() }}</h3>
                    <input type="range" v-model.number="priceRange" min="0" max="100000" step="1000"
                        class="w-full accent-luxora-gold" />
                    <div class="flex justify-between text-xs text-gray-500 mt-2">
                        <span>₹0</span>
                        <span>₹1,00,000+</span>
                    </div>
                </div>
            </aside>

            <!-- Product Grid -->
            <div class="flex-grow">
                <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 class="text-3xl font-serif">{{ pageTitle }}</h1>
                        <span class="text-sm text-gray-500">{{ filteredProducts.length }} Products</span>
                    </div>

                    <!-- Sort Dropdown -->
                    <select v-model="sortBy"
                        class="border-gray-300 rounded-md shadow-sm focus:border-luxora-gold focus:ring focus:ring-luxora-gold focus:ring-opacity-50 text-sm py-2 pl-3 pr-10">
                        <option value="newest">Newest Arrivals</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>

                <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
                </div>
                <div v-else class="text-center py-20 bg-gray-50 rounded-lg">
                    <p class="text-gray-500 mb-4">No products found matching your criteria.</p>
                    <button @click="clearFilters" class="text-luxora-gold hover:underline">Clear Filters</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProductStore } from '~/stores/products'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const { products } = storeToRefs(productStore)

// Fetch categories
const { data: categories } = await useFetch('/api/categories')

// Fetch products
await useAsyncData('shop-products', async () => {
    await productStore.fetchProducts({ search: route.query.search })
    return true
}, {
    watch: [() => route.query.search]
})

// State
const selectedCategory = ref(route.query.category || null)
const priceRange = ref(50000) // Default max price
const sortBy = ref('newest')

// Watch for route query changes
watch(() => route.query.category, (newCategory) => {
    selectedCategory.value = newCategory || null
})

// Update route when category changes
const selectCategory = (categoryName) => {
    selectedCategory.value = categoryName
    if (categoryName) {
        router.push({ query: { ...route.query, category: categoryName } })
    } else {
        const query = { ...route.query }
        delete query.category
        router.push({ query })
    }
}

const clearFilters = () => {
    selectCategory(null)
    priceRange.value = 100000
    if (route.query.search) {
        router.push({ path: '/shop' })
    }
}

// Filtering and Sorting
const filteredProducts = computed(() => {
    let result = [...products.value]

    // Category Filter
    if (selectedCategory.value) {
        result = result.filter(p => p.category === selectedCategory.value)
    }

    // Price Filter
    result = result.filter(p => p.price <= priceRange.value)

    // Sorting
    switch (sortBy.value) {
        case 'price-low':
            result.sort((a, b) => a.price - b.price)
            break
        case 'price-high':
            result.sort((a, b) => b.price - a.price)
            break
        case 'newest':
        default:
            // Assuming higher ID means newer for now, or use createdAt if available
            result.sort((a, b) => b.id - a.id)
            break
    }

    return result
})

const pageTitle = computed(() => {
    if (route.query.search) return `Search Results for "${route.query.search}"`
    return selectedCategory.value ? `${selectedCategory.value}` : 'All Products'
})
</script>
