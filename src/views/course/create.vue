<template>
  <div class="create-course">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-steps :active="activeStep" simple>
          <el-step
            v-for="(step, index) in steps"
            :key="index"
            :title="step.title"
            :icon="step.icon"
            @click.native="activeStep = index"
          ></el-step>
        </el-steps>
      </div>
      <el-form ref="form" :model="form" label-width="100px">
        <div v-show="activeStep === 0">
          <el-form-item label="课程管理">
            <el-input v-model="form.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input v-model="form.brief"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input
              v-model="form.previewFirstField"
              type="textarea"
            ></el-input>
            <el-input
              v-model="form.previewSecondField"
              type="textarea"
            ></el-input>
          </el-form-item>
          <el-form-item label="讲师名称">
            <el-input v-model="form.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="form.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number
              v-model="form.sortNum"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </div>
        <div v-show="activeStep === 1">
          <el-form-item label="课程封面">
            <course-img v-model="form.courseListImg"></course-img>
          </el-form-item>
          <el-form-item label="解锁封面">
            <course-img v-model="form.courseImgUrl"></course-img>
          </el-form-item>
        </div>
        <div v-show="activeStep === 2">
          <el-form-item label="销售价格">
            <el-input v-model="form.discounts">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input v-model="form.price">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="form.sales">
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input v-model="form.discountsTag"> </el-input>
          </el-form-item>
        </div>
        <div v-show="activeStep === 3">
          <el-form-item label="限时秒杀开关">
            <el-switch
              v-model="form.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <template v-if="isSeckill">
            <el-form-item label="开始时间">
              <el-date-picker v-model="form.activityCourseDTO.beginTime" type="date" placeholder="选择开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker v-model="form.activityCourseDTO.endTime" type="date" placeholder="选择结束时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input v-model="form.activityCourseDTO.amount">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
              <el-input v-model="form.activityCourseDTO.stock">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <div v-show="activeStep === 4">
          <el-form-item label="课程详情">
            <el-input v-model="form.courseDescriptionMarkDown" type="textarea"></el-input>
          </el-form-item>
          <div style="text-align: center">
            <el-button @click="submit">保存</el-button>
          </div>
        </div>
        <el-button
          v-if="activeStep >= 0 && activeStep < steps.length - 1"
          @click="activeStep++"
          >下一步</el-button
        >
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import courseImg from './components/courseImg.vue'
import { saveOrUpdateCourse, getCourseById } from '@/services/course'
export default Vue.extend({
  components: { courseImg },
  name: 'createCourse',
  data () {
    return {
      form: {
        // id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0,
        sales: 0,
        activityCourse: true,
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      },
      activeStep: 0,
      steps: [
        {
          title: '基本信息',
          icon: 'el-icon-edit'
        },
        {
          title: '课程封面',
          icon: 'el-icon-edit'
        },
        {
          title: '销售信息',
          icon: 'el-icon-edit'
        },
        {
          title: '秒杀活动',
          icon: 'el-icon-edit'
        },
        {
          title: '课程详情',
          icon: 'el-icon-edit'
        }
      ],
      imageUrl: '',
      isSeckill: false
    }
  },
  created () {
    console.log(this.$route)
    if (this.$route.query.courseId) {
      this.getCourseById()
    }
  },
  methods: {
    async submit () {
      const { data: res } = await saveOrUpdateCourse(this.form)
      this.$message.success('保存成功')
      this.$router.back()
    },
    async getCourseById () {
      const params = {
        courseId: this.$route.query.courseId
      }
      const { data: res } = await getCourseById(params)
      this.form = res.data
    }
  }
})
</script>
<style lang="scss" scoped>
.create-course {
  ::v-deep.el-step {
    cursor: pointer;
  }
}
</style>
