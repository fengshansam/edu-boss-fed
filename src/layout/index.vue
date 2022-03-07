<template>
  <el-container>
    <el-aside>
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import Vue from 'vue'
import AppAside from './component/app-aside.vue'
import AppHeader from './component/app-header.vue'
export default Vue.extend({
  name: 'layout',
  components: {
    AppAside,
    AppHeader
  }
})
</script>
<style lang="scss" scoped>
.el-container{
  height: 100vh;
  min-width: 980px;
}
.el-header {
  background: #fff;
}
</style>
