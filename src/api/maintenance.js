import request from '@/utils/request';

export const getSelectItemList = () => {
  return request({
    url: '/apsbackend/assetType/allList',
    method: 'post',
  });
};

//Top 5
export const getTop5Data = () => {
  return request({
    url: '/apsbackend/maintenance/topData',
    method: 'post',
  });
};

//maintenance list
export const getMaintenancelist = (params) => {
  return request({
    url: '/apsbackend/maintenance/list',
    method: 'post',
    data: params,
  });
};

//maintenance create
export const createMaintenance = (params) => {
  return request({
    url: '/apsbackend/maintenance/create',
    method: 'post',
    data: params,
  });
};

//maintenance completed
export const completedMaintenance = (params) => {
  return request({
    url: '/apsbackend/maintenance/completed',
    method: 'post',
    data: params,
  });
};

//maintenance download
export const download = (params) => {
  return request({
    url: `/apsbackend/maintenance/download?type=${params?.type}`,
    method: 'get',
  });
};

//value model
export const getModelChartData = (params) => {
  return request({
    url: '/apsbackend/maintenance/valueModelData',
    method: 'post',
    data: params,
  });
};
