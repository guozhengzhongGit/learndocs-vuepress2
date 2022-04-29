// utils.js
const bar  = 'bar';
const foo  = 'foo';

function add() {}
function cube() {}

export default {
  bar, foo, add, cube
}

// entry.js
import obj from './utils';
console.log(obj.foo);