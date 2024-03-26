<script setup lang="ts">
import { RouteName } from '@/router/constants'
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { API } from '@/services'
import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useUserStore } from '@/stores/modules/users'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
// do not use same name with ref
const router = useRouter()
const authenticationStore = useAuthenticationStore()
const userStore = useUserStore()
const form = reactive({
  email: '',
  password: '',
  name: ''
})
const errors = ref({})
const onSubmit = () => {
  if (form.email.length <= 0 || form.password.length <= 0 || form.email.length <= 0) {
    ElMessage.error('Please enter all the fields')
    return false
  }
  const data = { email: form.email, password: form.password, name: form.name }
  try {
    const response = API.users.registerUser(data)
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
      Login the acount
      <h3 v-if="errors">{{ errors }}</h3>
      <el-form-item label="Name">
        <el-input v-model="form.name" type="text" required />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password" type="password" required />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email" type="email" required />
      </el-form-item>
      <div><router-link :to="{ name: RouteName.LOGIN_PAGE }">Login now</router-link></div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
