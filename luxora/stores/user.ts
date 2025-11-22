import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAdmin: false
  }),
  actions: {
    login(email, password) {
      // Mock Login Logic
      if (email === 'admin@luxora.com' && password === 'admin123') {
        this.user = { email, name: 'Admin User' }
        this.isAdmin = true
        return true
      } else if (email === 'user@luxora.com' && password === 'user123') {
        this.user = { email, name: 'John Doe' }
        this.isAdmin = false
        return true
      }
      return false
    },
    logout() {
      this.user = null
      this.isAdmin = false
    }
  }
})
