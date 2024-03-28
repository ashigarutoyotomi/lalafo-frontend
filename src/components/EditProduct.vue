<template>
  <el-container>
    <el-header><Sidebar /></el-header>
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-main
        ><el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item :label="product.name">
            <el-input v-model="form.name" placeholder="Name" clearable type="text" />
          </el-form-item>
          <el-input-number :label="product.price">
            <el-input v-model="form.price" placeholder="price" clearable type="number" />
          </el-input-number>
          <el-form-item :label="product.description">
            <el-input
              v-model="form.description"
              placeholder="Description"
              clearable
              type="description"
            />
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
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Update</el-button>
          </el-form-item>
        </el-form>

        <h1>Photos</h1>
        <div v-if="photos.length > 0">
          <div v-for="photo in photos" :key="photo.id">
            <img :src="photoUrl + photo.path" alt="photo" />
            <el-button type="danger" @click="deletePhoto(photo.id)">delete</el-button>
          </div>
        </div>
        <div v-else>
          <h2>no photos</h2>
        </div>
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          action=""
          multiple
          :on-preview="handlePreview"
          :http-request="loadFile"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="1"
          :on-exceed="handleExceed"
          accept=".png,.jpg"
          :before-upload="beforeUpload"
          auto-load="false"
        >
          <el-button type="primary">Click to upload</el-button>
          <template #tip>
            <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
          </template>
        </el-upload>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/modules/users'
import { onMounted } from 'vue'
import { API } from '@/services'
import type { InputUpdateProduct } from '@/services/products/types'
import { ElMessage } from 'element-plus'
import Subcategories from '@/services/subcategories'
import type { Product } from '@/services/products/types'
import { useRoute } from 'vue-router'
import router from '@/router'
import type { UploadRawFile } from 'element-plus'
import type { UploadRequestOptions } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
const route = useRoute()
const subcategories = ref({})
const userStore = useUserStore()
const user = userStore.getUser()
const userData = ref({})
const product = ref({})
const photos = ref({})
const form = ref({
  description: product.value.description,
  subcategory_id: product.value.id,
  name: product.value.name,
  price: product.value.price
})
const photoUrl = import.meta.env.VITE_URL + '/storage/photos/'
const onSubmit = () => {
  const data: InputUpdateProduct = {
    description: form.value.description,
    subcategory_id: form.value.subcategory_id,
    name: form.value.name,
    price: form.value.price
  }
  // console.log('submit!')
  try {
    const response = API.products.updateProduct(data, route.params.id)
    response.then((data) => {
      const responseData = data.data
      // ElMessage.success(responseData)
      // console.log(responseData)
    })
    response.catch((error) => {
      ElMessage.error(error)
    })
    router.go(-1)
    ElMessage.success('updated product successfully')
  } catch (error) {
    ElMessage.success(error)
  }
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
  const responseProduct = API.products.getProduct(route.params.id)
  responseProduct.then((data) => {
    const responseProductData = data.data
    // console.log(responseProductData.photos)
    product.value = responseProductData
    photos.value = responseProductData.photos
    // console.log(responseProductData.photos)
  })
})
const deletePhoto = (id: number) => {
  // ElMessage.success('' + id)
  try {
    const response = API.photos.deletePhoto(id)
    response.then((data) => {
      const responseData = data.data
      ElMessage.success(responseData)
      photos.value = photos.value.filter((photo) => {
        return photo.id !== id
      })
      // console.log(responseData)
    })
  } catch (error) {
    ElMessage.error(error)
  }
}

const fileList = ref<UploadUserFile[]>([])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}

const loadFile = (uploadFile: UploadRequestOptions) => {
  form.value.file = uploadFile.file
}
const beforeUpload = (uploadFile: UploadRawFile) => {
  return uploadFile.type === 'text/csv'
}

const beforeRemove = () => {
  form.value.file = null
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
