export type Employee = {
  first_name: string
  last_name: string
  bday: string
  sex: string
  age: number
  deparment_id: number
  fired_day: string
  status: number
  file_id: string
  created_at: string
  updated_at: string
  id: number
}
export type InputCreateEmployee = {
  first_name: string
  last_name: string
  mid_name: string
  bday: string
  sex: string
  age: number
  deparment_id: number
  fired_day: string
  status: number
  file_id: string
}
export type InputUpdateEmployee = {
  id: number
  first_name: string
  last_name: string
  bday: string
  sex: string
  age: number
  deparment_id: number
  fired_day: string
  status: number
  file_id: string
}
