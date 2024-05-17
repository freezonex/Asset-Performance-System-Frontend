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
