# vue 源码

## 响应式原理

通过数据劫持结合观察者模式，使用 Object.defineProperty 劫持目标对象的属性的 getter 和 setter，在目标对象改变时发送消息给观察者，触发对应回调

### 先来实现 Observer

@[code js{4}](./src//segmentfault//mvvm.js)
此时执行脚本，第四行就会输出变化，这样我们已经可以监听每个数据的变化了，那么监听到变化之后就是怎么通知订阅者了

所以接下来，要用到观察者模式了，发布者持有订阅者，数据变动触发 notify，调用所有订阅者的 update 方法
@[code js{4}](./src//segmentfault//mvvm.js)

那么怎么让目标对象持有观察者呢，**如果一个对象属性的 getter 被触发，则它被访问了，也就是说有地方用到了它**，那这个属性就需要被订阅，即需要被 Watcher 观测，如果它后续发生了改变，则需要通知到 watcher 去执行对应的回调
组件的 render function 执行前，会对数据做响应式化。使用 Object.defineProperty 把对象属性转为 getter 和 setter，并为每个数据添加一个订阅者列表，这个列表会记录所有依赖于这个数据的组件

也就是说，响应式化后的数据相当于发布者

每个组件都对应一个 watcher，这是订阅者的角色

当这个组件的 render function 执行时，都会将本组件的 watcher 放到自己所依赖的响应式数据的订阅者列表里，完成对目标对象的观测，这个过程称为**依赖收集**

当响应式数据发生变化，即目标对象的状态发生了变化，会触发 setter 函数，在其中 notify 该数据的订阅者列表里的 watcher，watcher 会 触发 re-render 来更新视图
