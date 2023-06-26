/**
 * 文章请求模块
 */
import request from '@/utils/request'

/**
 * 请求获取文章列表数据
 */
export const getArticles = params => {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET',
    params
  })
}
