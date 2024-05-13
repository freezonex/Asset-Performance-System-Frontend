
import request from '@/utils/request';

//列表
export const getWorkOrderList = (data) => {
  return request({
    url: '/apsbackend/workOrder/list',
    method: 'post',
    data: data,
  })
}

// // 新增
// export const addAsset = (data) => {
//   return request({
//     url: '/apsbackend/asset/create',
//     method: 'post',
//     data: data,
//   })
// }
// 删除
export const workOrderDelete = (data) => {
  return request({
    url: '/apsbackend/workOrder/delete',
    method: 'post',
    data: data,
  })
}
