import request from '@/utils/request.js'

export const getRole = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}
export const saveOrUpdateRole = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}
export const deleteRole = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}
export const getRoleById = (id: number | string) => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}
