# `Promise`

是异步编程的解决方案。从语法上说，它是一个构造函数，用来生成 promise 实例，使用 then 方法注册回调函数可以得到异步任务的结果，每个 then 方法返回一个新的 promise 实例，这允许 promise 进行链式调用，在多个异步任务相互依赖的场景中，很好的解决了传统纯回调方式造成的“回调地狱”问题，在 promise 链的末尾使用 catch 方法可以捕获前面任一个 then 方法中抛出的错误，简化了异常处理流程；promise 有三个状态，只能由 pending 变到 fulfilled 或 pending 变到 rejected，并且一旦确定就不会再次改变，即使在任务结束后也可以拿到结果

- promise.prototype.finally
  用于指定不管 promise 对象最后的状态如何都会执行的操作，返回一个 promise，并且返回的是原来的值

接收回调函数作为参数，该回调函数不接收任何参数，也就是说 finally 里的操作不知道该 promise 的状态，它要进行的操作不依赖于 promise 的结果
