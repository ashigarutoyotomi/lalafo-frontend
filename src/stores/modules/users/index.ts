import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../../../services/users/types'

export const useUserStore = defineStore('userStore', () => {
  const user = ref<User[] | null>([])

  function initUser(data: User[]) {
    user.value = data
    localStorage.setItem('user', JSON.stringify(user))
  }
  function flushUser() {
    user.value = null
    localStorage.removeItem('user')
  }
  function getUser(): User[] | null {
    return JSON.parse(localStorage.getItem('user') || '[]')
  }
  return {
    user,
    initUser,
    flushUser,
    getUser
  }
})
