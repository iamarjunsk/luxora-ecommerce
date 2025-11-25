// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/image'
  ],
  app: {
    head: {
      title: 'Luxora | Premium Jewelry',
      meta: [
        { name: 'description', content: 'Exquisite jewelry for men and women.' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap' }
      ]
    }
  },
  css: ['./assets/css/main.css'],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET,
    public: {
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      assets: {
        logo: '/images/logo.png',
        hero: '/images/hero.png',
        placeholder: {
          product: '/images/placeholder-product.jpg',
          category: '/images/placeholder-category.jpg',
          default: '/images/placeholder.png'
        }
      }
    }
  }
})
