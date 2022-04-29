---
title: 两数之和
tags:
  - 两数之和
---

# 两数之和

> 题号：01，链接：[两数之和](https://leetcode-cn.com/problems/two-sum/)

---

给定一个整数数组 nums  和一个整数目标值 target，请你在该数组中找出 和为目标值 的那   两个   整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

---

> 示例：

```js
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1]
```

---

::: tip 解法
两数之和转成两数之差，借助 Map 对象（散列表）。
迭代数组，拿到每个数组成员 nums[i]，计算 target 与当前 nums[i] 的差值在 Map 中是否存在，若存在，则返回 Map 对应的 value 和当前 nums[i] 的索引即 i；不存在就将当前的 nums[i] 存入 Map 中，继续迭代数组，没有结果则返回空数组。
:::

### 题解

```js{9}
var twoSum = function(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const k = target - nums[i];
    if (map.has(k)) {
      return [map.get(k), i];
    } else {
      // map 中存储的 key 是数组成员，value 是成员对应的索引值
      map.set(nums[i], i);
    }
  }
  return [];
};
```
