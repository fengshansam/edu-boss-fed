<template>
  <div class="user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="手机号">
            <el-input v-model="form.phone" placeholder="资源名称"></el-input>
          </el-form-item>
          <!-- <el-form-item label="注册时间">
            <el-input
              v-model="form.createdTime"
              placeholder="资源路径"
            ></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="resourceData" style="width: 100%" v-loading="isLoading">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="name" label="用户名称" min-width="180">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" min-width="180">
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" min-width="180">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >分配角色</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      :disabled="isLoading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="form.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    >
    </el-pagination>
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      top="30vh"
    >
      <el-select v-model="roleIdList" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getUserPages } from '@/services/user'
import { getAllRoles, allocateUserRoles, getUserRole } from '@/services/role'
export default Vue.extend({
  name: 'userIndex',
  data () {
    return {
      form: {
        currentPage: 0,
        pageSize: 10,
        phone: '',
        startCreateTime: '',
        endCreateTime: ''
      },
      resourceData: [],
      totalCount: 0,
      categorys: [],
      isLoading: true,
      dialogVisible: false,
      roles: [],
      roleIdList: [],
      currentUser: {}
    }
  },
  created () {
    this.loadUsers()
  },
  methods: {
    async loadUsers () {
      this.isLoading = true
      const { data: res } = await getUserPages(this.form)
      this.isLoading = false
      if (res.code === '000000') {
        this.resourceData = res.data.records
        this.totalCount = res.data.total
      }
    },
    handleClick (currentUser: any) {
      this.currentUser = currentUser
      this.dialogVisible = true
      this.getAllRoles()
      this.getUserRole((this.currentUser as any).id)
    },
    async getUserRole (userId: string | number) {
      const { data: res } = await getUserRole(userId)
      this.roleIdList = res.data.map((item: any) => {
        return item.id
      })
    },
    onSubmit () {
      console.log('submit!')
      this.form.currentPage = 1
      this.loadUsers()
    },
    handleSizeChange (val: number) {
      console.log(`每页 ${val} 条`)
      this.form.pageSize = val
      this.form.currentPage = 1
      this.loadUsers()
    },
    handleCurrentChange (val: number) {
      console.log(`当前页: ${val}`)
      this.form.currentPage = val
      this.loadUsers()
    },
    handleClose (done: any) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {
          console.log(_)
        })
    },
    async getAllRoles () {
      const { data: res } = await getAllRoles()
      this.roles = res.data
    },
    async submit () {
      const params = {
        userId: (this.currentUser as any).id,
        roleIdList: this.roleIdList
      }
      const { data: res } = await allocateUserRoles(params)
      this.$message.success('提交成功')
      this.dialogVisible = false
      this.currentUser = {}
      this.roleIdList = []
    }
  }
})
</script>
<style lang="scss" scoped></style>
