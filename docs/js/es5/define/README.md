# Object.defineProperty

创建一个对象，对象上会有属性和方法，这些属性在创建时都带有一些特征值，Object.defineProperty 可以直接创建新属性或者修改现有属性，同时修改属性的特性

接收三个参数，要修改的对象，属性名和描述符对象，返回值是这个对象

```js
const obj = {
  name: "obj",
  age: 18,
  sayName: function () {
    console.info(this.name);
  },
};
```

### 属性类型

ECMAScript 规范中定义了有两种属性，`数据属性` 和 `访问器属性`
**数据属性**有四个描述其行为的特性

- [[Value]] 属性的值
- [[Writable]] 是否可以修改属性的值
- [[Enumerable]] 是否可枚举，即能否通过 for-in 循环返回属性
- [[Configurable]] 是否可配置该属性，包括能否用 delete 删除，能否修改属性的特性，能否把属性修改为访问器属性
  :::tip
  使用 Object.defineProperty 新创建的数据属性，configurable、writable、enumerable 特性的默认值都是 false
  :::
  **访问器属性**不包含数据值，但有一对 getter 和 setter 函数，在读取访问器属性时，会调用 getter 函数，返回有效的值；在写入访问器属性时，会调用 setter 函数并传入新值，负责决定如何处理数据

访问器属性有四个特性：

- [[Get]] 读取属性时调用的函数
- [[Set]] 写入属性时调用的函数
- [[Enumerable]] 是否可枚举，即能否通过 for-in 循环返回属性
- [[Configurable]] 是否可配置该属性，包括能否用 delete 删除，能否修改属性的特性，能否把属性修改为访问器属性

```js
Object.defineProperty(book, "year", {
  get() {
    console.log(this._year); // 2004
    return this._year;
  },
  set(newValue) {
    if (newValue > 2004) {
      this._year = newValue;
      this.edition += newValue - 2004;
    }
  },
});
console.log(book.year); // 2004
book.year = 2005;
console.log(book); // { _year: 2005, edition: 2 }
```
