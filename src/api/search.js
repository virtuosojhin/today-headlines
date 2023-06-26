/**
 * 搜索联想模块
 */
import request from '@/utils/request'

export const getSearchSuggeation = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
