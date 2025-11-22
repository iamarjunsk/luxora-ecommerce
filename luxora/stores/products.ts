import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Onyx Signet Ring',
        price: 250,
        category: 'Men',
        image: '/assets/images/mens-ring.png',
        description: 'A bold statement piece featuring a genuine black onyx stone set in 18k gold.',
        featured: true
      },
      {
        id: 2,
        name: 'Royal Cuban Chain',
        price: 1200,
        category: 'Men',
        image: '/assets/images/mens-chain.png',
        description: 'Heavy 18k gold cuban link chain. The ultimate symbol of luxury and status.',
        featured: true
      },
      {
        id: 3,
        name: 'Diamond Solitaire Pendant',
        price: 850,
        category: 'Women',
        image: '/assets/images/womens-necklace.png',
        description: 'A delicate yet brilliant diamond solitaire pendant on a fine gold chain.',
        featured: true
      },
      {
        id: 4,
        name: 'Pearl Drop Earrings',
        price: 320,
        category: 'Women',
        image: '/assets/images/womens-earrings.png',
        description: 'Classic freshwater pearls suspended from elegant gold hooks.',
        featured: true
      }
    ]
  }),
  getters: {
    featuredProducts: (state) => state.products.filter(p => p.featured),
    menProducts: (state) => state.products.filter(p => p.category === 'Men'),
    womenProducts: (state) => state.products.filter(p => p.category === 'Women'),
    getProductById: (state) => (id) => state.products.find(p => p.id === Number(id))
  },
  actions: {
    addProduct(product) {
      const newId = Math.max(...this.products.map(p => p.id)) + 1
      this.products.push({ ...product, id: newId })
    },
    deleteProduct(id) {
      this.products = this.products.filter(p => p.id !== id)
    }
  }
})
