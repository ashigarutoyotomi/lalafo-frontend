<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1"><img src="@/assets/logo.png" alt="" width="40%" /></el-menu-item>
    <el-menu-item index="1"
      ><router-link :to="{ name: RouteName.HOME_PAGE }">HOME PAGE</router-link></el-menu-item
    >
    <el-sub-menu index="2">
      <template #title>Profile</template>
      <el-menu-item index="2-1"
        ><router-link :to="{ name: RouteName.PRODUCTS_CREATE }"
          >Add product lot</router-link
        ></el-menu-item
      >
      <el-menu-item index="2-2"
        ><router-link :to="{ name: RouteName.SETTINGS }">Settings</router-link></el-menu-item
      >
      <el-menu-item index="2-3"
        ><router-link :to="{ name: RouteName.PRODUCTS_MINE }">My lots</router-link></el-menu-item
      >
      <el-menu-item index="2-4"
        ><router-link :to="{ name: RouteName.FAVORITED_LOTS }">Favorites</router-link></el-menu-item
      >
      <el-menu-item index="2-4"
        ><el-button type="warning" size="small" @click.prevent="onLogout"
          >Logout</el-button
        ></el-menu-item
      >
    </el-sub-menu>
    <el-menu-item index="3"
      ><router-link :to="{ name: RouteName.ABOUT_PAGE }"> About</router-link></el-menu-item
    >
    <el-menu-item index="4">
      <el-input
        v-model="data.keyword"
        style="width: 200px"
        placeholder="Please input"
        clearable
        width="100%"
      />
      <el-select :v-model="data.category_id" placeholder="choose category">
        <el-option
          :label="category.name"
          :value="category.id"
          v-for="category in categoriesList"
          :key="category"
          @click="log(category.id)"
        ></el-option>
      </el-select>
      <el-select
        :v-model="data.subcategory_id"
        placeholder="choose subcategory"
        v-if="categoryId > 0"
      >
        <el-option
          :label="subcategory.name"
          :value="subcategory.id"
          v-for="subcategory in subcategoriesList"
          :key="subcategory"
          @click="logSubcategory(subcategory.id)"
        ></el-option></el-select
      ><el-button type="success" round @click="search">Search</el-button></el-menu-item
    >
  </el-menu>
  <div class="h-6" />
</template>

<script setup lang="ts">
import { RouteName } from '@/router/constants'
import { ref, reactive } from 'vue'
import { useAuthenticationStore } from '@/stores/modules/authentication'
import { API } from '@/services'
import router from '@/router'
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { InputSearchProduct } from '@/services/products/types'
import { useProductStore } from '@/stores/modules/products'
const categoriesList = ref({})
const subcategoriesList = ref({})
const productsStore = useProductStore()
const categoryId = ref(0)
const subcategoryId = ref(0)
const data: InputSearchProduct = reactive({
  category_id: 0,
  subcategory_id: 0,
  keyword: ''
})
const search = () => {
  // console.log(data)
  try {
    const response = API.products.searchProducts(data)
    response.then((data) => {
      // console.log(data)
      productsStore.setProducts(data.data)
      router.push({ name: RouteName.RESULT_PAGE })
    })
  } catch (error) {
    if (error.response.status == 422) {
      ElMessage.error(error.response.data.message)
    }
    ElMessage.error(error.response)
  }
}

const onLogout = async () => {
  const authenticationStore = useAuthenticationStore()
  await API.users.logoutUser()
  authenticationStore.removeToken()
  // console.log(API)
  router.push(RouteName.LOGIN_PAGE)
}
onMounted(async () => {
  const categories = API.categories.getCategories()
  categories.then((res) => {
    // console.log(res.data)
    categoriesList.value = res.data
  })
  categories.catch((err) => {
    console.log(err)
    ElMessage.error(err)
  })
  // console.log(subcategoriesList)
})
const loadCategories = (id: number) => {
  const response = API.subcategories.getSubcategoriesByCategoryId(id)
  response.then((res) => {
    // console.log(res.data)
    subcategoriesList.value = res.data
  })
  response.catch((err) => {
    console.log(err)
    ElMessage.error(err)
  })
}
const log = (id: number) => {
  // ElMessage.error('' + id)
  categoryId.value = id
  data.category_id = id
  loadCategories(id)
}
const logSubcategory = (id: number) => {
  // ElMessage.error('' + id)
  subcategoryId.value = id
  data.subcategory_id = id
}
</script>

<style scoped></style>
