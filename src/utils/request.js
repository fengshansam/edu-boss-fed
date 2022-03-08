import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import qs from 'qs'

const request = axios.create({})

const redirectLogin = () => {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

const refreshToken = () => {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

request.interceptors.request.use(
  function (config) {
    const { user } = store.state
    if (user && user.access_token) {
      config.headers.Authorization = user.access_token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
let isRefreshing = false // 控制刷新token的状态
let requests = [] // 存储刷新token期间过来的401请求
request.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response) {
      // 请求发出去收到响应，但是状态码超出了2xx范围
      const { status } = error.response
      if (status === 400) {
        Message.error('请求参数错误')
      } else if (status === 401) {
        if (!store.state.user) {
          redirectLogin()
          return Promise.reject(error)
        }

        if (!isRefreshing) {
          isRefreshing = true
          return refreshToken().then(res => {
            if (!res.data.success) {
              throw new Error('刷新token失败')
            }
            store.commit('setUser', res.data.content)
            requests.forEach(cd => cd())
            // 重置requests数组
            requests = []
            // 把本次失败请求重新发出去
            return request(error.config)
          }).catch(error => {
            store.commit('setUser', null)
            redirectLogin()
            return Promise.reject(error)
          }).finally(() => {
            isRefreshing = false
          })
        }
        // 存储token刷新期间过来的请求
        return new Promise(resolve => {
          requests.push(() => {
            resolve(request(error.config))
          })
        })
        // token无效
      } else if (status === 403) {
        Message.error('没有权限，请联系管理员')
      } else if (status === 404) {
        Message.error('资源不存在')
      } else if (status >= 500) {
        Message.error('服务端错误，请联系后端开发人员')
      }
    } else if (error.request) {
      // 请求发出去没有收到响应， 例如断网了
      Message.error('请求超时，请刷新重试')
    } else {
      // 在设置请求时发生了一些事，触发了一个错误
      Message.error(`请求失败: ${error.message}`)
    }
    return Promise.reject(error)
  }
)
export default request
