import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null')
  }),
  getters: {
    isAuthenticated: (s) => !!s.user
  },
  actions: {
    setUser(u) {
      this.user = u
      localStorage.setItem('user', JSON.stringify(u))
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    }
  }
})