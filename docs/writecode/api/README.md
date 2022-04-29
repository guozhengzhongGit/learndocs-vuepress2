---
title: 实现 JS 原生 API
tags:
  - Promise
---

## 001. 实现 `Promise`

```js
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promise {
  constructor(executor) {
    this.state = PENDING;
    this.data = null;
    this.onResolvedCbs = [];
    this.onRejectedCbs = [];

    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.data = value;
        this.onResolvedCbs.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.data = reason;
        this.onRejectedCbs.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.data);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.data);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === PENDING) {
        this.onResolvedCbs.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.data);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });

        this.onRejectedCbs.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.data);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise2;
  }

  catch(fn) {
    return this.then(null, fn);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) throw new TypeError("chaining cycle");
  let used;
  if (x && (typeof x === "function" || typeof x === "object")) {
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (used) return;
            used = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (err) => {
            if (used) return;
            used = true;
            reject(err);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (used) return;
      used = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}
```

:::tip
测试脚本

```js
Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
module.exports = Promise;
```

:::

## 002. 实现 `resolve`、`reject`、`all`、`race` 静态方法

### all

```js
Promise.all = function (promises) {
  promises = Array.from(promises);
  return new Promise((resolve, reject) => {
    let index = 0;
    let result = [];
    if (promises.length === 0) {
      resolve(result);
    } else {
      function resolveValue(i, data) {
        result[i] = data;
        if (++index === promises.length) {
          resolve(result);
        }
      }
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(
          (data) => {
            resolveValue(i, data);
          },
          (err) => {
            reject(err);
            return;
          }
        );
      }
    }
  });
};
```

### race

```js
Promise.race = function (promises) {
  promises = Array.from(promises);
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return;
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        (data) => {
          resolve(data);
          return;
        },
        (err) => {
          reject(err);
          return;
        }
      );
    }
  });
};
```

## 003. 实现 `finally` 原型方法

```js{3}
Promise.prototype.finally = function(fn) {
  if (typeof fn !== 'function') return this.then();
  let p = this.constructor; // 兼容第三方实现的 promise
  return this.then(
    value => p.resolve(fn()).then(() => value),
    reason => p.resolve(fn()).then(() => { throw reason })
  )
}
```
