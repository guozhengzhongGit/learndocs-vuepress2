---
title: 手写代码-实现常用方法
tags:
  - 防抖
  - 节流
---

# 实现常用方法

## 001. 防抖和节流

### 防抖

限制一个函数在事件触发的 N 秒以后再执行，若期间事件再次被触发，则重新计算延迟

### 节流

规定在单位时间内只能有一次事件可以真正触发函数的执行，其他触发被丢弃