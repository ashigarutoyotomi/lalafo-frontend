<template>
  <Sidebar />
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
          <template #footer>
            <div class="mb-4">
              <el-button type="info" size="small" @click="showProduct(product.id)">Show</el-button>
            </div></template
          >
        </el-card></el-col
      >
    </el-row>
  </el-main>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import { onMounted, ref } from 'vue'
import { useProductStore } from '@/stores/modules/products'
import type { Product } from '@/services/products/types'
import router from '@/router'
import { RouteName } from '@/router/constants'
const productsStore = useProductStore()
const productsList: any = ref({})
onMounted(() => {
  productsList.value = productsStore.getProducts()
  //   console.log(productsList.value)
})
const showProduct = (id: string) => {
  router.push({ name: RouteName.SHOW_PRODUCT_VIEW, params: { id: id } })
}
</script>

<style scope></style>
