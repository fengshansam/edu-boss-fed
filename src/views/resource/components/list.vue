<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="资源名称">
            <el-input v-model="form.name" placeholder="资源名称"></el-input>
          </el-form-item>
          <el-form-item label="资源路径">
            <el-input v-model="form.url" placeholder="资源路径"></el-input>
          </el-form-item>
          <el-form-item label="资源分类">
            <el-select v-model="form.categoryId" placeholder="资源分类" clearable>
              <el-option :label="item.name" :value="item.id" v-for="item in categorys" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="resourceData" style="width: 100%" v-loading="isLoading">
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
    <el-pagination
      :disabled="isLoading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.current"
      :page-sizes="[5, 10, 20]"
      :page-size="form.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getResourcePages, getAllCategory } from '@/services/resource'
export default Vue.extend({
  name: 'resourceList',
  data () {
    return {
      form: {
        name: '',
        url: '',
        categoryId: '',
        current: 1,
        size: 5
      },
      resourceData: [],
      totalCount: 0,
      categorys: [],
      isLoading: true
    }
  },
  created () {
    this.loadResource()
    this.loadCategory()
  },
  methods: {
    async loadResource () {
      this.isLoading = true
      const { data: res } = await getResourcePages(this.form)
      this.isLoading = false
      if (res.code === '000000') {
        this.resourceData = res.data.records
        this.totalCount = res.data.total
      }
    },
    async loadCategory () {
      const { data: res } = await getAllCategory()
      if (res.code === '000000') {
        this.categorys = res.data
      }
    },
    handleClick () {
      console.log()
    },
    onSubmit () {
      console.log('submit!')
      this.form.current = 1
      this.loadResource()
    },
    handleSizeChange (val: number) {
      console.log(`每页 ${val} 条`)
      this.form.size = val
      this.form.current = 1
      this.loadResource()
    },
    handleCurrentChange (val: number) {
      console.log(`当前页: ${val}`)
      this.form.current = val
      this.loadResource()
    }
  }
})
</script>
<style lang="scss" scoped></style>
