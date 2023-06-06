/**
 * 用户相关的请求模块
 */
// import store from '@/store'
import request from '@/utils/request'

/**
 * 用户登录
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
/**
 *
 * 发送验证码
 * 注意 ：每个手机号每分钟一次
*/
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/**
 *
 * 获取用户自己的信息
*/
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // 发送请求头数据
    // Headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
