/**
 * 封装 axios 请求模块
 */
import store from '@/store'
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/' // 基础路径
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
// 请求发起会经过这里
// config是本次请求的请求配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearar ${user.token}`
  }
  return config
  // 这里务必返回config对象，否则请求就停在这里出不去
}, function (error) {
// 请求出错会经过这里
  return Promise.reject(error)
})

// 响应拦截器
export default request
