<template>
  <div class="alloc-menu">
    <el-tree
      :data="menus"
      :props="defaultProps"
      show-checkbox
      default-expand-all
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList } from '@/services/menu'
export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
    }
  },
  created () {
    this.loadMenus()
  },
  methods: {
    async loadMenus () {
      const { data: res } = await getMenuNodeList()
      this.menus = res.data
    },
    handleNodeClick (data: any) {
      console.log(data)
    }
  }
})
</script>
<style lang="scss" scoped></style>
