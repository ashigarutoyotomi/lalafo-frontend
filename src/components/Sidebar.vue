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
    </el-sub-menu>
    <el-menu-item index="3"
      ><router-link :to="{ name: RouteName.ABOUT_PAGE }"> About</router-link></el-menu-item
    >
    <el-menu-item index="4">
      <el-input
        v-model="input"
        style="width: 200px"
        placeholder="Please input"
        clearable
      /><el-button type="success" round @click="search">Search</el-button></el-menu-item
    >
  </el-menu>
  <div class="h-6" />
</template>

<script setup lang="ts">
import { RouteName } from '@/router/constants'
import { ref } from 'vue'

const input = ref('')

const search = () => {
  console.log(input.value)
}
</script>

<style scoped></style>
