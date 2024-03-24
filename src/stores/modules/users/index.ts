import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../../../services/users/types'

export const useUserStore = defineStore('userStore', () => {
  const user = ref<User[] | null>([])

  function initUser(data: User[]) {
    user.value = data
  }
  function flushUser() {
    user.value = null
  }
  return {
    user,
    initUser,
    flushUser
  }
})
