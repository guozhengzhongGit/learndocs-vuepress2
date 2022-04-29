# super 关键字

`super` 关键字用于访问和调用一个对象的父对象上的函数，如果子类中声明了父类原型同名的方法，那么这个父类原型上的方法对于子类来说，就找不到了，此时就可以通过 super 关键字来访问这些方法

可以用作函数，也可以用作对象

用作**函数**时在子类的构造函数中直接调用，代表调用父类的构造函数，且因为 ES6 继承的实现机制，子类的 constructor 里必须先调用 super，才能使用 this 关键字，虽然 super 代表调用父类的构造函数，但返回的是子类的实例，即 super 内部的 this 指向的是子类的实例，因此，在上面的继承关系中，super() 相当于 `A.prototype.constructor.call(this)`

用作**对象**时，在普通方法中，super 指向父类的原型对象；在静态方法中，指向父类，例如：

> 普通方法

```js
class A {
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}

let b = new B();
```

:::tip
super 在普通方法中，指向的是父类的原型，即 A.prototype，因此 super.p() 即 A.prototype.p() 输出 2
:::
此外，子类的普通方法通过 super 调用父类的方法时，super 内部的 this 指向当前子类的实例，例如：

```js{21}
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m(); // this 指向 b，因此打印 2
```

> 静态方法：

```js
class Parent {
  static myMethod(msg) {
    console.log("static", msg);
  }

  myMethod(msg) {
    console.log("instance", msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }

  myMethod(msg) {
    super.myMethod(msg);
  }
}

Child.myMethod(1); // 静态方法里，super 指向父类 Parent，打印 static， 1

var child = new Child();
child.myMethod(2); // 普通方法里，super 指向父类的原型，即 Parent.prototype.myMethod(2)，打印 instance, 2
```

此外，在子类的静态方法中使用 super 调用父类的方法，super 内部的 this 指向的是子类而非子类的实例

> 对象字面量中：

```js{12}
Object.prototype.foo = function() {
  return "foo";
};
Object.bar = function() {
  return "bar";
};
var obj = {
  fn() {
    console.log(super.foo === Object.getPrototypeOf(obj).foo); // true
    console.log(super.foo()); // foo
    console.log(super.bar()); // TypeError .bar is not a function
    console.log(super.__proto__); // { foo: [Function] }
  }
};
obj.fn();
console.log(Object.prototype.__proto__); // null
console.log(Object.getPrototypeOf(obj).__proto__); // null
```
