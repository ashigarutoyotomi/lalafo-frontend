import axios from 'axios'
import { useAuthenticationStore } from '@/stores/modules/authentication'
import router from '@/router'
import { RouteName } from '@/router/constants'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to login page
        router.push(RouteName.LOGIN_PAGE)
      }
    }
    return Promise.reject(error)
  }
)

instance.interceptors.request.use((config) => {
  const authenticationStore = useAuthenticationStore()
  const token = authenticationStore.token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
export default instance
