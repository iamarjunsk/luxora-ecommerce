import { defineStore } from 'pinia'

interface Product {
  id: number
  name: string
  price: number
  category: string
  description: string
  stock: number
  createdAt: string
  updatedAt: string
  images: { id: number; url: string; productId: number }[]
  image?: string // Computed property for frontend display
  featured?: boolean // Optional, might not be in DB yet
}

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    currentProduct: null as Product | null,
    loading: false,
    error: null as string | null
  }),
  getters: {
    featuredProducts: (state) => state.products.filter(p => p.featured || p.id <= 4),
    menProducts: (state) => state.products.filter(p => p.category === 'Men'),
    womenProducts: (state) => state.products.filter(p => p.category === 'Women'),
    getProductById: (state) => (id: number | string) => state.products.find(p => p.id === Number(id))
  },
  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const data = await $fetch<Product[]>('/api/products')
        const config = useRuntimeConfig()
        this.products = data.map(p => ({
          ...p,
          image: p.images?.[0]?.url || config.public.assets.placeholder.default
        }))
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch products'
        console.error('Error fetching products:', err)
      } finally {
        this.loading = false
      }
    },
    async fetchProduct(id: number | string) {
      this.loading = true
      this.error = null
      try {
        const data = await $fetch<Product>(`/api/products/${id}`)
        const config = useRuntimeConfig()
        this.currentProduct = {
            ...data,
            image: data.images?.[0]?.url || config.public.assets.placeholder.default
        }
        return this.currentProduct
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch product'
        console.error('Error fetching product:', err)
        return null
      } finally {
        this.loading = false
      }
    }
  }
})
