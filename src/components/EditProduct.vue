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
import type { InputUpdateProduct } from '@/services/products/types'
import { ElMessage } from 'element-plus'
import Subcategories from '@/services/subcategories'
import type { Product } from '@/services/products/types'
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()
const subcategories = ref({})
const userStore = useUserStore()
const user = userStore.getUser()
const userData = ref({})
const product = ref({})
const form = ref({
  description: product.value.description,
  subcategory_id: product.value.id,
  name: product.value.name,
  price: product.value.price
})

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
    // ElMessage.success(responseData)
    product.value = responseProductData
    // console.log(responseProductData)
    // console.log(responseData)
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
