<template>
    <div class="bg-white min-h-screen pt-12 pb-24">
        <div class="container mx-auto px-6">
            <!-- Header -->
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-5xl font-serif mb-4 text-luxora-black">{{ pageTitle }}</h1>
                <div class="w-16 h-0.5 bg-luxora-black mx-auto"></div>
            </div>

            <div class="flex flex-col md:flex-row gap-16">
                <!-- Sidebar Filters -->
                <aside class="w-full md:w-64 flex-shrink-0">
                    <div class="sticky top-24">
                        <div class="mb-12">
                            <h3 class="font-serif text-lg mb-6 border-b border-gray-200 pb-2">Categories</h3>
                            <ul class="space-y-3">
                                <li>
                                    <button @click="selectCategory(null)"
                                        :class="!selectedCategory ? 'text-luxora-black font-bold pl-2 border-l-2 border-luxora-black' : 'text-gray-500 hover:text-luxora-black'"
                                        class="text-sm uppercase tracking-wider transition-all duration-300 text-left w-full block">
                                        All Categories
                                    </button>
                                </li>
                                <li v-for="category in categories" :key="category.id">
                                    <button @click="selectCategory(category.name)"
                                        :class="selectedCategory === category.name ? 'text-luxora-black font-bold pl-2 border-l-2 border-luxora-black' : 'text-gray-500 hover:text-luxora-black'"
                                        class="text-sm uppercase tracking-wider transition-all duration-300 text-left w-full block">
                                        {{ category.name }}
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="font-serif text-lg mb-6 border-b border-gray-200 pb-2">Price Range</h3>
                            <div class="px-2">
                                <input type="range" v-model.number="priceRange" min="0" max="10000" step="100"
                                    class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-luxora-black" />
                                <div class="flex justify-between text-xs text-gray-500 mt-4 font-medium">
                                    <span>₹0</span>
                                    <span>Max: ₹{{ priceRange.toLocaleString() }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                <!-- Product Grid -->
                <div class="flex-grow">
                    <div class="flex justify-end mb-8">
                        <!-- Sort Dropdown -->
                        <div class="relative group">
                            <select v-model="sortBy"
                                class="appearance-none bg-transparent border-none text-sm font-medium uppercase tracking-wider cursor-pointer focus:ring-0 pr-8 text-right">
                                <option value="newest">Newest Arrivals</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
                    </div>
                    <div v-else class="text-center py-20">
                        <p class="text-gray-500 mb-6 font-serif text-lg">No products found matching your criteria.</p>
                        <button @click="clearFilters" 
                            class="inline-block border-b border-luxora-black pb-1 text-sm font-bold uppercase tracking-widest hover:text-luxora-gold hover:border-luxora-gold transition-all">
                            Clear Filters
                        </button>
                    </div>
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
const priceRange = ref(10000) // Default max price
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
    priceRange.value = 10000
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
