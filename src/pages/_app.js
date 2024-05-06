// 全局样式（应用于所有页面和组件）
import '@/styles/global/index.scss'
import React from 'react'
import GlobalLayout from "@/layouts/GlobalLayout";

export default function App(params) {
  var { Component, pageProps } = params
  
  // 使用在页面级别定义的布局（如果可用）
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <GlobalLayout>
        {getLayout(<Component {...pageProps} />)}
    </GlobalLayout>
  );
}
