import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
  const token = ref('')
  function set(token_string: string) {
    token.value = token_string
  }
  function flush() {
    token.value = ''
  }

  return { token, flush, set }
})
