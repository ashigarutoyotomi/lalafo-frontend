<script setup lang="ts">
import { ref } from 'vue'
import { API } from '@/services'
import { onMounted } from 'vue'
import AsideFilters from '@/components/AsideFilters.vue'

const photoUrl = import.meta.env.VITE_URL + '/storage/photos/'
const productsList = ref({})
const productsListAll = ref({})
import Sidebar from '@/components/Sidebar.vue'
import { ElMessage } from 'element-plus'
onMounted(async () => {
  try {
    const products = API.products.getRandomProducts()
    await products.then((response) => {
      // console.log(response.data)
      productsList.value = response.data
      productsListAll.value = response.data
    })
  } catch (e) {
    console.log(e)
  }
})
const changeCategories = (categories) => {
  for (let index = 0; index < categories.length; index++) {
    productsList.value = productsListAll.value.filter((product) => {
      return product.subcategory.category_id == categories[index].id
    })
  }
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><Sidebar /></el-header>
      <el-container>
        <el-aside width="200px"><AsideFilters @change-categories="changeCategories" /></el-aside>
        <el-main
          ><el-scrollbar height="400px">
            <el-card
              style="max-width: 480px"
              v-for="product in productsList"
              :key="product"
              class="scrollbar-demo-item"
            >
              <img
                :src="photoUrl + product.photos[0].path"
                alt="photo"
                v-if="product.photos.length > 0"
              />
              <span v-else>No Photos</span>
              <template #header>
                <div class="card-header">
                  <span>{{ product.name }}</span>
                </div>
              </template>
              <div>{{ product.description }}</div>
              <template #footer
                >Favs: {{ product.favorites.length }} {{ product.subcategory.name }}</template
              >
            </el-card>
          </el-scrollbar></el-main
        >
      </el-container>
    </el-container>
  </div>
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
