import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [] as any[], // Using any for now, can be typed properly
    loading: false
  }),
  getters: {
    isInWishlist: (state) => (productId: number) => {
      return state.items.some(item => item.productId === productId)
    },
    wishlistCount: (state) => state.items.length
  },
  actions: {
    async fetchWishlist() {
      const { user } = useAuth()
      if (!user.value) return

      this.loading = true
      try {
        const data = await $fetch('/api/wishlist')
        this.items = data
      } catch (e) {
        console.error('Failed to fetch wishlist', e)
      } finally {
        this.loading = false
      }
    },
    async addToWishlist(product: any) {
      const { user } = useAuth()
      const { showSnackbar } = useSnackbar()
      
      if (!user.value) {
        showSnackbar('Please login to add to wishlist', 'error')
        return
      }

      // Optimistic update
      const tempId = Date.now()
      this.items.push({ productId: product.id, product, id: tempId })

      try {
        await $fetch('/api/wishlist', {
          method: 'POST',
          body: { productId: product.id }
        })
        showSnackbar('Added to wishlist', 'success')
        await this.fetchWishlist() // Refresh to get real ID
      } catch (e) {
        this.items = this.items.filter(item => item.id !== tempId)
        showSnackbar('Failed to add to wishlist', 'error')
      }
    },
    async removeFromWishlist(productId: number) {
      const { user } = useAuth()
      const { showSnackbar } = useSnackbar()

      if (!user.value) return

      // Optimistic update
      const originalItems = [...this.items]
      this.items = this.items.filter(item => item.productId !== productId)

      try {
        await $fetch(`/api/wishlist/${productId}`, {
          method: 'DELETE'
        })
        showSnackbar('Removed from wishlist', 'success')
      } catch (e) {
        this.items = originalItems
        showSnackbar('Failed to remove from wishlist', 'error')
      }
    },
    async toggleWishlist(product: any) {
      if (this.isInWishlist(product.id)) {
        await this.removeFromWishlist(product.id)
      } else {
        await this.addToWishlist(product)
      }
    }
  }
})
