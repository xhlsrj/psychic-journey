// stateful RegExp Functions --from 'JavaScript Design Regrets'
const reg = /foo/g;

console.log(reg.test('foo')); // true
console.log(reg.test('foo')); // false

console.log(reg.test('foo1')); // true
console.log(reg.test('foo1')); // false
