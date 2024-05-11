
import request from '@/utils/request';

export const inventorylist = (data) => {
  return request({
    url: '/apsbackend/inventory/list',
    method: 'post',
    data: data,
  })
}


export const queryByAssetTypeList = (data) => {
  return request({
    url: '/apsbackend/inventory/queryByAssetTypeList',
    method: 'post',
    data: data,
  })
}


export const allList = (data) => {
  return request({
    url: '/apsbackend/assetType/allList',
    method: 'post',
    data: data,
  })
}


// 图表
export const queryChartData = (data) => {
  return request({
    url: '/apsbackend/inventory/queryChartData',
    method: 'post',
    data: data,
  })
}