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
export type InputSearchProduct = {
  keyword: string
  subcategory_id: number
  category_id: number
}
