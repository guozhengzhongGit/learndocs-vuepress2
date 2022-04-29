class Observer {
  constructor(fn) {
    if (typeof fn !== "function") {
      throw new Error("参数错误");
    }
    this.cb = fn;
  }
  update() {
    this.cb();
  }
}

class Subject {
  constructor() {
    this.obs = [];
  }
  add(ob) {
    this.obs.push(ob);
  }
  notify() {
    this.obs.forEach((ob) => ob.update());
  }
}

const cb1 = function() {
  console.log('1更新了');
}
const cb2 = function() {
  console.log('2更新了');
}
const cb3 = function() {
  console.log('3更新了');
}
const ob1 = new Observer(cb1);
const ob2 = new Observer(cb2);
const ob3 = new Observer(cb3);

const sub = new Subject();
sub.add(ob1);
sub.add(ob2);
sub.add(ob3);
sub.notify();