<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="审批人">
            <el-input v-model="form.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="resourceData" style="width: 100%">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="name" label="资源名称" min-width="180">
        </el-table-column>
        <el-table-column prop="url" label="资源路径" min-width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述" min-width="180">
        </el-table-column>
        <el-table-column prop="createdTime" label="创建时间"> </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getResourcePages } from '@/services/resource'
export default Vue.extend({
  name: 'resourceList',
  data () {
    return {
      form: {
        user: '',
        region: ''
      },
      resourceData: [
      ]
    }
  },
  created () {
    this.loadResource()
  },
  methods: {
    async loadResource () {
      const { data: res } = await getResourcePages({})
      if (res.code === '000000') {
        this.resourceData = res.data.records
      }
    },
    handleClick () {
      console.log()
    },
    onSubmit () {
      console.log('submit!')
    }
  }
})
</script>
<style lang="scss" scoped></style>
