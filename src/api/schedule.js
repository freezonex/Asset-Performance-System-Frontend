
import request from '@/utils/request';

//列表
export const getScheduleList = (data) => {
  return request({
    url: '/apsbackend/schedule/queryFormData',
    method: 'post',
    data: data,
  })
}

// header cards
export const getHeaderData = (data) => {
  return request({
    url: '/apsbackend/schedule/queryHeadData',
    method: 'post',
    data: data,
  })
}
