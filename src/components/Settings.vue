<template>
  <el-container>
    <el-header><Sidebar /></el-header>
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-main
        ><el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="Approved by">
            <el-input v-model="form.name" placeholder="Name" clearable type="text" />
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="form.email" placeholder="Email" clearable type="email" />
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="form.password" placeholder="Password" clearable type="password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Update</el-button>
          </el-form-item>
        </el-form></el-main
      >
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/modules/users'
import { onMounted } from 'vue'
import { API } from '@/services'
import type { InputUpdateUser } from '@/services/users/types'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()
const user = userStore.getUser()
const userData = ref({})
const form = reactive({
  email: '',
  password: '',
  name: ''
})
onMounted(() => {
  // console.log(user._value)
  userData.value = user._value
  form.email = userData.value.email
  form.name = userData.value.name
})

const onSubmit = () => {
  const data: InputUpdateUser = { email: form.email, password: form.password, name: form.name }
  // console.log('submit!')
  try {
    const response = API.users.updateUser(data)
    response.then((data) => {
      const responseData = data.data
      // ElMessage.success(responseData)
      console.log(responseData)
    })
  } catch (error) {
    ElMessage.success(error)
  }
}
</script>

<style scope>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
