<template>
  <div class="course">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="课程名称">
            <el-input v-model="form.courseName" placeholder="资源名称"></el-input>
          </el-form-item>
          <el-form-item label="资源路径">
            <el-input v-model="form.url" placeholder="资源路径"></el-input>
          </el-form-item>
          <el-form-item label="资源分类">
            <el-select
              v-model="form.categoryId"
              placeholder="资源分类"
              clearable
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in categorys"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="content">
         <div class="btn-box">
          <el-button @click="$router.push({
            name: 'create-course'
          })">添加课程</el-button>
        </div>
        <el-table
          :data="resourceData"
          style="width: 100%"
          v-loading="isLoading"
          border
        >
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="courseName" label="课程名称" min-width="180" align="center">
          </el-table-column>
          <el-table-column prop="price" label="价格" min-width="180" align="center">
          </el-table-column>
          <el-table-column prop="status" label="上架状态" min-width="180" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                :disabled="scope.row.isLoading"
                @change="onStatusChange(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button type="text" size="small" @click="$router.push({
                name: 'create-course',
                query: {
                  courseId: scope.row.id
                }
              })">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
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
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getQueryCourses, changeState } from '@/services/course'
export default Vue.extend({
  name: 'courseIndex',
  data () {
    return {
      form: {
        currentPage: 1,
        pageSize: 10,
        courseName: '',
        status: 0
      },
      resourceData: [],
      totalCount: 0,
      categorys: [],
      isLoading: true
    }
  },
  created () {
    this.loadCourses()
  },
  methods: {
    async loadCourses () {
      this.isLoading = true
      const { data: res } = await getQueryCourses(this.form)
      this.isLoading = false
      if (res.code === '000000') {
        this.resourceData = res.data.records.map((item: any) => {
          item.isLoading = false
          return item
        })
        this.totalCount = res.data.total
      }
    },
    handleClick () {
      console.log()
    },
    onSubmit () {
      console.log('submit!')
      this.form.currentPage = 1
      this.loadCourses()
    },
    handleSizeChange (val: number) {
      console.log(`每页 ${val} 条`)
      this.form.pageSize = val
      this.form.currentPage = 1
      this.loadCourses()
    },
    handleCurrentChange (val: number) {
      console.log(`当前页: ${val}`)
      this.form.currentPage = val
      this.loadCourses()
    },
    async onStatusChange (course: any) {
      course.isLoading = true
      const params = {
        courseId: course.id,
        status: course.status
      }
      const { data: res } = await changeState(params)
      course.isLoading = false
      this.$message.success(`${course.status === 1 ? '上架' : '下架'}成功`)
    }
  }
})
</script>
<style lang="scss" >
.course {
  .el-card__body {
    padding: 20px 0;
  }
  .btn-box {
    margin-bottom: 20px;
    margin-left: 20px;
  }
}
</style>
