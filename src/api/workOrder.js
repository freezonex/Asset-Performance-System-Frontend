
import request from '@/utils/request';

//列表
export const getWorkOrderList = (data) => {
  return request({
    url: '/apsbackend/workOrder/list',
    method: 'post',
    data: data,
  })
}


// 添加
export const addWorkOrder = (data) => {
  return request({
    url: '/apsbackend/workOrder/create',
    method: 'post',
    data: data,
  })
}

// 删除
export const workOrderDelete = (data) => {
  return request({
    url: '/apsbackend/workOrder/delete',
    method: 'post',
    data: data,
  })
}
