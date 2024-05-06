/** @type {import('next').NextConfig} */

const path = require('path')
const { getEvnData } = require('./config/environments')

//* 设置环境
var environment = process.env.PROJECT_ENV || 'localhost';
var env = getEvnData(environment)

// 非运行状态
if(!process.env.PROJECT_START){
  console.log('--------------------------------------------');
  console.log(`--------------当前环境是${environment}----------------`);
  console.log('--------------------------------------------');
  console.log(env);
}

const nextConfig = {
  
  basePath: '/apsfrontend',
  // assetPrefix: '',
  assetPrefix: process.env.NODE_ENV === "production" ? "/apsfrontend/" : undefined,
  
  //静态导出
  output:'export',
  // output:'export',

  // basePath: '/apsfrontend',
  // output:'standalone',
  // trailingSlash:true,
  // // 设置 publicPath
  // assetPrefix: './',
  // // 设置哈希路由
  // exportPathMap: function () {
  //   return {
  //     '/': { page: '/' },
  //   };
  // },

  // 开启 webpack5
  webpack5: true,

  // React严格模式
  reactStrictMode: true,

  compiler: {
    // 开启 styled-components
    styledComponents: true,
  },

  // sass配置
  sassOptions: {
    includePaths: [path.join(__dirname, '/src/styles')],
  },

  // 多环境配置
  env: env,

  // // 国际化
  // i18n: {
  //   locales: ['en-US', 'zh-CH'],
  //   defaultLocale: 'zh-CH',
  // },
}

module.exports = nextConfig
