
import request from '@/utils/request';

// 用户列表
export const getList = (data) => {
  return request({
    url: '/user/pageQuery',
    method: 'post',
    data: data,
  })
}
