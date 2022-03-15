<template>
  <div class="login">
    <el-form
      label-position="top"
      class="login-form"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="onSubmit"
          :loading="loading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { login } from '@/services/user'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'loginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在6到18个字符', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    onSubmit () {
      (this.$refs.form as Form).validate(async (valid: boolean) => {
        if (valid) {
          this.loading = true
          const { data } = await login(this.form)
          this.loading = false
          if (data.state !== 1) {
            return this.$message.error(data.message)
          }
          this.$store.commit('setUser', data.content)
          this.$message.success('登录成功！')
          // this.$router.push({
          //   name: 'home'
          // })
          // this.$router.push(this.$route.query.redirect as string || '/')
          this.$router.push('/')
        }
      })
    }
  }
})
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-form {
    width: 300px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
