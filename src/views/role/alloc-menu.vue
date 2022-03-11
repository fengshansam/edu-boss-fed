<template>
  <div class="alloc-menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分配菜单</span>
      </div>
      <el-tree
      ref="tree"
        :data="menus"
        :props="defaultProps"
        node-key="id"
        show-checkbox
        default-expand-all
        @node-click="handleNodeClick"
        :default-checked-keys="checkedKeys"
      ></el-tree>
        <div style="text-align: center">
        <el-button  type="primary" @click="onSave">保存</el-button>
        </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'
import { Tree } from 'element-ui'
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
      },
      checkedKeys: []
    }
  },
  created () {
    this.loadMenus()
    this.loadRoleMenus()
  },
  methods: {
    async loadRoleMenus () {
      const { data: res } = await getRoleMenus(this.roleId)
      this.getCheckKeys(res.data)
    },
    getCheckKeys (menus: any) {
      menus.forEach((item: any) => {
        if (item.selected) {
          this.checkedKeys = [...this.checkedKeys, item.id] as never
        }
        if (item.subMenuList) {
          this.getCheckKeys(item.subMenuList)
        }
      })
    },
    async loadMenus () {
      const { data: res } = await getMenuNodeList()
      this.menus = res.data
    },
    handleNodeClick (data: any) {
      console.log(data)
    },
    async onSave () {
      const menuIdList = (this.$refs.tree as Tree).getCheckedKeys()
      const params = {
        roleId: this.roleId,
        menuIdList: menuIdList
      }
      await allocateRoleMenus(params)
      this.$router.back()
      this.$message.success('保存成功')
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
