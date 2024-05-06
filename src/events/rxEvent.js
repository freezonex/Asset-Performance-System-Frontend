/**
 * rx全局事件
 */
import {
  Subject,
} from 'rxjs-compat';


// 发送信息事件
let sendMsg = new Subject();

// 调用接口之后
let requestAfter = new Subject();

// 登录之后
let loginAfter = new Subject();

// 退出登录之后
let clearLoginAfter = new Subject();

export { sendMsg, requestAfter, loginAfter, clearLoginAfter };
export default {
  sendMsg,
  requestAfter,
  loginAfter,
  clearLoginAfter,
};
