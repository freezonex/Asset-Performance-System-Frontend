
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


export const assetTypeList = (data) => {
  return request({
    url: '/apsbackend/inventory/assetType/list',
    method: 'post',
    data: data,
  })
}

// Safety level asset type quantity list
export const assetTypeQuantityList = (data) => {
  return request({
    url: '/apsbackend/inventory/assetTypeQuantity/list',
    method: 'post',
    data: data,
  })
}
// 添加 asset type name
export const createAssetTypeName = (data) => {
  return request({
    url: '/apsbackend/assetType/create',
    method: 'post',
    data: data,
  })
}
// 添加  Inventory
export const createInventory = (data) => {
  return request({
    url: '/apsbackend/inventory/create',
    method: 'post',
    data: data,
  })
}


