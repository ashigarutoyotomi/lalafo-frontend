import http from '../api'
import type { APIResponse } from '../types'
import type { Photo, InputCreatePhoto, InputUpdatePhoto } from './types'

async function getPhotos() {
  return await http.get<APIResponse<Photo[]>>('product-photos')
}

async function deletePhoto(id: number) {
  return await http.delete<APIResponse<boolean>>(`product-photos/${id}`)
}
async function getPhoto(id: number) {
  return await http.get<APIResponse<boolean>>(`product-photos/${id}`)
}
async function createPhoto(input: any, config: object) {
  return await http.post<APIResponse<Photo>>('product-photos', input, config)
}

async function myPhotos() {
  return await http.get<APIResponse<Photo[]>>('users/photos')
}
export default {
  createPhoto,
  deletePhoto,
  getPhotos,
  myPhotos,
  getPhoto
}
