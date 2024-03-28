<template>
  <el-container>
    <el-header><Sidebar /></el-header>
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-main
        ><el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item :label="product.name"> </el-form-item>
          <el-form-item label="Description">
            {{ product.description }}
          </el-form-item>
          <el-form-item label="Price" disabled>
            {{ product.price }}
          </el-form-item>
        </el-form>

        <h1>Photos</h1>
        <div v-if="photos.length > 0">
          <div v-for="photo in photos" :key="photo.id">
            <img :src="photoUrl + photo.path" alt="photo" />
          </div>
        </div>
        <div v-else>
          <h2>no photos</h2>
        </div>
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
const product = ref({})
const photos = ref({})
const photoUrl = import.meta.env.VITE_URL + '/storage/photos/'
onMounted(() => {
  const responseProduct = API.products.getProduct(route.params.id)
  responseProduct.then((data) => {
    const responseProductData = data.data
    // console.log(responseProductData.photos)
    product.value = responseProductData
    photos.value = responseProductData.photos
    // console.log(responseProductData.photos)
  })
})
</script>

<style scope>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
