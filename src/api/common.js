
import request from '@/utils/request';

export const inventorylist = (data) => {
  return request({
    url: '/apsbackend/inventory/list',
    method: 'post',
    data: data,
  })
}
