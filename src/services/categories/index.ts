import http from '../api'
import type { APIResponse } from '../types'
import type { Category, InputCreateCategory, InputUpdateCategory } from './types'

async function getCategories() {
  return await http.get<APIResponse<Category[]>>('categories')
}

async function deleteCategory(id: number) {
  return await http.delete<APIResponse<boolean>>(`categories/${id}`)
}

async function createCategory(input: InputCreateCategory) {
  return await http.post<APIResponse<Category>>('categories', input)
}

async function updateCategory(input: InputUpdateCategory, id: number) {
  return await http.put<APIResponse<boolean>>(`categories/${id}`, input)
}

export default {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories
}
