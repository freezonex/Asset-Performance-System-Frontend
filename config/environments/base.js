/**
 * 基础
 */

var fs = require('fs');
const packageFile = JSON.parse(fs.readFileSync('./package.json'));


module.exports = {
  // 环境
  'environment': process.env.PROJECT_ENV,
  'nodeEnv': process.env.NODE_ENV,

  // iconFont 图标地址
  'iconFontUrl': '//at.alicdn.com/t/c/font_4262248_ggh7ezz8087.js',

  // 接口前缀 （本地调试时候可能没有前缀，其他环境有前缀）
  'userApiPrefix': '/user',
  'servePrefix': '/serve',
  'commonPrefix': '/common',
  'devPrefix': '/dev',
};
