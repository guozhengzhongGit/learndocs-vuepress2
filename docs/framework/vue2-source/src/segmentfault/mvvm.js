// 原文地址：https://segmentfault.com/a/1190000006599500
var data = { name: "gzz" };
observe(data);
data.name = "zl"; // 就会有输出

function observe(data) {
  if (!data || typeof data !== "object") return;
  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key]);
  });
}

function defineReactive(data, key, val) {
  var dep = new Dep();
  observe(val); // 子属性也是对象
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get: function () {
      Dep.target && dep.addSub(Dep.target);
      return val;
    },
    set: function (newVal) {
      if (val === newVal) return;
      console.log("哈哈哈，监听到值变化了 ", val, " --> ", newVal);
      val = newVal;
      dep.notify();
    },
  });
}
class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach((sub) => sub.update());
  }
}

class Watcher {
  get(key) {
    Dep.target = this;
    this.value = data[key]; // 访问一下data的属性，就会触发 getter 劫持，从而添加订阅者
    Dep.target = null;
  }
}

// 为了提升性能，会先将根节点 el 转换成文档碎片 fragment 进行解析编译操作，解析完成，再将 fragment 添加回原来的真实 dom 节点中
function Compile(el) {
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el);
    this.init();
    this.$el.appendChild(this.$fragment);
  }
}
Compile.prototype = {
  init: function () {
    this.compileElement(this.$fragment);
  },
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(),
      child;
    // 将原生节点拷贝到fragment
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }
    return fragment;
  },
};
