/**
 * 文章请求模块
 */
import request from '@/utils/request'

/**
 * 获取所有频道列表
 */

export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels',
    method: 'get'
  })
}
