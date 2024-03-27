import http from '../api'
import type { APIResponse } from '../types'

async function getFavorites() {
  return await http.get<APIResponse<any>>('favorites')
}

async function unFavorite(id: number) {
  return await http.post<APIResponse<any>>(`favorites/${id}/unfavorite`)
}

async function favorite(id: number) {
  return await http.post<APIResponse<any>>(`favorites/${id}/favorite`)
}

export default {
  favorite,
  unFavorite,
  getFavorites
}
