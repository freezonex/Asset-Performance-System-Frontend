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
// 是否使用
export const assetStatusUpdate = (data) => {
  return request({
    url: '/apsbackend/asset/usedStatusUpdate',
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


// 获取departmentData
export const getDepartmentList = (data) => {
  return request({
    url: '/apsbackend/department/allList',
    method: 'post',
    data: data,
  });
};
// 添加departmentData
export const addDepartmentItem = (data) => {
  return request({
    url: '/apsbackend/department/create',
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
// 修改
export const assetUpdate = (data) => {
  return request({
    url: '/apsbackend/asset/update',
    method: 'post',
    data: data,
  });
};