<template>
  <div class="common-layout">
    <el-container>
      <el-header><Sidebar /></el-header>
      <el-container>
        <el-aside width="200px"></el-aside>
        <el-main>
          <el-upload
            action=""
            accept=".jpg, .png"
            :auto-load="false"
            :limit="1"
            :http-request="loadFile"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
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

const fileInput = ref(null)
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

const loadFile = (uploadFile: UploadRequestOptions) => {
  const file = uploadFile.file;
  form.photos.push(file);
};

const beforeUpload = (uploadFile: UploadRawFile) => {
  const types = ["image/png", "image/jpeg"];
  return types.includes(uploadFile.type);
};

const beforeRemove = () => {
  form.photos = [];
};

const onSubmit = () => {
  const files = fileInput.value.files
  for (let i = 0; i < files.length; i++) {
    form.photos.push(new FormData(files[i]))
  }
  const response = API.products.createProduct(form)
  response.then((res) => {
    ElMessage.success('Product created successfully!')
    router.go(-1)
  })
  response.catch((err) => {
    if (err.response.status == 422) {
      ElMessage.error(err.response.data.message)
    }
    ElMessage.error(err.response.data)
  })
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
const handleFileChange = (event) => {
  selectedFiles.value = Array.from(event.target.files)
}
</script>
