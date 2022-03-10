<template>
  <div>
    <el-form ref="form" :model="form" label-position="top">
      <el-form-item label="角色名称">
        <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="form.code" placeholder="请输入角色编码"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input
          v-model="form.description"
          placeholder="请输入角色描述"
        ></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="$emit('cancle')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { saveOrUpdateRole, getRoleById } from '@/services/role'
export default Vue.extend({
  name: 'createOrEditRole',
  props: {
    roleId: [Number, String]
  },
  data () {
    return {
      form: {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  created () {
    if (this.roleId) {
      this.getRole()
    } else {
      this.form = {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  methods: {
    async getRole () {
      const { data: res } = await getRoleById(this.roleId)
      if (res.code === '000000') {
        this.form = res.data
      }
    },
    async onSubmit () {
      const { data: res } = await saveOrUpdateRole(this.form)
      if (res.code === '000000') {
        this.$emit('saveSuccess')
        this.$message.success('保存成功')
      } else {
        this.$message.error(`${res.mesg}`)
      }
    }
  }
})
</script>
<style lang="scss" scoped></style>
