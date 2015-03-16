require('../src/essential.coffee').expose global
assert = require('assert').deepEqual

test = (name, result, expected) ->
  assert result, expected, "#{name}: expected #{JSON.stringify expected} but got #{JSON.stringify result}"
  console.log "#{name} ✓"

add = λ (x, y) -> x + y
mul = λ (x, y) -> x * y
sub = λ (x, y) -> x - y
append = (as...) -> as.reduce add

even = (x) -> x % 2 is 0

class Person
  constructor: (@name, @age) ->

# Tests

test 'ncurry', ncurry(2, add)(1)(2), 3
test 'curry', curry(add)(1)(2), 3

test 'partial - in order', partial(add, 1)(2), 3
test 'partial - with placeholder', partial(add, _, 1)(2), 3
test 'partial - with placeholder interleaved', partial(append, _, 'b', _)('a','c'), 'abc'

test 'apply', apply(add, [1,2]), 3
test 'applyNew', applyNew(Person, ['Josh',25]) instanceof Person, true

test 'flip', flip(sub)(2, 3), 1
test 'flip3', flip3((x, y, z) -> x - y - z)(2, 3, 5), 0
test 'nflip', nflip(append)('a','b','c'), 'cba'

test 'unary', [1,2,3].map(unary variadic), [[1], [2], [3]]
test 'binary', [1,2,3].map(binary variadic), [[1,0], [2,1], [3,2]]
test 'nary', [1,2,3].map(nary 1, variadic), [[1], [2], [3]]

test 'compose', compose(curry(add)(1), curry(mul)(2))(2), 5
test 'sequence', sequence(curry(add)(1), curry(mul)(2))(2), 6
test 'pcompose', pcompose(add(1), mul(2), add(3))([1,2,3]), [2,4,6]
test 'over', over(add, mul(2), 3, 4), 14

test 'notF', notF(even)(2), false
test 'eq', eq('foo')('foo'), true
test 'notEq', notEq('foo')('bar'), true

test 'isType', [isType('Array',[]), isType('Object',{})], [true, true]

test 'toObject', toObject(['a',1,'b',2,'c',3]), {a:1, b:2, c:3}

obj = {a:1}
test 'extend', extend(obj, {b:2, c:3}, {c:4}), {a:1, b:2, c:4}
test 'extend - mutates target', obj, {a:1, b:2, c:4}

x = {a: {b: 1, c: 2}}
y = {a: {b: 123}}
test 'deepExtend - object', deepExtend(x, y), {a: {b: 123, c: 2}}

a = ['foo',[1,{b:1}]]
test 'deepClone', a, deepClone a

test 'forOwn', forOwn([], ((acc, k, v) -> acc.concat [k, v]), {a:1, b:2, c:3}), ['a',1,'b',2,'c',3]

test 'fold', fold(0, add, [1,2,3]), 6
test 'foldr', foldr(6, sub, [1,2,3]), 0
test 'map', map(curry(add)(1), [1,2,3]), [2,3,4]
test 'filter', filter(even, [1,2,3,4]), [2,4]
test 'any', any(even, [1,2,3,4]), true
test 'all', all(even, [1,2,3,4]), false
test 'indexOf', indexOf(2, [1,2,3]), 1
test 'concat', concat([1,2], [3,4], [5,6]), [1,2,3,4,5,6]

test 'first', first([1,2,3]), 1
test 'last', last([1,2,3]), 3
test 'rest', rest([1,2,3]), [2,3]
test 'initial', initial([1,2,3]), [1,2]
test 'take', take(2, [1,2,3]), [1,2]
test 'drop', drop(2, [1,2,3]), [3]

test 'inArray', inArray([1,2,3], 2), true

test 'uniqueBy', uniqueBy(((x) -> x.length), ['a','b','aa','bb']), ['a','aa']
test 'unique', unique([1,1,2,2,3,3]), [1,2,3]
test 'dups', dups([1,1,2,2,3,4]), [1,2]
test 'flatten', flatten([1,[2,[3,[4]]]]), [1,2,3,4]
test 'union', union([1,2], [2,3], [3,4]), [1,2,3,4]
test 'intersection', intersection([1,2,3],[1,2,4],[1,2,5]), [1,2]
test 'flatMap', flatMap([1,2], (x) -> flatMap([3,4], (y) -> x + y)), [4,5,5,6]

test 'pluck array', pluck(1, [1,2,3]), 2
test 'pluck object', pluck('a', {a:1, b:2, c:3}), 1

test 'deepPluck', true, true

test 'where', where({name:'Peter'}, [{name:'Peter'},{name:'Jon'},{name:'Mike'}]), [{name:'Peter'}]
test 'deepWhere', deepWhere({a:{b:1}}, [{a:{b:1}}, {c:2}]), [{a:{b:1}}]

test 'values', values({a:1, b:2, c:3}), [1,2,3]
test 'pairs', pairs({a:1, b:2, c:3}), [['a',1],['b',2],['c',3]]

test 'zip', zip([1,2,3], [4,5,6]), [[1,4], [2,5], [3,6]]
test 'zipWith', zipWith(add, [1,2,3], [4,5,6]), [5,7,9]

test 'zipObject', zipObject(['a','b','c'],[1,2,3]), {a:1, b:2, c:3}
test 'unzipObject', unzipObject({a:1, b:2}), [['a','b'], [1,2]]

test 'range', range(0,10), [0..10]

xs = [1..5]
test 'shuffle - copies array', shuffle(xs) is xs, false

test 'sortBy', sortBy(id, [3,4,2,5,1]), [1,2,3,4,5]
test 'groupBy', groupBy(Math.round, [1.1,1.2,1.3,1.6,1.7,1.8]), {1:[1.1,1.2,1.3], 2:[1.6,1.7,1.8]}
test 'groupBy - collection', groupBy(((x) -> x.n), [{n:1},{n:1},{n:2},{n:2}]), {1:[{n:1},{n:1}],2:[{n:2},{n:2}]}
test 'countBy', countBy(Math.round, [1.1,1.2,1.3,1.6,1.7,1.8]), {1:3, 2:3}

test 'format', format(['a','c'], '%1b%2d'), 'abcd'
test 'template', template({a:'a', c:'c'}, '#{a}b#{c}d'), 'abcd'
test 'gmatch', gmatch(/\{(.+?)\}/g, '{a}b{c}d'), ['a','c']

console.log """

***********************
*      All good!      *
***********************
"""
