export type Department = {
  name: string
  created_at: string
  updated_at: string
  id: number
}
export type InputCreateDepartment = {
  name: string
}
export type InputUpdateDepartment = {
  id: number
  name: string
}
