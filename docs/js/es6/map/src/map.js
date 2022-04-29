const m = new Map();
const keyObj = {};
const keyFunc = function() {};
const keyStr = 'map';
// 添加成员
m.set(keyObj, '对象类型的键');
m.set(keyFunc, '函数类型的键');
m.set(keyStr, '字符串类型的键');

console.log(m.size);
console.log(m.has(keyFunc));
console.log(m.get(keyObj));
// m.delete(keyFunc);
console.log(m.has(keyFunc));


const mapArg = [['key1', 'value1'], ['key2','value2']];
const map = new Map(mapArg);
console.log(map.size);
console.log(map.has('key2'));
console.log(map.get('key1'));
map.forEach((value, key) => {
  console.log(value, key)
})
/**
 * value1 key1
 * value2 key2
 *
 */
for (let k of map.keys()) {
  console.log(k); // key1 key2
}
for (let v of map.values()) {
  console.log(v); // value1 value2
}
// for (let item of m) {
//   console.log(item)
// }

for(let item of m.entries()) {
  console.log(item)
}