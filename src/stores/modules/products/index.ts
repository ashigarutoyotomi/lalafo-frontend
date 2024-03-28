import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '../../../services/products/types'

export const useProductStore = defineStore('userStore', () => {
  const products = ref<Product[] | null>([])

  function setProducts(data) {
    products.value = data
  }
  function getProducts() {
    return products.value
  }
  function flushProducts() {
    products.value = null
  }
  return {
    setProducts,
    getProducts,
    flushProducts
  }
})
