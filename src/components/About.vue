<template>
  <Sidebar />
  <div class="text-center">
    <el-carousel width="100%" height="1000px">
      <el-carousel-item>
        <h3 class="small justify-center" text="2xl">
          <img src="@/assets/1.jpg" alt="" width="100%" />
        </h3>
      </el-carousel-item>
      <el-carousel-item>
        <h3 class="small justify-center" text="2xl">
          <img src="@/assets/2.png" alt="" width="100%" />
        </h3>
      </el-carousel-item>
      <el-carousel-item>
        <h3 class="small justify-center" text="2xl">
          <img src="@/assets/3.png" alt="" width="100%" />
        </h3>
      </el-carousel-item>
    </el-carousel>
  </div>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non reiciendis ducimus, minus qui
    deleniti molestiae laboriosam in nobis vero impedit excepturi saepe ipsam similique aut
    consectetur fugiat possimus tempore harum obcaecati. Veritatis, deleniti eveniet labore aliquam
    vitae laborum perspiciatis! Repellendus voluptatem, nihil laudantium consectetur ab esse quidem
    voluptas facilis similique?
  </p>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
</script>

<style scope>
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
