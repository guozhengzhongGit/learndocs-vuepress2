## Proxy 基本用法

给目标对象架设一层代理拦截，外界对于该对象的访问，都必须先通过这层拦截

```js
const proxy = new Proxy({}, handler)
```

作为构造函数，Proxy 接收两个参数，第一个参数是所代理的对象，第二个参数是一个配置对象，用来配置需要被代理的操作，Proxy 支持总共 **13** 种拦截操作，包括 Vue3 中用到的

- get 拦截对象属性的读取
- set 拦截对象属性的设置
- has 拦截 key in proxy 的操作，返回一个布尔值
- deleteProperty 拦截 delete proxy[key] 的操作，返回一个布尔值
- ownKeys 拦截 Object.keys()、for in 循环等对象自身属性的读取操作，返回一个数组

```js
const handler = {
  get(target, key, receiver) {
    return target[key]
  },
  set(target, key, value, receiver) {
    target[key] = value;
    return true;
  },
  has(target, key) {
    return key in target;
  },
  deleteProperty(target, key) {
    // 如果这个方法抛出错误或者返回 false，当前属性就无法被 delete 命令删除
    // delete target[key];
    return false;
  },
  ownKeys(target) {
    return [];
  }
}
const obj = {name: 'gzz'}
const proxy = new Proxy(obj, handler);
console.log(proxy.name);
proxy.age = 18;
console.log('friend' in proxy);
delete proxy.name;
console.log(Object.keys(proxy));
```