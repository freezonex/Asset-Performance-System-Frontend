import request from '@/utils/request';

//列表
export const getAssetList = (data) => {
  return request({
    url: '/apsbackend/asset/list',
    method: 'post',
    data: data,
  });
};

// 上传文件
export const addFile = (data) => {
  return request({
    url: '/apsbackend/asset/upload',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
// 新增
export const addAsset = (data) => {
  return request({
    url: '/apsbackend/asset/create',
    method: 'post',
    data: data,
  });
};
// asset type data
export const getAssetTypeList = (data) => {
  return request({
    url: '/apsbackend/assetType/allList',
    method: 'post',
    data: data,
  });
};
// 删除
export const assetDelete = (data) => {
  return request({
    url: '/apsbackend/asset/delete',
    method: 'post',
    data: data,
  });
};
