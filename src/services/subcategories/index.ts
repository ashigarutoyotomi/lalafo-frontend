import http from '../api'
import type { APIResponse } from '../types'

async function getSubcategories() {
  return await http.get<APIResponse<[]>>('subcategories')
}
async function getSubcategoriesByCategoryId(id: number) {
  return await http.get<APIResponse<[]>>(`subcategories/category/${id}`)
}
export default {
  getSubcategories,
  getSubcategoriesByCategoryId
}
