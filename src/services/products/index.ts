import http from '../api'
import type { APIResponse } from '../types'
import type { Product, InputCreateProduct, InputUpdateProduct } from './types'

async function getProducts() {
  return await http.get<APIResponse<Product[]>>('products')
}

async function deleteProduct(id: number) {
  return await http.delete<APIResponse<boolean>>(`products/${id}`)
}

async function createProduct(input: InputCreateProduct) {
  return await http.post<APIResponse<Product>>('products', input)
}

async function updateProduct(input: InputUpdateProduct, id: number) {
  return await http.put<APIResponse<boolean>>(`products/${id}`, input)
}

export default {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts
}
