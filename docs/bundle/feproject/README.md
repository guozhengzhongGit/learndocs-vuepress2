---
title: "前端工程化"
tags:
  - 前端工程化
---

# 前端工程化

### 本地开发

- cli 脚手架自动生成项目的基础结构和目录

- 组件化开发，使用打包工具自动处理模块间的依赖关系，产出线上代码的过程中自动做代码分割、公共依赖提取、Tree shaking 等优化措施

- 前端自己生成 Mock 数据

- 团队开发流程规范，代码规范。使用 ESlint 校验，确保团队代码风格的统一，使用 husky 和 commitlint，调用 git commit 钩子，如果 代码中有 lint 报错则无法提交，commit 信息格式不规范也无法提交代码到远程仓库

### 提效

- 使用 `commander` 和 `inquirer` 完成 npm 启动时的交互式选项，可动态设定环境变量，匹配不同环境下的 API 请求地址等
- 对于不需要打包到生产环境里的代码，通过自定义 Loader 的方式，将其从最终的 bundle 中剔除出去，实现 webpack 的条件编译

```js
// selfLoader.js
const loaderUtils = require("loader-utils"); // 解析 options 参数

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  console.log(options, options.NODE_ENV === process.env.NODE_ENV);
  const reg = /\/\*\s*IF-START-U([\s\S]+?)IF-END-U\s*\*\//g;
  if (options.NODE_ENV === process.env.NODE_ENV && reg.test(source)) {
    source = source.replace(reg, ($match, $1) => $1);
  }
  return source;
};
```

在使用时，把想要根据条件决定是否需要打包到 bundle 中的代码包裹到 /_ IF-START-U ... IF-END-U _/ 中即可，如下：

```js
/* IF-START-U
import Text from "./components/Text";
IF-END-U */
```

### 错误监控和异常上报

#### sentry 配置

第一步：安装 webpack 插件

```
$ npm install --save-dev @sentry/webpack-plugin
```

第二步：在项目根目录增加一个 `.sentryclirc` 文件做对应的配置

```js
[defaults]
url = https://sentry.zhiyinlou.com/
org = sentry
project = weekly_pc

[auth]
token = a2d6cbf9448d4ca1a8d4b940aea0dacbc4f51065b1d14562b6e40b16bf10d1e9
```

> org 在 sentry 后台 Organization settings 里查

# 前端综合

## 001. 性能优化

- 加载过程
  - 白屏时间。从输入 URL 回车到页面开始出现第一个字符的时间。包括 DNS 查询、三次握手建立 TCP 连接，发送首个 HTTP 请求，如果是 HTTPS 还需要加上 TLS 的验证时间，返回 HTML 文档准备解析。
  - 首屏时间。白屏时间 + 渲染时间。指从浏览器输出 URL 回车到首屏内容渲染完毕的时间。用秒开率来衡量，即一秒内打开用户的占比

## 002. 前端工程化

### 本地开发

- cli 脚手架自动生成项目的基础结构和目录

- 组件化开发，使用打包工具自动处理模块间的依赖关系，产出线上代码的过程中自动做代码分割、公共依赖提取、Tree shaking 等优化措施

- 前端自己生成 Mock 数据

- 团队开发流程规范，代码规范。使用 ESlint 校验，确保团队代码风格的统一，使用 husky 和 commitlint，调用 git commit 钩子，如果 代码中有 lint 报错则无法提交，commit 信息格式不规范也无法提交代码到远程仓库

### 提效

- 使用 `commander` 和 `inquirer` 完成 npm 启动时的交互式选项，可动态设定环境变量，匹配不同环境下的 API 请求地址等
- 对于不需要打包到生产环境里的代码，通过自定义 Loader 的方式，将其从最终的 bundle 中剔除出去，实现 webpack 的条件编译

```js
// selfLoader.js
const loaderUtils = require("loader-utils"); // 解析 options 参数

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  console.log(options, options.NODE_ENV === process.env.NODE_ENV);
  const reg = /\/\*\s*IF-START-U([\s\S]+?)IF-END-U\s*\*\//g;
  if (options.NODE_ENV === process.env.NODE_ENV && reg.test(source)) {
    source = source.replace(reg, ($match, $1) => $1);
  }
  return source;
};
```

在使用时，把想要根据条件决定是否需要打包到 bundle 中的代码包裹到 /_ IF-START-U ... IF-END-U _/ 中即可，如下：

```js
/* IF-START-U
import Text from "./components/Text";
IF-END-U */
```
