<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthenticationStore } from '@/stores/modules/authentication'
import { reactive, ref } from 'vue'
import { API } from '@/services'
import { useUserStore } from '@/stores/modules/users'
import { RouteName } from '@/router/constants'
import { ElMessage } from 'element-plus'
// do not use same name with ref
const form = reactive({
  password: '12345678',
  email: 'test@example.com'
})
const router = useRouter()
const authenticationStore = useAuthenticationStore()
const userStore = useUserStore()
const errors = ref({})

const onSubmit = () => {
  if (form.password.length <= 0 || form.email.length <= 0) {
    ElMessage.error('Please enter all the fields')
  }
  const data = { email: form.email, password: form.password }
  try {
    const response = API.users.loginUser(data)
    response.then((data) => {
      const responseData = data.data
      authenticationStore.setToken(responseData.token)
      userStore.initUser(responseData.user)
      router.push({ name: RouteName.HOME_PAGE })
    })
    response.catch((data) => {
      // console.log(data)
      if (data.response.status == 422) {
        errors.value = data.response.data['message']
      }
    })
  } catch (error) {
    console.log(error.response)
  }
}
</script>

<template>
  <el-card style="max-width: 70%; min-width: 50%">
    <el-form :model="form" label-width="auto" style="width: 100%">
      <el-form-item label="Email">
        <el-input v-model="form.email" type="email" required />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password" type="password" required />
      </el-form-item>
      <div><router-link :to="{ name: RouteName.REGISTER_PAGE }">Register now</router-link></div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Login</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
