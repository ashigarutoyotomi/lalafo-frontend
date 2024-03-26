<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { API } from '@/services'
const categoriesList = ref({})

onMounted(() => {
  const categories = API.categories.getCategories()
  categories.then((res) => {
    // console.log(res.data)
    categoriesList.value = res.data
  })
  categories.catch((err) => {
    console.log(err)
    ElMessage.error(err)
  })
})
</script>

<template>
  <div>
    <el-checkbox
      v-for="category in categoriesList"
      :key="category.id"
      :label="category.name"
      size="large"
    />
  </div>
</template>
<style scope></style>
