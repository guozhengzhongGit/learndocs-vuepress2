const corp = {
  list: {},
};
// 订阅事件
corp.on = function (key, fn) {
  // 如果没有对应的 key 值，则说明没有订阅过
  if (!this.list[key]) {
    this.list[key] = [];
  }
  this.list[key].push(fn);
};
// 触发事件
corp.emit = function () {
  const key = [].shift.call(arguments);
  const cbs = this.list[key];
  if (!cbs || cbs.length === 0) {
    return false;
  }
  cbs.forEach((cb) => {
    cb.apply(this, arguments);
  });
};
// test
corp.on(function (position, salary) {
  console.log("职位是" + position);
  console.log("薪资是" + salary);
});
corp.on(function (skill, hobby) {
  console.log("技能是" + skill);
  console.log("爱好是" + hobby);
});

corp.emit("前端", 10000);
// corp.emit("端茶", "足球");
