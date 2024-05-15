// 全局样式（应用于所有页面和组件）
import '@/styles/global/index.scss'
import React from 'react'
import GlobalLayout from "@/layouts/GlobalLayout";
import { message } from 'antd'; // 导入 Ant Design Message 组件

import { useRouter } from 'next/navigation';

message.config({
  top:50,
  duration: 3, // 持续显示时间（秒）
  maxCount: 3, // 最大同时显示数量
  prefixCls: 'my-antd-message',
});

export default function App(params) {
  const router = useRouter();

  var { Component, pageProps } = params
  
  // 使用在页面级别定义的布局（如果可用）
  const getLayout = Component.getLayout || ((page) => page)

  // 处理添加 base 后 首页404问题
  var url = params?.router?.state?.asPath
  if(url == '/' ){
    router.replace(`/dashboard`);
    return <></>
  }
  
  return (
    <GlobalLayout>
        {getLayout(<Component {...pageProps} />)}
    </GlobalLayout>
  );
}
