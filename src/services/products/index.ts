import http from '../api'
import type { APIResponse } from '../types'
import type { Product, InputCreateProduct, InputUpdateProduct, InputSearchProduct } from './types'

async function getProducts() {
  return await http.get<APIResponse<Product[]>>('products')
}
async function getRandomProducts() {
  return await http.get<APIResponse<Product[]>>('products/random-products')
}
async function deleteProduct(id: number) {
  return await http.delete<APIResponse<boolean>>(`products/${id}`)
}
async function getProduct(id: number) {
  return await http.get<APIResponse<boolean>>(`products/${id}`)
}
async function createProduct(input: InputCreateProduct) {
  return await http.post<APIResponse<Product>>('products', input)
}

async function updateProduct(input: InputUpdateProduct, id: number) {
  return await http.put<APIResponse<boolean>>(`products/${id}`, input)
}
async function myProducts() {
  return await http.get<APIResponse<Product[]>>('users/products')
}
async function searchProducts(input: InputSearchProduct) {
  return await http.post<APIResponse<any[]>>('products/search', input)
}
export default {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  myProducts,
  getProduct,
  getRandomProducts,
  searchProducts
}
