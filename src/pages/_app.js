// 全局样式（应用于所有页面和组件）
import '@/styles/global/index.scss'
import React from 'react'
import GlobalLayout from "@/layouts/GlobalLayout";

import { useRouter } from 'next/navigation';

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
