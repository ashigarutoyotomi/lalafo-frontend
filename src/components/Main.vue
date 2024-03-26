<script setup lang="ts">
import { ref } from 'vue'
import { API } from '@/services'
import { onMounted } from 'vue'
const productsList = ref({})
import Sidebar from '@/components/Sidebar.vue'
onMounted(async () => {
  try {
    const products = API.products.getProducts()
    await products.then((response) => {
      // console.log(response.data.data)
      productsList.value = response.data.data
    })
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <Sidebar />
  <el-scrollbar height="400px">
    <el-card
      style="max-width: 480px"
      v-for="product in productsList"
      :key="product"
      class="scrollbar-demo-item"
    >
      <template #header>
        <div class="card-header">
          <span>{{ product.name }}</span>
        </div>
      </template>
      <div>{{ product.description }}</div>
      <template #footer>{{ product.favorites.length }}</template>
    </el-card>
  </el-scrollbar>
</template>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70%;
  width: 100%;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
