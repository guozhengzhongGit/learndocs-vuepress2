---
lang: zh-CN
title: Map
description: es6 map
---
# Map
JS 对象本质上是键值对的集合，但是传统对象只能使用字符串做键

ES6 提供了 Map 数据结构，它类似于对象，也是键值对的集合，但键的范围不限于字符串，对象或者原始值都可作为一个键或一个值

也就是说，Object 提供了 `字符串-值` 的对应，而 Map 提供了 `值-值`的对应

## 实例和属性
### 构造函数
```js{1}
const m = new Map();
const keyObj = {};
const keyFunc = function() {};
const keyStr = 'map';

// 添加成员
m.set(keyObj, '对象类型的键');
m.set(keyFunc, '函数类型的键');
m.set(keyStr, '字符串类型的键');

// size 获取 map 中的成员数量
console.log(m.size);

// has 用来检测 map 中是否包含某个键
console.log(m.has(keyFunc));

// get 用来获取某个键对应的值
console.log(m.get(keyObj));

// delete 删除某个成员
m.delete(keyFunc);
console.log(m.has(keyFunc));  // false
```
Map 构造函数也支持接受一个数组作为参数来生成 map 实例，**此时数组成员是一个个表示键值对的数组**
```js
const mapArg = [['key1', 'value1'], ['key2','value2']];
const map = new Map(mapArg);
console.log(map.size); // 2
console.log(map.has('key2')); // true
console.log(map.get('key1')); // value1
```
上面代码在创建 map 对象时就指定了两个键 `key1` 和 `key2`
### 原型方法
如上面代码所示，常用的原型方法有：
- set
- get
- has
- delete
- clear
### 遍历方法
Map 结构原生提供三个遍历器生成函数和一个遍历方法
#### Map.prototype.keys()
返回键名的遍历器
```js
for (let k of map.keys()) {
  console.log(k); // key1 key2
}
```
#### Map.prototype.values()
返回键值的遍历器
```js
for (let v of map.values()) {
  console.log(v); // value1 value2
}
```
#### Map.prototype.entries()
返回所有成员的遍历器
```
for(let item of m.entries()) {
  console.log(item)
}
/**
 * [ {}, '对象类型的键' ]
 * [ [Function: keyFunc], '函数类型的键' ]
 * [ 'map', '字符串类型的键' ]
 *
 */
```
#### 使用 for......of 迭代 Map
```js
const m = new Map();
const keyObj = {};
const keyFunc = function() {};
const keyStr = 'map';
// 添加成员
m.set(keyObj, '对象类型的键');
m.set(keyFunc, '函数类型的键');
m.set(keyStr, '字符串类型的键');

for (let item of m) {
  console.log(item)
}
/**
 * [ {}, '对象类型的键' ]
 * [ [Function: keyFunc], '函数类型的键' ]
 * [ 'map', '字符串类型的键' ]
 *
 */
```
#### Map.prototype.forEach()
迭代 map 的所有成员
```js
const mapArg = [['key1', 'value1'], ['key2','value2']];
const map = new Map(mapArg);
map.forEach((value, key) => {
  console.log(value, key)
})
/**
 * value1 key1
 * value2 key2
 *
 */
```
### 注意事项
如果读取一个未知的键，将返回 undefined
undefined 和 null 是两个不同的键
NaN 看作同一个键
## Map 和其他数据结构的转换