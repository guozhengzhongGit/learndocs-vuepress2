---
lang: zh-CN
title: ES6
description: es6 模块化
---

# 前端模块化
### 先提几个问题
1. 为何有的地方使用 require 去引用一个模块时需要加上 default ？比如 `require('xxx').default`

2. 有些 UI 库引用某个组件时会将所有组件代码全部引入，需要配合 babel-plugin-import 才能实现按需引入，为什么

3. 为什么可以使用 es6 的 import 去引用 commonjs 规范定义的模块，或者反过来也可以

4. 我们在使用 npm 包时，大多都是使用 import 或者 require 来进行引用，实质上拿到的是经过 webpack 或者 rollup 构建生成的 `dist/*.js` 或者 `lib/*.js`，但我们自己编写的业务代码却不能再被当做模块使用，这其中，哪个环节起到了关键作用，webpack 还是 babel

5. es6 支持 tree-shaking，怎么才能使用
