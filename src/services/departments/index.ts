import http from '../api'
import type { APIResponse } from '../types'
import type { Department, InputCreateDepartment, InputUpdateDepartment } from './types'

async function getDepartments() {
  return await http.get<APIResponse<Department[]>>('departments')
}

async function deleteDepartment(id: number) {
  return await http.delete<APIResponse<boolean>>(`departments/${id}`)
}

async function createDepartment(input: InputCreateDepartment) {
  return await http.post<APIResponse<Department>>('departments', input)
}

async function updateDepartment(input: InputUpdateDepartment, id: number) {
  return await http.put<APIResponse<boolean>>(`departments/${id}`, input)
}

export default {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartments
}
