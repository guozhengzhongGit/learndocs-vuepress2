---
title: react
tags:
  - react
---

# react

web 应用的性能主要受到两种场景的制约：

1. 有大量逻辑计算使得页面掉帧，导致卡顿
2. 发送网络请求后，需要等待数据返回才能进一步操作

可以抽象概括为：

1. **CPU 瓶颈**
2. **IO 瓶颈**

解决 CPU 瓶颈，React 使用了时间切片，将**同步的更新**转变为**可中断的异步更新**
解决 IO 瓶颈，React 引入了 Suspence 特性

## React v15 的架构

分为两层：

- Reconciler（协调器）负责找出变化的组件
- Renderer（渲染器）负责将变化的组件渲染到页面上

## React hooks

[react-hooks 详解](./hooks.md)

## 开发技巧

state 中最好不要保存可以通过计算得到的值，比如：

1. 从 props 中传递过来的值。有时候 props 传递过来的值无法直接使用，而是要通过一定的计算后再在 UI 上展示，比如说排序。那么我们要做的就是每次用的时候，都重新排序一下或者利用某些 cache 机制，而不是将结果直接放到 state 里
2. 从 URL 中读到的值。用的时候随时读取，不用放到 state 里
3. 从 cookie 或者 localStorage 里读取到的值
