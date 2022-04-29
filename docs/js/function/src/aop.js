// 面向切面编程
// 装饰器，扩展、增强原有的方法

function sleep(who) {
  console.log(who + "睡觉");
}
function eat() {
  console.log("先吃饭");
}
Function.prototype.before = function (fn) {
  const _self = this;
  return function(who) {
    fn();
    _self(who);
  }
};
const newFn = sleep.before(eat);
newFn("人");
// 先吃饭
// 人睡觉


Function.prototype.before = function (fn) {
  return who => {
    fn();
    this(who);
  }
};
const newFn = sleep.before(eat);
newFn("人");

Function.prototype.before = function (fn) {
  const res = function(who) {
    fn();
    this(who);
  }
  return res.bind(this);
};
const newFn = sleep.before(eat);
newFn("人");
