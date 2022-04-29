---
title: 综合扩展-浏览器相关
tags:
  - browser
  - v8
  - EventLoop
  - setTimeout
  - requestAnimationFrame
  - requestIdleCallback
---

# 浏览器 Browser

## 001. v8

包括 parse、解释器、GC 和 JIT 编译器

- parse，负责把 JS 源码转成 AST
- 解释器，负责转换 AST 成字节码，解释执行
- JIT Compiler，对执行时的热点函数进行编译，把字节码转成机器码，直接执行机器码效率更高
- GC，垃圾回收器，清理内存中不再使用的对象

### 编译过程

源码经过 parse 转成 AST，AST 转成字节码解释执行。运行时收集函数执行的频率，对于达到了一定阈值的热点代码，把对应的字节码转成机器码，直接执行

## 002. 渲染过程

解析 html 为 DOM 树，结合 CSS，计算每个可见元素在页面中的位置和布局样式，生成渲染树，分层绘制到页面上

每一次渲染流程叫做一帧，浏览器会有一个帧率，比如 60FPS 来刷新

JS 可以修改 DOM，因此 JS 引擎和渲染引擎是互斥的，JS 执行会阻塞 GUI 线程的绘制，怎么组织这二者呢，有两种思路：

1. 多线程
   分为多个线程，主线程来操作 UI 和渲染，其他线程来执行别的任务，不能多个线程同时修改 UI，顺序没法控制

#### 安卓 UI 架构

安卓就是这样的架构，在主线程里完成 UI 的更新，事件的绑定，其他逻辑可以放到别的线程，完成以后在消息队列中放一个消息，主线程不断循环的取消息来执行

#### electron 架构

electron 中分为了主进程和渲染进程，window 相关的操作只能在主线程，由渲染进程向主进程发消息（IPC）
:::tip
UI 系统设计，如果使用了多线程（进程）的架构，UI 只能在一个线程中操作，由别的线程发消息到主线程去更新 UI，如果是多个线程，则维护一个消息队列和 looper。消息队列的生产者是各子线程，消费者是主线程
:::

#### 浏览器的实现

JS 最初只是用来做表单处理，所以就设计成了单线程的模式，渲染和 JS 执行互相阻塞，通过 event loop 来实现二者的配合

> 虽然 H5 标准引入了 webworker，但还是有很多限制
> JS 引擎所在的宿主环境提供了 event loop，不同的宿主环境采用的实现也不同

- 注入的全局 API 不同
  - node 注入全局的 require api，提供内置的模块如 os、fs 等
  - 浏览器注入 w3c 标准的 api
- 处理的任务不同
  - 浏览器里主要是调度渲染和 JS 执行，还有 worker
  - node 里主要是调度各种 IO

## 003. 浏览器事件循环 Event Loop

JS 是单线程的。JS 引擎同一时间只能执行一个任务（方法）。为了避免长耗时的任务阻塞主线程，浏览器提供了任务队列。主线程在可执行上下文栈（ECS）中执行同步代码，有的代码调用异步 API，注册回调函数到事件列表中，异步任务有了运行结果（比如 setTimeout 第二个参数指定的延时到了）就将对应的回调函数推入任务队列（task queue）中等待主线程执行。ECS 中的同步代码执行完毕，读取任务队列，取出队首的回调放入执行栈中执行，如此循环往复就是事件循环机制。而根据不同的来源，异步任务分为宏任务和微任务，只有清空了当前这一轮事件循环里的微任务才会开始下一轮事件循环，因此 promise 总是比定时器先执行，因为 promise 是本次事件循环的微任务，而定时器是下一个宏任务了。

> 微任务来源：

- Promise
- MutationObserver
- Object.observe（已废弃）
- process.nextTick（node 环境）
  > 总结流程：
- 一开始 script 脚本作为宏任务执行
- 同步代码直接执行，异步代码根据不同来源推入宏任务队列或者微任务队列
- 同步代码执行完毕，读取任务队列队首的宏任务
- 宏任务执行完毕，执行其相关的微任务
- 关联的所有微任务执行完毕，读取下一个宏任务

## 004. Event Loop 存在的问题

每一帧的渲染是有固定频率的，如果 JS 执行过长，超过了一帧的刷新时间那么就会导致渲染延迟，“掉帧”，用户的感受就是界面卡顿

因此 JS 代码不能占用太长时间的主线程，要做拆分，像 React 这样的 UI 渲染框架要做计算的 fiber 化，在处理 UI 交互的时候，不能让计算阻塞渲染，要递归改循环，通过链表来做计算的暂停和恢复

## 005. requestAnimationFrame 是什么

浏览器在进行下一帧更新渲染之前会执行 requestAnimationFrame 注册的回调函数，不属于宏任务或者微任务

可以通过这个 API 去实现流畅度较高的动画效果。现在大多数设备的屏幕刷新率是 1 秒 60 次，即 60 fps，requestAnimationFrame 的原理就是与屏幕的刷新频率保持同步，在重渲染下一帧前执行传入的回调函数。因此它的兼容方案使用 setTimeout，传入的延时也是 1000/60

## 006. requestIdleCallback 是什么

在浏览器距离下一帧重新绘制还有空闲时间（每一帧的间隔时间）就执行这个回调函数；如果时间不够，就等下一帧

提供了 timeout 最长等待时间，如果每一帧都一直没时间执行这个逻辑，那么就算拖延了帧渲染也要强制执行

## 007. setTimeout 的工作原理

涉及到了浏览器的事件循环机制。它是一个 webApi，会注册一个回调函数，在经过指定的延时后，将回调函数推入事件队列，等待主线程执行

## 008. V8 垃圾回收