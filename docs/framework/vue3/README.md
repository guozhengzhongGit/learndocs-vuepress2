---
lang: zh-CN
title: vue3
description: 熟练使用 vue3
---
# vue3
## 新的代码组织方式 `Composition API + <script setup>`
```vue
<template>
  <div>
    <h1 @click="add">{{count}}</h1>
  </div>
</template>

<script setup>
import { ref } from "vue";
let count = ref(1)
function add(){
    count.value++
}
</script>

<style>
h1 {
  color: red;
}
</style>
```
上面的代码简单实现了一个累加器，我们使用 `template` 标签放置模板，`script` 标签放置逻辑代码，并且用 `setup` 标记我们使用 `<script setup>` 语法。**而在 `<script setup>` 标签内定义的变量和函数，都可以直接在模板里使用**
### import { ref } from "vue"
在使用 ref 包裹响应式数据时，注意要修改响应式数据的 value 属性