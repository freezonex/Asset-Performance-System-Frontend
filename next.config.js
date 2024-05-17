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

var next = {}

// 静态打包
if(process.env.STATIC_EXPORT){
  next = {
    ...next,
    output:'export',
    assetPrefix: '/',
  }
}

const nextConfig = {
  output: 'export',

  ...next,

  basePath: '/apps/freezonex-aps/apsfrontend',

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
