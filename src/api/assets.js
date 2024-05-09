
import request from '@/utils/request';

//列表
export const getAssetList = (data) => {
  return request({
    url: '/apsbackend/asset/list',
    method: 'post',
    data: data,
  })
}

// 新增
export const addAsset = (data) => {
  return request({
    url: '/apsbackend/asset/create',
    method: 'post',
    data: data,
  })
}
