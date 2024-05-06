/**
 * rx全局事件
 */
import {
  Subject,
} from 'rxjs-compat';


// 调用接口之后
let requestAfter = new Subject();

// 登录之后
let loginAfter = new Subject();

// 退出登录之后
let clearLoginAfter = new Subject();

export { requestAfter, loginAfter, clearLoginAfter };
export default {
  requestAfter,
  loginAfter,
  clearLoginAfter,
};
