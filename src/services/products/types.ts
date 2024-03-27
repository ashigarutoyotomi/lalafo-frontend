export type Product = {
  name: string
  description: string
  subcategory_id: number
  id: number
}
export type InputCreateProduct = {
  name: string
  description: string
  subcategory_id: number
  id: number
}
export type InputUpdateProduct = {
  name: string
  description: string
  subcategory_id: number
  price: number
}
