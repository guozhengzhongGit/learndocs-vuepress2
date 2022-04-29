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

## 005. 前端模块化

> 什么是模块

只向外暴露一些接口或方法与外部通信

> 模块化发展过程

- 命名空间
- 匿名自执行函数（IIFE）
- 引入依赖的 IIFE
- 模块化标准
  - CommonJS 规范。Node 采用，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数和类都是私有的，对其他文件不可见。在服务器端，模块是在运行时**同步**加载的。
  - AMD 规范。异步加载模块，允许指定回调函数，require.js 的模块管理采用，AMD 规范使用 define 定义模块，使用 require 导入模块
  - CMD 规范。sea.js 采用，模块的加载是异步的，模块使用时才会加载执行。

### 模块化的好处

- 避免命名冲突
- 代码的分离与解耦，按需加载，Tree shaking 等优化手段
- 更高可复用性
- 更高可维护性

### CommonJS 规范

- 使用 `module.exports = value` 或者 `exports.xxx = value` 来暴露模块，使用 `require` 关键字来导入模块，其作用是读入并执行一个 JS 文件，然后返回该模块的 exports 对象

- 在每个模块内部，module 变量代表当前模块，这个变量是一个对象，它的 exports 属性是对外的接口。因此，加载某个模块，其实是加载该模块的 module.exports 属性

- CommonJS 模块的加载机制是：**输入的是被输出值的拷贝**。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值，例如：

```js
// lib.js
var count = 3;
function incCount() {
  count++;
}
module.exports = {
  count,
  incCount,
};

// main.js
const count = require("./lib").count;
const incCount = require("./lib").incCount;
console.log(count); // 3
incCount();
console.log(count); // 3
```

### ES Module 规范

ES6 模块规范的设计思想是尽可能的静态化，在编译时就能确定模块的依赖关系

export 规定模块的对外接口，import 用于导入模块

### ES6 模块与 CommonJS 模块的差异

- CommonJs 模块输出的是值的拷贝，ES 模块输出的是值的引用

- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。因为 CommonJS 加载的是一个对象，即 module.exports，只有在脚本运行完才会生成；而 ES6 模块的对外接口只是一种静态定义，在代码静态解析阶段就会生成
