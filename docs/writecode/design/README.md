---
title: 手写代码-场景设计
tags:
  - 限制最大并发数
  - 数组去重
---

# 手写代码-场景设计

## 001. 异步并发数限制

## 002. 数组去重

```js
const arr = ["1", 1, "2", 2, NaN, NaN, {}, {}];
```

:::tip

```js{4,5}
const unqArr = arr => {
  const map = new Map();
  return arr.filter(item => {
    if (!map.has(typeof item + item)) { // 为了处理像 {}、{} 这种情况
      map.set(typeof item + item, true);
      return true;
    }
  })
}

console.log(unqArr(arr)); // [ 1, 2, '1', '2', NaN, {} ]
```

:::
:::warning

```js
const res = [...new Set(arr)];
console.log(res); // [1,2,'1','2',NaN,{},{}]
```

使用 [...new Set(arr)] 无法对 {} 进行去重
:::

## 003. 如何改造 `for` 循环嵌套定时器的代码，实现打印 0 ~ 5

- 使用 let 关键字

```javascript{1}
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
  console.log(i);
  }, 1000);
}
```

- 使用闭包

```javascript{2-6}
for (var i = 0; i < 5; i++) {
  (function(j){
     setTimeout(function() {
     console.log(j);
  }, 1000);
  })(i)
}
```

---

## 004. 如何改造 `for` 循环嵌套定时器的代码，实现每隔一秒依次递增打印一个数字

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

::: tip
抽象为，在一系列异步操作完成之后，再做其他事情
:::

- 使用 `promise`，答案如下：

```js
const tasks = [];
const output = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(num);
      resolve();
    }, num * 1000);
  });
};
for (var i = 0; i < 5; i++) {
  // 生成所有的异步操作
  tasks.push(output(i));
}
Promise.all(tasks).then((res) => {
  setTimeout(() => {
    console.log(i);
  }, 1000);
});
```

- 使用 `async await` 关键字，答案如下：

```js
const sleep = (num, delay) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(num);
    }, delay);
  });
(async () => {
  for (var i = 0; i < 5; i++) {
    console.log(i);
    await sleep(i, 1000);
  }
  console.log(i);
})();
```

---

## 005. 可以按照以下方式调用实现一个 LazyMan，可以按照以下方式调用:

> LazyMan(“Hank”)输出:
> Hi! This is Hank!

> LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
> Hi! This is Hank!
> //等待 10 秒..
> Wake up after 10
> Eat dinner~

> LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
> Hi This is Hank!
> Eat dinner~
> Eat supper~

> LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
> //等待 5 秒
> Wake up after 5
> Hi This is Hank!
> Eat supper

> 以此类推
> :::tip
> 把链式调用定义为一个注册行为，维护一个队列，每一次链式调用只是往队列里注册一个方法，然后开始调度执行，队列中每个方法运行结束的时候才会去调用下一个方法
> :::
> :::details

```js
class LazyManClass {
  constructor(name) {
    this.name = name;
    this.queue = [];
    console.log("hi this is " + name);
    setTimeout(() => {
      this.next();
    });
  }

  register(fn, isFirst) {
    if (isFirst) {
      this.queue.unshift(fn);
    } else {
      this.queue.push(fn);
    }
  }

  eat(type) {
    const _eat = () => {
      console.log("eat " + type);
      this.next();
    };
    this.register(_eat);
    return this;
  }
  sleep(delay) {
    const _sleep = () => {
      setTimeout(() => {
        console.log(`Wake up after ${delay}`);
        this.next();
      }, delay * 1000);
    };
    this.register(_sleep);
    return this;
  }

  sleepFirst(delay) {
    const _sleep = () => {
      setTimeout(() => {
        console.log(`Wake up after ${delay}`);
        this.next();
      }, delay * 1000);
    };
    this.register(_sleep, true);
    return this;
  }

  next() {
    const fn = this.queue.shift();
    fn && fn();
  }
}

function LazyMan(name) {
  return new LazyManClass(name);
}

// LazyMan('hank').eat('dinner');
// LazyMan('Hank').eat('午餐').sleep(2).eat('supper').sleepFirst(5);
LazyMan("Hank").eat("午餐").eat("supper").sleep(5).eat("早餐");
```

:::

## 006. 后端返回了如下信息：

```js
industry_list = [
  {
    parent_ind: "女装",
    name: "连衣裙",
  },
  {
    name: "女装",
  },
  {
    parent_ind: "女装",
    name: "半身裙",
  },
  {
    parent_ind: "女装",
    name: "A字裙",
  },
  {
    name: "数码",
  },
  {
    parent_ind: "数码",
    name: "电脑配件",
  },
  {
    parent_ind: "电脑配件",
    name: "内存",
  },
];
```

希望将其转换格式为:

```js
{
  "数码": {
    "电脑配件": {
        "内存" : {}
     }
  },
  "女装" : {
     "连衣裙": {},
    "半身裙": {},
    "A字裙": {}
  }
}
```

:::tip
期待将后端的一层数据转换为树状结构，分析：

- 如果没有 parent_ind，则当前项的 name 是第一层
- 如果有 parent_ind，则 name 需要包裹在 parent_ind 里
- 定义最终生成的结果数`const res = {}`
- 依次遍历，如果当前项没有 parent_ind，说明是第一层，res 里需要存在一个 name
- 如果有 parent_ind，说明不是第一层，确保 res 里存在这个 name，同时设置该 name 额外属性值 isChild 为 true，代表是个子项目
- 同时，确保 res 里有一个 parent_ind，且存在子项 name
  这样，最终获得一个挂有所有 parent_ind 和 name 的树，接下来遍历 res，删除不应该在第一层的项，只要有 isChild，则删除当前项的 isChild 属性，且删除 res 上对当前项的引用
  :::
  :::details

```js
function convert_format(arr) {
  const res = {};
  for (let i = 0; i < arr.length; i++) {
    const { parent_ind, name } = arr[i];
    if (!parent_ind) {
      !res[name] && (res[name] = {});
    } else {
      !res[parent_ind] && (res[parent_ind] = {});
      !res[name] && (res[name] = {});
      res[name].isChild = true;
      res[parent_ind][name] = res[name];
    }
  }
  /**
   * 此时 res 为
   {
  '连衣裙': { isChild: true },
  '女装': {
    '连衣裙': { isChild: true },
    '半身裙': { isChild: true },
    'A字裙': { isChild: true }
  },
  '半身裙': { isChild: true },
  'A字裙': { isChild: true },
  '数码': { '电脑配件': { isChild: true, '内存': [Object] } },
  '电脑配件': { isChild: true, '内存': { isChild: true } },
  '内存': { isChild: true }
  }
*/

  Object.keys(res).forEach((key) => {
    if (res[key].isChild) {
      delete res[key].isChild;
      delete res[key];
    }
  });
  return res;
  /**
   * 若不删除 res[key].isChild 结果是
   * {
  '女装': {
    '连衣裙': { isChild: true },
    '半身裙': { isChild: true },
    'A字裙': { isChild: true }
  },
  '数码': { '电脑配件': { isChild: true, '内存': [Object] } }
  }
   */
}

console.log(convert_format(industry_list));
```

:::
