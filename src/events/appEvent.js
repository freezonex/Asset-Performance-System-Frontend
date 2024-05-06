/**
 * 应用级别事件处理
 */
import ep from '@/utils/eventproxy';
import { requestAfter, loginAfter, clearLoginAfter } from '@/events/rxEvent';

// BasicLayout 初始化
ep.on('basicLayoutInit', async function(data) {
  
});

// token 失效
ep.on('tokenError', function(data) {

});

// 修改主题之后
ep.on('themeAfter', function(data) {});

// request 之后
requestAfter.subscribe(data => {});

// request 之后 (防抖)
requestAfter.debounceTime(2000).subscribe(data => {});

// 登录之后
loginAfter.subscribe(data => {});

// 退出登录之后
clearLoginAfter.subscribe(data => {});
