
import request from '@/utils/request';

//列表
export const getScheduleList = (data) => {
  return request({
    url: '/apsbackend/schedule/queryFormData',
    method: 'post',
    data: data,
  })
}

// 新增
// export const addAsset = (data) => {
//   return request({
//     url: '/apsbackend/asset/create',
//     method: 'post',
//     data: data,
//   })
// }
