# hooks 理论

## hooks 概念

hooks 重点解决的问题就是**业务逻辑的重用**

比如想在组件中监听浏览器窗口大小的变化，我们需要在类组件的不同生命周期中做事件的绑定和解绑，这种需要分散在不同方法中的逻辑是很难去重用的，因此我们需要借助高阶组件这种设计模式来解决

而使用 hooks，我们只需要通过 hooks 的方式进行封装，将其变成一个可绑定的数据源。这样当窗口大小变化时，被绑定的组件就会自动重新渲染，在功能实现的同时，不会产生额外的组件节点

在有了 hooks 之后，函数组件也拥有了状态管理，生命周期管理等能力，几乎可以实现原来 class 组件具有的所有能力

react 组件的模型，其实就是 model 到 view 的映射。这里的 model 对应到 react 组件中其实就是 state 和 props

所以，我们可以把 UI 的展现看作一个函数执行的过程。model 是输入参数，函数的执行结果是 虚拟 DOM 树

而 react 要保证的，就是每当 model 发生变化时，函数就会重新执行生成新的虚拟 DOM 树

而对于一个函数组件来说，它和对象不同，并没有一个实例对象能够在多次执行之间保存状态，那势必就需要一个函数之外的空间来保存这个状态，并且要能够检测其变化，从而触发函数组件的重新渲染

我们需要这样一个机制，把一个外部的数据，绑定到函数的执行。当数据变化时，函数就能够自动重新执行；这样的话，任何会影响 UI 展现的外部数据，都可以通过这个机制绑定到 react 函数组件，这就是 hooks

**把某个目标结果钩到某个可能会变化的数据源或事件源上，那么当被钩到的数据发生变化时，产生这个目标结果的代码就会重新执行，产生更新后的结果**

对于函数组件来说，这个结果是 DOM 树；对于 useCallback 等来说，是更新缓存

关键在于，hook 中被钩的对象，不仅可以是某个独立的数据源，还可以是另一个 hook 执行的结果，这就是逻辑复用的前提

**hooks 另一个好处就是有助于关注分离**
它能够让针对同一个业务逻辑的代码尽可能聚合在一起，而在 class 组件中，我们不得不把同一个业务逻辑的代码分散在不同的生命周期方法中

## 常用 hooks

### useState

### useEffect

### useCallback

在函数组件中，每一次 UI 的变化都是通过重新执行整个函数来完成的，和 class 组件不一样的是，函数组件中并没有一个直接的方式在多次渲染之间维持一个状态，比如按钮上定义了一个事件处理函数来 setState，那么在多次渲染之间，是无法重用这个函数的，每次都是创建一个新的，这样带来两个后果，一是重新创建一个函数本身就有开销，更重要的是**这会让接收事件处理函数的组件重新渲染**，因此我们需要让事件处理函数只有在对应的依赖项发生改变时，才去重新声明，这就是 useCallback 的作用

```js
useCallback(fn, deps);
```

其中 fn 是定义的回调函数，deps 是依赖的数组，只有当某个依赖发生变化时，才会重新声明 fn 这个回调函数

### useMemo

与 useCallback 一样，useMemo 也是为了缓存而设计的

只不过 useCallback 缓存的是一个函数，而 useMemo 缓存的是计算的结果

```js
useMemo(fn, deps);
```

fn 是产生所需数据的一个计算函数。通常 fn 会使用 deps 中的一些变量来生成一个结果

```js{18-20}
import React, { useState, useEffect, useMemo } from 'react';
import style from './style.module.css';
import { user } from './mock';
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  useEffect(() => {
    const doFetch = () => {
      setUsers(user);
    };
    doFetch();
  }, []);

  const changeValue = (e) => {
    setSearchKey(e.target.value);
  };

  const showList = useMemo(() => {
    return users.filter((item) => item.name.indexOf(searchKey) > -1);
  }, [users, searchKey]);

  return (
    <div className={style.userOuter}>
      <div>
        <input type="text" value={searchKey} onInput={changeValue} />
      </div>
      <ul>
        {showList.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
```

结合 useMemo 和 useCallback 两个 hook，**可以发现 useCallback 的功能其实是可以用 useMemo 来实现的，只是此时 useMemo 返回的缓存结果是一个函数而不是一个值**

```js
const myEventHandler = useMemo(() => {
  // 返回一个函数作为缓存结果
  return () => {
    // 在这里进行事件处理
  };
}, [dep1, dep2]);
```

## hooks 依赖

useEffect、 useCallback、 useMemo 等 hooks 可以指定一个依赖数组，当依赖项发生改变时，hooks 会重新执行

需要注意的是，react 使用浅比较来对比依赖项是否发生了改变，所以要特别注意对象和数组类型

## 使用 hooks 的典型场景

- 封装通用逻辑比如 useAsync
- 监听浏览器状态 useScroll
- 拆分复杂组件
  - 保持每个函数的短小和逻辑单一，尽量将相关逻辑做成独立的 hook，然后在函数组件中使用这些 hook，通过参数传递和返回值让 hooks 之间完成交互
- 创建自定义 hooks

## hooks 使用技巧

### 在 class 组件中使用 hooks

由于 hooks 是专门为函数组件设计的机制，因此只能在函数式组件或者其他 hooks 中使用，那如果一定要在 class 组件中应用 hooks 逻辑重用的功能呢，可以使用高阶组件的模式

例如，已经有一个 useWindowSize 的 hook，那就很容易将其转换为高阶组件

```js
// useWindowSize.js
import { useEffect, useState } from "react";

const getSize = () => (window.innerWidth > 1024 ? "large" : "small");

export const useWindowSize = () => {
  const [size, setSize] = useState(getSize());

  const handle = () => {
    setSize(getSize());
  };
  useEffect(() => {
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("resize", handle);
    };
  }, []);

  return size;
};
```

高阶组件：

```js
// hoc
import React from "react";
import { useWindowSize } from "./useWindowSize";
export const withWindowSize = (Comp) => {
  return (props) => {
    const windowSize = useWindowSize();
    return <Comp windowSize={windowSize} {...props} />;
  };
};
```

在 class 组件中使用：

```js
import React from "react";
import { withWindowSize } from "./withWindowSize";

class MyComp {
  render() {
    const { windowSize } = this.props;
    // ...
  }
}
// 通过 withWindowSize 高阶组件给 MyComp 添加 windowSize 属性
export default withWindowSize(MyComp);
```

这样，通过 withWindowSize 这样一个高阶组件模式，就可以把 useWindowSize 的结果作为属性，传递给需要使用窗口大小的类组件
