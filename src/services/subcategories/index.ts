import http from '../api'
import type { APIResponse } from '../types'

async function getSubcategories() {
  return await http.get<APIResponse<[]>>('subcategories')
}

export default {
  getSubcategories
}
