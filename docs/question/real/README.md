---
title: 题海拾贝
tags:
  - 真题
---

# 题目搜集

## this 相关

### 001. 下列代码执行后的结果是

```js
var Factory = function () {
  this.a = "a";
  this.b = "b";
  this.c = {
    a: "a+",
    b: () => this.a,
  };
};

console.log(new Factory().c.b());
```

::: details
a
:::

## JS 原生 API 相关

### 002. 下列代码执行的输出结果

```js
console.log(["1", "2", "3"].map(parseInt));
```

:::details
[ 1, NaN, NaN ]
:::
:::tip
解析

- _parseInt(string, radix)_ 解析一个字符串并返回指定基数的十进制整数， radix 是 2-36 之间的整数，表示被解析字符串的基数

- 当 string 中的第一个非空格字符串不能转换为数字或者 radix 小于 2 或者 大于 36，返回 NaN

- 如果 radix 是 undefined 或者 0 或者未指定，JS 会根据输入的 string 来假定取值：
  - 输入的 string 以 '0x' 开头，假定为 16 进制
  - 输入的 string 以 '0' 开头，ES5 规定应该假定为 10 进制

map 方法接收一个回调函数，该函数有两个参数分别是遍历到的数组当前项和其对应的索引，即 arr.map((item, index) => {})

本题中将 parseInt 当做 map 的回调函数，进制对应的是 index，分别为 0、1、2

radix 为 0，当作 10 进制处理，返回 1

radix 为 1，小于 2，返回 NaN；

radix 为 2，当作 2 进制处理，但此时要处理的值是 3，二进制中只有 0 和 1，无法解析 3，返回 NaN
:::

### 03. 计算菲波那切数列的第 N 项

#### 递归

```
const fib = (n) => {
  if (n === 0) return 0
  if (n === 1) return 1
  return fib(n-2) + fib(n-1)
}
```

#### 迭代

```
const fib = (n) => {
  if (n === 0) return 0;
  let a1 = 0, a2 = 1;
  for (let i = 1; i < n; i += 1>) {
    [a1, a2] = [a2, a1 + a2];
  }
  return a2;
}
```
