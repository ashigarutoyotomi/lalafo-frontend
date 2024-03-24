import http from '../api'
import type { APIResponse } from '../types'
import type { Employee, InputCreateEmployee, InputUpdateEmployee } from './types'

async function getEmployees() {
  return await http.get<APIResponse<Employee[]>>('employees')
}

async function deleteEmployee(id: number) {
  return await http.delete<APIResponse<boolean>>(`employees/${id}`)
}

async function createEmployee(input: InputCreateEmployee) {
  return await http.post<APIResponse<Employee>>('employees', input)
}

async function updateEmployee(input: InputUpdateEmployee, id: number) {
  return await http.put<APIResponse<boolean>>(`employees/${id}`, input)
}

export default {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees
}
