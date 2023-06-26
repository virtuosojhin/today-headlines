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
    method: 'GET'
  })
}

/**
 * 添加用户列表
 */
export const addUserChannel = channel => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}

/**
 * 删除用户指定列表
 */
export const deleteUserChannel = channelId => {
  return request({
    url: `/v1_0/user/channels/${channelId}`,
    method: 'DELETE'
  })
}
