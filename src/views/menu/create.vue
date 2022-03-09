<template>
  <div class="create-menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">{{ $route.query.id ? '编辑菜单' : '添加菜单'}}</div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <el-option label="无上级菜单" :value="-1"></el-option>
            <el-option :label="item.name" :value="item.id" v-for="item in parentMenuList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.orderNum"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu'
export default Vue.extend({
  name: 'CreateMenu',
  data () {
    return {
      form: {
        parentId: null,
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: true
      },
      parentMenuList: []
    }
  },
  created () {
    this.getEditMenuInfo()
    console.log(this.$route.query)
  },
  methods: {
    async getEditMenuInfo () {
      const { data: res } = await getEditMenuInfo(this.$route.query.id as string || -1)
      if (res.code === '000000') {
        if (res.data.menuInfo) {
          this.form = res.data.menuInfo
        }
        this.parentMenuList = res.data.parentMenuList
      } else {
        this.$message.error(`${res.mesg}`)
      }
    },
    async onSubmit () {
      const { data: res } = await createOrUpdateMenu(this.form)
      if (res.code === '000000') {
        this.$message.success('保存成功！')
        this.$router.back()
      } else {
        this.$message.error(`${res.mesg}`)
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.create-menu {
  height: 100%;
  .el-card {
    height: 100%;
  }
}
</style>
