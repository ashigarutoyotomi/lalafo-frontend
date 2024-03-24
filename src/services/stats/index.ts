import http from '../api'
import type { APIResponse } from '../types'

async function getStats() {
  return await http.get<APIResponse<[]>>('stats')
}

export default {
  getStats
}
