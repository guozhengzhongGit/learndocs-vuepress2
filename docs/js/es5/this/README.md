# 改变 this 指向的方法 call 和 apply

### apply

apply 方法调用一个具有给定 this 的函数，接收一个数组或类数组对象作为参数，**其中的数组元素将作为单独的参数传给调用函数，即将数组“展开”为一个参数列表**

作用 1：将数组“展开”

```js
const args = [1, 2, 3];
const fn = (x, y, z) => {
  console.log(x, y, z);
};
fn.apply(null, args);
```

作用 2：借用 push 方法实现两个数组的合并

> push 方法可以将元素追加到数组中，因为 push 接受可变数量的参数，所以也可以一次追加多个元素

> 但如果 push 的参数本身就是一个数组，那结果就会是一个二维数组

```js
const ele = [1, 2, 3];
const add = [4, 5, 6];
[].push.apply(ele, add);
Array.prototype.push.apply(ele, add);
// [1,2,3,4,5,6]
console.log(ele);
```

作用 3：求数组中的最大最小值

```js
const nums = [3, 5, 8];
const min = Math.min.apply(null, nums);
const max = Math.max.apply(null, nums);
```
