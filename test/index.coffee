assert = require('assert').deepEqual
essential = require '../src/essential.coffee'

essential.extend global, essential

test = (name, result, expected) ->
  assert result, expected, "#{name}: expected #{JSON.stringify expected} but got #{JSON.stringify result}"
  console.log "#{name} ✓"

add = (x, y) -> x + y
mul = (x, y) -> x * y
sub = (x, y) -> x - y
append = (as...) -> as.reduce add

even = (x) -> x % 2 is 0

# Tests

test 'curryN', curryN(2, add)(1)(2), 3
test 'curry', curry(add)(1)(2), 3

test 'partial in order', partial(add, 1)(2), 3
test 'partial with placeholder', partial(add, _, 1)(2), 3

test 'flip', flip(sub)(2, 3), 1
test 'flip3', flip3((x, y, z) -> x - y - z)(2, 3, 5), 0
test 'flipN', flipN(append)('a','b','c'), 'cba'

test 'compose', compose(curry(add)(1), curry(mul)(2))(2), 5
test 'sequence', sequence(curry(add)(1), curry(mul)(2))(2), 6

test 'notF', notF(even)(2), false
test 'isF', isF('foo')('foo'), true
test 'isntF', isntF('foo')('bar'), true

test 'isType', [isType('Array',[]), isType('Object',{})], [true, true]

test 'toObject', toObject(['a',1,'b',2,'c',3]), {a:1, b:2, c:3}

a = {a:1}
test 'extend', extend(a, {b:2, c:3}, {c:4}), {a:1, b:2, c:4}
test 'extend mutate', a, {a:1, b:2, c:4}

test 'forOwn', forOwn([], ((acc, k, v) -> acc.concat [k, v]), {a:1, b:2, c:3}), ['a',1,'b',2,'c',3]

test 'first', first([1,2,3]), 1
test 'last', last([1,2,3]), 3
test 'rest', rest([1,2,3]), [2,3]
test 'initial', initial([1,2,3]), [1,2]
test 'take', take(2, [1,2,3]), [1,2]
test 'drop', drop(2, [1,2,3]), [3]

test 'inArray', inArray([1,2,3], 2), true

test 'unique', unique([1,1,2,2,3,3]), [1,2,3]
test 'flatten', flatten([1,[2,[3,[4]]]]), [1,2,3,4]
test 'flatMap', flatMap([1,2], (x) -> flatMap([3,4], (y) -> x + y)), [4,5,5,6]

test 'pluck array', pluck(1, [1,2,3]), 2
test 'pluck object', pluck('a', {a:1, b:2, c:3}), 1

test 'pluckR', true, true

test 'where', where({name:'Peter'}, [{name:'Peter'},{name:'Jon'},{name:'Mike'}]), [{name:'Peter'}]

test 'pairs', pairs({a:1, b:2, c:3}), [['a',1],['b',2],['c',3]]

test 'zip', zip([1,2,3], [4,5,6]), [[1,4], [2,5], [3,6]]
test 'zipWith', zipWith(add, [1,2,3], [4,5,6]), [5,7,9]

test 'zipObject', zipObject(['a','b','c'],[1,2,3]), {a:1, b:2, c:3}
test 'unzipObject', unzipObject({a:1, b:2}), [['a','b'], [1,2]]

test 'range', range(0,10), [0..10]

test 'shuffle', true, true

test 'sortBy', sortBy(id, [3,4,2,5,1]), [1,2,3,4,5]
test 'groupBy', groupBy(Math.round, [1.1,1.2,1.3,1.6,1.7,1.8]), {1:[1,1,1], 2:[2,2,2]}
test 'countBy', countBy(Math.round, [1.1,1.2,1.3,1.6,1.7,1.8]), {1:3, 2:3}

test 'format', format(['a','c'], '%1b%2d'), 'abcd'
test 'template', template({a:'a', c:'c'}, '#{a}b#{c}d'), 'abcd'
test 'gmatch', gmatch(/\{(.+?)\}/g, '{a}b{c}d'), ['a','c']

console.log 'All good!'
