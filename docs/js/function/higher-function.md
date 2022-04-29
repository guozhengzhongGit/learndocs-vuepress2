---
lang: zh-CN
title: 高阶函数
description: 高阶函数
---
### 以封装一个判断数据类型的方法举例
@[code js](./src/higher-function.js)
使用方法的时候，可以直接调用 fns 上对应的方法
- - -
### 实现一个 after 函数
> 函数调用若干次以后才去执行回调
@[code js](./src/after.js)
### aop
@[code{4-20} js](./src/aop.js)
如果使用箭头函数，可以直接绑定好 this
@[code{23-30} js{2-6}](./src/aop.js)
或者使用 bind
@[code{32-40} js{6}](./src/aop.js)
### 使用回调来解决异步问题