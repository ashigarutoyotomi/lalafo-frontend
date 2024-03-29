<template>
  <div class="common-layout">
    <el-container>
      <el-header><Sidebar /></el-header>
      <el-container>
        <el-aside width="200px"></el-aside>
        <el-main>
          <el-upload
            action=""
            :auto-load="false"
            :limit="3"
            :http-request="loadFile"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
            multiple
          >
            <el-button type="primary">Click to upload</el-button>
          </el-upload>
          <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="Name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Subcategory">
              <el-select v-model="form.subcategory_id" placeholder="Subcategory">
                <el-option
                  v-for="subcategory in subcategories"
                  :key="subcategory.id"
                  :value="subcategory.id"
                  >{{ subcategory.name }}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Description">
              <el-col :span="11">
                <el-input
                  v-model="form.description"
                  type="text"
                  placeholder="Pick a desc"
                  style="width: 100%"
                />
              </el-col>
            </el-form-item>

            <el-form-item label="Description">
              <el-col :span="11">
                <el-input-number
                  v-model="form.price"
                  type="text"
                  placeholder="Pick a price"
                  style="width: 100%"
                />
              </el-col>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">Create</el-button>
              <el-button @click="goBack">Cancel</el-button>
            </el-form-item>
          </el-form></el-main
        >
      </el-container>
    </el-container>
  </div>
</template>

<style scope></style>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { reactive, ref } from 'vue'
import Sidebar from './Sidebar.vue'
import { Plus } from '@element-plus/icons-vue'
import { InputCreateProduct } from '@/services/products/types'
import { ElMessage, ElMessageBox } from 'element-plus'
import { API } from '@/services'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { RouteName } from '@/router/constants'
import router from '@/router'
import type { UploadRawFile } from 'element-plus'
import type { UploadRequestOptions } from 'element-plus'

const formData = reactive(new FormData())
const subcategories = ref({})
const form = reactive({
  name: '',
  description: '',
  subcategory_id: 0,
  id: 0,
  price: 0,
  photos: []
})
const product: InputCreateProduct = form

const config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}
const onSubmit = () => {
  formData.append('name', form.name)
  formData.append('description', form.description)
  formData.append('subcategory_id', form.subcategory_id)
  formData.append('price', form.price)
  const response = API.products.createProduct(formData, config)
  response.then((res) => {
    ElMessage.success('Product created successfully!')
  })
  response.catch((err) => {
    if (err.response.status == 422) {
      ElMessage.error(err.response.data.message)
    }
    ElMessage.error(err.response.data)
  })
  // console.log(form)
}

onMounted(() => {
  const response = API.subcategories.getSubcategories()
  response.then((data) => {
    subcategories.value = data.data
    // console.log(data.data)
  })
  response.catch((error) => {
    ElMessage.error(error)
  })
})
const goBack = () => {
  router.go(-1)
}
const loadFile = (uploadFile: UploadRawFile) => {
  formData.append('photos[]', uploadFile.file)
  // console.log(form.photos)
}
const beforeUpload = (uploadFile: UploadRawFile) => {
  const types = ['image/png', 'image/jpg']
  return types.includes(uploadFile.type)
}
const beforeRemove = (uploadFile: UploadRawFile) => {
  // form.photos=form.photos.filter()
}
</script>
