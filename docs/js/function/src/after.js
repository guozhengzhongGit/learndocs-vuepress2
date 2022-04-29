function after(times, callback) {
  let total = 0;
  return function(num) {
    total += num;
    if (--times === 0) {
      callback(total);
    }
  }
}
function cb(total) {
  console.log('回调执行了', total);
  // 回调执行了 6
}
const fn = after(3, cb);
fn(1);
fn(2);
fn(3);