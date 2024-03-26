export type Category = {
  name: string
  created_at: string
  updated_at: string
  id: number
}
export type InputCreateCategory = {
  name: string
}
export type InputUpdateCategory = {
  id: number
  name: string
}
