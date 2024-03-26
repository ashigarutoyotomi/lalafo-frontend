export type Products = {
  name: string
  description: string
  photos: Array<any>
  subcategory_id: number
  user_id: number
  created_at: string
  updated_at: string
  id: number
}
export type InputCreateProducts = {
  name: string
  description: string
  subcategory_id: number
  user_id: number
  created_at: string
  updated_at: string
  id: number
}
export type InputUpdateProducts = {
  name: string
  description: string
  subcategory_id: number
  user_id: number
  created_at: string
  updated_at: string
  id: number
}
