import request from '@/utils/request';

//Total Assets
export const getTotalAssets = () => {
  return request({
    url: '/apsbackend/dashboard/totalAssets',
    method: 'post',
  });
};

//work orders queue
export const getWorkOrdersQueue = () => {
  return request({
    url: '/apsbackend/dashboard/workOrdersQueue',
    method: 'post',
  });
};

//event list
export const getEventList = (params) => {
  return request({
    url: '/apsbackend/dashboard/eventList',
    method: 'post',
    data: params,
  });
};

//Work orders
export const getWorkOrders = () => {
  return request({
    url: '/apsbackend/dashboard/totalWorkOrders',
    method: 'post',
  });
};
