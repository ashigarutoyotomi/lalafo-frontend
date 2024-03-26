<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1"
      ><router-link :to="{ name: RouteName.HOME_PAGE }">HOME PAGE</router-link></el-menu-item
    >
    <el-sub-menu index="2">
      <template #title>Profile</template>
      <el-menu-item index="2-1">Add product lot</el-menu-item>
      <el-menu-item index="2-2">Settings</el-menu-item>
      <el-menu-item index="2-3">My lots</el-menu-item>
      <el-menu-item index="2-4">Favorites</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="3">About</el-menu-item>
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
