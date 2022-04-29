function isType(type) {
  return function (data) {
    // [object Number]
    console.log(Object.prototype.toString.call(data).slice(8, -1));
    return Object.prototype.toString.call(data).slice(8,-1) === type;
  }
}
const types = ['Boolean', 'Object', 'Array', 'String', 'Symbol', 'Null', 'Undefined', 'Number'];
const fns = {};
types.forEach(type => {
  fns['is' + type] = isType(type);
})

const a = 2;
const b = null;
const c = undefined;
const d = false;
const e = Symbol(1);
let f;
console.log(fns.isNumber(a));
console.log(fns.isNull(b));
console.log(fns.isUndefined(c));
console.log(fns.isUndefined(f));
console.log(fns.isBoolean(d));
console.log(fns.isSymbol(e));
// 返回值均为 true