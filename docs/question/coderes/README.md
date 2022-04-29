---
title: "高频题目-代码执行结果"
tags:
  - 代码执行结果
  - 输出
  - 原型
  - 继承
  - 闭包
  - 数据类型
---

# 代码执行结果类

## eventLoop

### 001. 下面代码输出什么

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function () {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");
```

:::details

- 'script start'
- 'async1 start'
- 'async2'
- 'promise1'
- 'script end'
- 'async1 end'
- 'promise2'
- 'setTimeout'
  :::
  :::tip
  脚本执行，自上而下运行代码，遇到同步代码立即执行，console.log('script start')

遇到定时器，注册回调到宏队列中

执行 async1，立即执行 console.log('async1 start')，await 执行 async2，async2 内部的同步代码也立即执行，console.log('async2')，注册 console.log('async1 end') 进入微队列（微任务 1）

new Promise 内部的同步代码立即执行，console.log('promise1')，resolve() 调用，注册 then 回调 console.log('promise2') 进入微队列（微任务 2，排在上一步入队的微任务 1 之后）

执行同步代码 console.log('script end')

同步代码执行完毕，检查本轮微任务对列，取出微任务 1 执行，输出 `async1 end`，取出微任务 2 执行，输出 `promise2`

微任务执行完毕，执行下一轮宏任务，输出 `setTimeout`
:::

### 002. 下列代码输出什么

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

::: details
一秒之后连续打印 5 个 5
:::

## prototype 和 extend

### 001. 下列代码输出什么

```js
function ClassA() {
  this.x = "hello";
}

ClassA.prototype.x = "world";

var a = new ClassA();
a.x = "what";
console.log(a.x);
delete a.x;
console.log(a.x);
delete a.x;
console.log(a.x);
```

::: details
what world world
:::

## 闭包

### 001. 下列代码输出什么

```js
function someFunction() {
  let a = 99;
  return function () {
    return a++;
  };
}

let f1 = someFunction();
let f2 = someFunction();

console.log(f1());
console.log(f2());

let f = someFunction();
console.log(f());
console.log(f());
```

::: details
99、
99、
99、
100
:::

## 数据类型

### 001. 下列代码输出什么

```js
let a = { x: { y: 3 } };
let b = {
  ...a,
};
b.z = 123;
console.log(a.z);
```

::: details
undefined
:::

---

### 002. 下列代码输出什么

```js
let a = { x: { y: 3 } };
let b = {
  ...a,
};
b.x.y = 123;
console.log(a.x.y);
```

::: details
123
:::

### 003. 下列代码输出什么

```js
console.log(typeof typeof 1);
console.log(Number(1) === Number(1));
console.log(Boolean(false) === Boolean(false));
console.log(Symbol(1) === Symbol(1));
```

:::details
string
true
true
false
:::

## react

### 001. 下列代码输出什么

```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0,
    };
  }

  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 1 次 log

    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 2 次 log

    setTimeout(() => {
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 3 次 log

      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
}
```

:::details
0 0 2 3
:::
:::tip
生命周期和合成事件内调用 setState 更改状态后，触发时 isBatchingUpdates 值为 true，并不会直接更新 state，而是加入 dirtyComponents 等待 patch 批量更新，所以前两次打印的值都是 0，多次的 setState 会被合并成一次，所以实现的效果就是 0 变为了 1

定时器中的 setState 触发时 isBatchingUpdates 值为 false，直接进行更新，因此打印出来的值是 2 和 3
:::
