<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { API } from '@/services'
const categoriesList = ref({})
const categoriesChecked = ref([])
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

const checkCategory = (id: number) => {
  if (categoriesChecked.value.some((obj) => obj.id === id)) {
    categoriesChecked.value = categoriesChecked.value.filter((category) => {
      return id != category.id
    })
  } else {
    categoriesChecked.value.push(categoriesList.value.find((obj) => obj.id === id))
  }
  // console.log(categoriesChecked.value)
}
</script>

<template>
  <div>
    <el-checkbox
      v-for="category in categoriesList"
      :key="category.id"
      :label="category.name"
      size="large"
      @click="checkCategory(category.id)"
    />
  </div>
</template>
<style scope></style>
