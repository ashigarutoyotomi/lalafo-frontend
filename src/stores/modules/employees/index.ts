import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../../../services/users/types'
import { API } from '../../../services'
import type { APIResponse } from '../../../services/types'
export const useEmployeeStore = defineStore('userStore', () => {
  // async function dispatchGetEmployees(): Promise<APIResponse<null>> {
  //   try {
  //     const { status, data } = await API.employee.getEmployees()
  //     if (status === 200) {
  //       initEmployees(data.content)
  //       return {
  //         success: true,
  //         content: null
  //       }
  //     }
  //   } catch (error) {
  //     const _error = error as AxiosError<string>
  //     return {
  //       success: false,
  //       status: _error.response?.status,
  //       content: null
  //     }
  //   }
  //   return {
  //     success: false,
  //     content: null,
  //     status: 400
  //   }
  // }
  // async function dispatchCreateEmployee(input: InputCreateEmployee): Promise<APIResponse<null>> {
  //   try {
  //     const { status, data } = await API.school.createEmployee(input)
  //     if (status === 200) {
  //       addNewEmployee(data.content)
  //       return {
  //         success: true,
  //         content: null
  //       }
  //     }
  //   } catch (error) {
  //     const _error = error as AxiosError<string>
  //     return {
  //       success: false,
  //       status: _error.response?.status,
  //       content: null
  //     }
  //   }
  //   return {
  //     success: false,
  //     content: null,
  //     status: 400
  //   }
  // }
  // async function dispatchDeleteEmployee(id: number): Promise<APIResponse<null>> {
  //   try {
  //     const { status } = await API.school.deleteEmployee(id)
  //     if (status === 200) {
  //       removeEmployee(id)
  //       return {
  //         success: true,
  //         content: null
  //       }
  //     }
  //   } catch (error) {
  //     const _error = error as AxiosError<string>
  //     return {
  //       success: false,
  //       status: _error.response?.status,
  //       content: null
  //     }
  //   }
  //   return {
  //     success: false,
  //     content: null,
  //     status: 400
  //   }
  // }
  // async function dispatchUpdateEmployee(input: InputUpdateEmployee): Promise<APIResponse<null>> {
  //   try {
  //     const { status } = await API.school.updateEmployee(input)
  //     if (status === 200) {
  //       return {
  //         success: true,
  //         content: null
  //       }
  //     }
  //   } catch (error) {
  //     const _error = error as AxiosError<string>
  //     return {
  //       success: false,
  //       status: _error.response?.status,
  //       content: null
  //     }
  //   }
  //   return {
  //     success: false,
  //     content: null,
  //     status: 400
  //   }
  // }
  // return {
  //   dispatchGetEmployees,
  //   dispatchCreateEmployee,
  //   dispatchDeleteEmployee,
  //   dispatchUpdateEmployee
  // }
})
