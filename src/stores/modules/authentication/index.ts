import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthenticationStore = defineStore('authentication', () => {
  const token = ref<string>(localStorage.getItem('dashboard-vue-access-token') || '')

  const isAuthenticated = computed(() => {
    return !!token.value.length
  })

  function setToken(responseToken: string) {
    localStorage.setItem('dashboard-vue-access-token', responseToken)
  }
  function removeToken() {
    localStorage.removeItem('dashboard-vue-access-token')
    token.value = ''
  }
  return {
    token,
    isAuthenticated,
    setToken,
    removeToken
  }
})
