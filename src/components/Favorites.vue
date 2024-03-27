<template>
  <el-container>
    <el-header><Sidebar /></el-header>
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-main>
        <el-row :gutter="10" v-for="favorite in favoritesList" :key="favorite.id">
          <el-col :xs="10" :sm="6" :md="4" :lg="4" :xl="4"
            ><el-card style="max-width: 480px">
              <template #header>
                <div class="card-header">
                  <span>{{ favorite.name }}</span>
                </div>
              </template>
              <p class="text item">{{ favorite.description }}</p>
              <template #footer
                >{{ favorite.name }}
                <div class="mb-4">
                  <el-button type="danger" size="small" @click="deleteFavorite(favorite.id)"
                    >Unfavorite</el-button
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
import Sidebar from './Sidebar.vue'
import { onMounted, ref } from 'vue'
import { API } from '@/services'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { RouteName } from '@/router/constants'
const favoritesList = ref({})
onMounted(() => {
  const response = API.favorites.getFavorites()
  response.then((data) => {
    favoritesList.value = data.data
    // console.log(data)
  })
  response.catch((error) => {
    ElMessage.error(error)
  })
})

const deleteFavorite = (id: number) => {
  ElMessage.success('Deleted favorite item' + id)
  const response = API.favorites.unFavorite(id)
  response.then((data) => {
    ElMessage.success('delete favorite')
    favoritesList.value = favoritesList.value.filter((favorite) => {
      return favorite.id !== id
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
