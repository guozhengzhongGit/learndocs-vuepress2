---
title: immer
tags:
  - immer
---

# immer

生成 immutable 数据

## 基本用法

```js
import produce from "immer";

const currentState = {
  p: {
    x: [2],
  },
};

const nextState = produce(currentState, (draftState) => {
  draftState.p.x = 1;
});

console.log(currentState === nextState); // false
```

## 名词解释

- currentState
  数据的初始状态
- produce
  基础 api，接收当前状态 currentState 和一个 recipe 函数，生成 nextState 或 producer 的函数
- producer
  通过 produce 生成，用来生产 nextState ，每次执行相同的操作
- draftState
  根据 currentState 生成的草稿状态，是 currentState 的 Proxy，对 draftState 所做的操作将用于生成 nextState，而在此过程中，currentState 保持不变
- recipe
  是 produce 的第二个参数，是一个函数，参数为 draftState，在此内部操作 draftState

## api

### produce

```ts
produce(currentState, recipe: (draftState) => void): nextState
```

这个函数第一个参数是想要改变的数据对象，第二个参数是一个函数 recipe，返回值是 nextState

recipe 参数是 draftState，用来操作 draftState 生成 nextState

**如果 recipe 中什么也不返回或者没有进行任何操作，并不会返回一个新数据**

```js
const arr = [];
const res = produce(arr, (draft) => {});
console.log(arr === res); // true
```

也可以省略第一个参数，只传入第二个函数参数，此时 produce 的返回值将是一个函数 producer

```js
const currentState = {
  p: {
    x: [2],
  },
};
const producer = produce((draftState) => {
  draftState.p.x.push(3);
});
const nextState = producer(currentState);
```

### producer

producer 方法的第 2 个参数与 produce 内的 recipe 回调函数的第 2 个参数是指向同一块内存的，以此可以和 redux 结合

```js
const currentState = {
  p: {
    x: [2],
  },
};
const obj = {};
const producer = produce((draftState, arg) => {
  console.log(arg === obj); // true
});
const nextState = producer(currentState, obj);
```
