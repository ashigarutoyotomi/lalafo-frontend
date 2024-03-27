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
            <el-button type="primary" @click="onSubmit(userData.id)">Update</el-button>
          </el-form-item>
        </el-form></el-main
      >
    </el-container>
    <el-button plain @click="dialogVisible = true" width="30%" size="large" type="danger">
      Delete the account
    </el-button>

    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <span>This is a message</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="(dialogVisible = false), deleteUser(userData.id)">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-container>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/modules/users'
import { onMounted } from 'vue'
import { API } from '@/services'
import type { InputUpdateUser } from '@/services/users/types'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router'
import { RouteName } from '@/router/constants'
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

const onSubmit = (id: number) => {
  const data: InputUpdateUser = { email: form.email, password: form.password, name: form.name }
  // console.log('submit!')
  try {
    const response = API.users.updateUser(data, id)
    response.then((data) => {
      const responseData = data.data
      // ElMessage.success(responseData)
      console.log(responseData)
    })
  } catch (error) {
    if (error.code == 422) {
      ElMessage.error(error.response.data.message)
    }
    ElMessage.error(error)
  }
}

const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

const deleteUser = async (id: number) => {
  const response = await API.users.deleteUser(id)
  // response.then((data) => {
  //   console.log(data)
  // })
  ElMessage.success('Deleted successfully!' + id)
  userStore.flushUser()
  router.push(RouteName.LOGIN_PAGE)
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
