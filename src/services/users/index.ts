import http from '../api'
import type { APIResponse } from '../types'
import type { User, InputCreateUser, InputLoginUser, InputUpdateUser } from './types'

// async function getUsers() {
//   return await http.get<APIResponse<User[]>>('school')
// }

// async function deleteUser(id: number) {
//   return await http.delete<APIResponse<boolean>>(`school/${id}`)
// }

async function registerUser(input: InputCreateUser) {
  return await http.post<APIResponse<User>>('register', input)
}

// async function updateUser(input: InputUpdateUser) {
//   return await http.put<APIResponse<boolean>>('school', input)
// }
async function loginUser(input: InputLoginUser) {
  return await http.post<APIResponse<User>>('login', input)
}
async function logoutUser() {
  return await http.post<APIResponse<User>>('logout')
}
async function updateUser(input: InputUpdateUser, id: number) {
  return await http.put<APIResponse<User>>(`users/${id}`, input)
}
async function deleteUser(id: number) {
  return await http.delete<APIResponse<User>>(`users/${id}`)
}
export default {
  registerUser,
  logoutUser,
  loginUser,
  updateUser,
  deleteUser
}
