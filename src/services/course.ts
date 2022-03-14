import request from '@/utils/request.js'

export const getQueryCourses = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}
export const changeState = (params: any) => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params
  })
}
export const saveOrUpdateCourse = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}
export const uploadImg = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data
  })
}
