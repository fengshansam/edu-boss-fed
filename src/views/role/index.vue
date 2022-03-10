<template>
  <div class="role">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="角色名称">
            <el-input
              v-model="formInline.name"
              placeholder="角色名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="content">
        <div class="btn-box">
          <el-button @click="addRole">添加角色</el-button>
        </div>
        <el-table :data="roleData" border style="width: 100%">
          <el-table-column width="80" label="序号" align="center" type="index">
          </el-table-column>
          <el-table-column
            prop="name"
            label="角色名称"
            min-width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述"
            min-width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="createdTime"
            label="添加时间"
            min-width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            width="200"
            align="center"
          >
            <template slot-scope="scope">
              <el-row style="margin-bottom: 10px">
                <el-button size="mini" type="text" @click="$router.push({
                  name: 'alloc-menu',
                  params: {
                    roleId: scope.row.id,
                    a: 1
                  }
                })">分配菜单</el-button>
                <el-button size="mini" type="text">分配资源</el-button>
              </el-row>
              <el-row>
                <el-button
                  size="mini"
                  type="text"
                  @click="handleEdit(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="text"
                  @click="handleDelete(scope.row)"
                  >删除</el-button
                >
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <createOrEdit @saveSuccess="saveSuccess" @cancle="cancle" v-if="dialogVisible" :roleId="roleId" ref="form" />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getRole, deleteRole } from '@/services/role'
import createOrEdit from './components/createOrEdit.vue'
export default Vue.extend({
  name: 'roleIndex',
  components: {
    createOrEdit
  },
  data () {
    return {
      formInline: {
        name: ''
      },
      roleData: [],
      dialogVisible: false,
      roleId: ''
    }
  },
  created () {
    this.loadRole()
  },
  methods: {
    async loadRole () {
      const { data: res } = await getRole(this.formInline)
      if (res.code === '000000') {
        this.roleData = res.data.records
      }
    },
    handleEdit (item: any) {
      this.roleId = item.id
      this.dialogVisible = true
    },
    handleDelete (item: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          const { data: res } = await deleteRole(item.id)
          if (res.code === '000000') {
            this.$message.success('删除成功')
            this.loadRole()
          } else {
            this.$message.error(`${res.mesg}`)
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message.info('已取消删除')
        })
    },
    onSubmit () {
      this.loadRole()
    },
    saveSuccess () {
      this.dialogVisible = false
      this.loadRole()
    },
    addRole () {
      this.roleId = ''
      this.dialogVisible = true
    },
    cancle () {
      this.dialogVisible = false
    },
    handleClose (done: any) {
      this.$confirm('确认关闭？')
        .then(() => {
          console.log()
          done()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
</script>
<style lang="scss">
.role {
  .el-card__body {
    padding: 20px 0;
  }
  .btn-box {
    margin-bottom: 20px;
    margin-left: 20px;
  }
}
</style>
