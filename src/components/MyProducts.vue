<template>
  <el-container>
    <el-header><Sidebar /></el-header>
    <el-container>
      <el-aside width="200px"><AsideFilters /></el-aside>
      <el-main>
        <el-row :gutter="10" v-for="product in productsList" :key="product.id">
          <el-col :xs="10" :sm="6" :md="4" :lg="4" :xl="4"
            ><el-card style="max-width: 480px">
              <template #header>
                <div class="card-header">
                  <span>{{ product.name }}</span>
                </div>
              </template>
              <p class="text item">{{ product.description }}</p>
              <template #footer
                >{{ product.subcategory.name }}
                <div class="mb-4">
                  <el-button type="info" size="small" @click="editProduct(product.id)"
                    >Edit</el-button
                  >
                  <el-button type="danger" size="small" @click="deleteProduct(product.id)"
                    >Delete</el-button
                  >
                </div></template
              >
            </el-card></el-col
          >
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import AsideFilters from './AsideFilters.vue'
import Sidebar from './Sidebar.vue'
import { onMounted, ref } from 'vue'
import { API } from '@/services'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { RouteName } from '@/router/constants'
const productsList = ref({})
onMounted(() => {
  const response = API.products.myProducts()
  response.then((data) => {
    productsList.value = data.data
    // console.log(data)
  })
  response.catch((error) => {
    ElMessage.error(error)
  })
})

const editProduct = (id: string) => {
  router.push({ name: RouteName.EDIT_PRODUCT_VIEW, params: id })
}

const deleteProduct = (id: number) => {
  // ElMessage('' + id)
  const response = API.products.deleteProduct(id)
  response.then((data) => {
    ElMessage.success('delete product')
    productsList.value = productsList.value.filter((product) => {
      return product.id !== id
    })
  })
  response.catch((error) => {
    ElMessage.error(error)
  })
}
</script>
<style scope>
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
