import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as Record<string, any> | null,
    isAdmin: false
  }),
  actions: {
    async fetchUser() {
      try {
        const { data } = await useFetch('/api/auth/me')
        if (data.value?.user) {
          this.user = data.value.user
          this.isAdmin = this.user.role === 'ADMIN'
        } else {
          this.user = null
          this.isAdmin = false
        }
      } catch (error) {
        this.user = null
        this.isAdmin = false
      }
    },
    login(email: string, password: string) {
      // Mock Login Logic - keeping for now as requested, but fetchUser is the source of truth for session
      if (email === 'admin@luxora.com' && password === 'admin123') {
        this.user = { email, name: 'Admin User', role: 'ADMIN' }
        this.isAdmin = true
        return true
      } else if (email === 'user@luxora.com' && password === 'user123') {
        this.user = { email, name: 'John Doe', role: 'USER' }
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
