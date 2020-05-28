![essential.js](http://i.imgur.com/CalNHKK.png)

**Latest:** 1.1.20  
**Compatibility:** Node, ES5, Common, AMD  
**License:** MIT  

```
npm install essentialjs
```

```javascript
// Add functions to global namespace,
// `global` for Node or `window` for browser
require('essentialjs').expose(global)
```

## Highlights

Essential.js is an alternative to [Underscore.js](http://underscorejs.org/) that gives you a solid base to get started with functional programming in JavaScript:

- All non-variadic functions with more than one argument are curried.
- Arguments are in proper order for better composition.
- Includes a few helpers not found in Underscore.
- Inspired by [Brian Lonsdorf's](https://github.com/DrBoolean) talk, [Hey Underscore, You're Doing it Wrong](https://www.youtube.com/watch?v=m3svKOdZijA).

## API

<!--
generated with: `npm run-script gendoc`
-->
  
    Function                                 Examplecall, Expected output
    --------------------------------------   -------------------------------------------------------------------

    ncurry                                   ncurry(2, add)(1)(2), 3
    curry                                    curry(add)(1)(2), 3
    partial - in order                       partial(add, 1)(2), 3
    partial - with placeholder               partial(add, _, 1)(2), 3
    partial - with placeholder interleaved   partial(append, _, 'b', _)('a','c'), 'abc'
    apply                                    apply(add, [1,2]), 3
    applyNew                                 applyNew(Person, ['Josh',25]) instanceof Person, true
    flip                                     flip(sub)(2, 3), 1
    flip3                                    flip3((x, y, z) -> x - y - z)(2, 3, 5), 0
    nflip                                    nflip(append)('a','b','c'), 'cba'
    unary                                    [1,2,3].map(unary variadic), [[1], [2], [3]]
    binary                                   [1,2,3].map(binary variadic), [[1,0], [2,1], [3,2]]
    nary                                     [1,2,3].map(nary 1, variadic), [[1], [2], [3]]
    compose                                  compose(curry(add)(1), curry(mul)(2))(2), 5
    sequence                                 sequence(curry(add)(1), curry(mul)(2))(2), 6
    seq - shorthand for sequence             seq(curry(add)(1), curry(mul)(2))(2), 6
    pipe functions thru eachother            pipe(curry(add)(1), curry(mul)(2))(2), 6
    pcompose                                 pcompose(add(1), mul(2), add(3))([1,2,3]), [2,4,6]
    over                                     over(add, mul(2), 3, 4), 14
    notF                                     notF(even)(2), false
    eq                                       eq('foo')('foo'), true
    notEq                                    notEq('foo')('bar'), true
    isType                                   [isType('Array',[]), isType('Object',{})], [true, true]
    toObject                                 toObject(['a',1,'b',2,'c',3]), {a:1, b:2, c:3}
    extend                                   extend(obj, {b:2, c:3}, {c:4}), {a:1, b:2, c:4}
    extend - mutates target                  obj, {a:1, b:2, c:4}
    deepExtend - object                      deepExtend(x, y), {a: {b: 123, c: 2}}
    deepClone                                a, deepClone a
    forOwn                                   forOwn([], ((acc, k, v) -> acc.concat [k, v]), {a:1, b:2, c:3}), ['a',1,'b',2,'c',3]
    fold                                     fold(0, add, [1,2,3]), 6
    foldr                                    foldr(6, sub, [1,2,3]), 0
    map                                      map(curry(add)(1), [1,2,3]), [2,3,4]
    filter                                   filter(even, [1,2,3,4]), [2,4]
    any                                      any(even, [1,2,3,4]), true
    all                                      all(even, [1,2,3,4]), false
    indexOf                                  indexOf(2, [1,2,3]), 1
    concat                                   concat([1,2], [3,4], [5,6]), [1,2,3,4,5,6]
    first                                    first([1,2,3]), 1
    last                                     last([1,2,3]), 3
    rest                                     rest([1,2,3]), [2,3]
    initial                                  initial([1,2,3]), [1,2]
    take                                     take(2, [1,2,3]), [1,2]
    drop                                     drop(2, [1,2,3]), [3]
    inArray                                  inArray([1,2,3], 2), true
    uniqueBy                                 uniqueBy(((x) -> x.length), ['a','b','aa','bb']), ['a','aa']
    unique                                   unique([1,1,2,2,3,3]), [1,2,3]
    dups                                     dups([1,1,2,2,3,4]), [1,2]
    flatten                                  flatten([1,[2,[3,[4]]]]), [1,2,3,4]
    union                                    union([1,2], [2,3], [3,4]), [1,2,3,4]
    intersection                             intersection([1,2,3],[1,2,4],[1,2,5]), [1,2]
    flatMap                                  flatMap([1,2], (x) -> flatMap([3,4], (y) -> x + y)), [4,5,5,6]
    pluck array                              pluck(1, [1,2,3]), 2
    pluck object                             pluck('a', {a:1, b:2, c:3}), 1
    deepPluck                                true, true
    where                                    where({name:'Peter'}, [{name:'Peter'},{name:'Jon'},{name:'Mike'}]), [{name:'Peter'}]
    deepWhere                                deepWhere({a:{b:1}}, [{a:{b:1}}, {c:2}]), [{a:{b:1}}]
    values                                   values({a:1, b:2, c:3}), [1,2,3]
    pairs                                    pairs({a:1, b:2, c:3}), [['a',1],['b',2],['c',3]]
    zip                                      zip([1,2,3], [4,5,6]), [[1,4], [2,5], [3,6]]
    zipWith                                  zipWith(add, [1,2,3], [4,5,6]), [5,7,9]
    zipObject                                zipObject(['a','b','c'],[1,2,3]), {a:1, b:2, c:3}
    unzipObject                              unzipObject({a:1, b:2}), [['a','b'], [1,2]]
    range                                    range(0,10), [0..10]
    shuffle - copies array                   shuffle(xs) is xs, false
    sortBy - collection                      sortBy(id, [3,4,2,5,1]), [1,2,3,4,5]
    groupBy                                  groupBy(Math.round, [1.1,1.2,1.3,1.6,1.7,1.8]), {1:[1.1,1.2,1.3], 2:[1.6,1.7,1.8]}
    groupBy - collection                     groupBy(((x) -> x.n), [{n:1},{n:1},{n:2},{n:2}]), {1:[{n:1},{n:1}],2:[{n:2},{n:2}]}
    countBy                                  countBy(Math.round, [1.1,1.2,1.3,1.6,1.7,1.8]), {1:3, 2:3}
    format - formatting strings              format(['a','c'], '%1b%2d'), 'abcd'
    template - string evaluation             template({a:'a', c:'c'}, '#{a}b#{c}d'), 'abcd'
    gmatch                                   gmatch(/\{(.+?)\}/g, '{a}b{c}d'), ['a','c']
    either - handy for fallback              either( ((id) -> null), ((id) -> 'not found'), 1234 ), 'not found'
    bindAll - bind obj functions to scope    bindAll( obj, [scope] )


    # async map
    var arr, done;
    arr = [400, 300, 200, 100];
    done = function(err) {
      console.log("async done");
      if( err ) console.log( err.toString() );
    };
    mapAsync(arr, done, function(v, k, next) {
      return setTimeout(function() {
        return next();
      }, v);
    });

    # reactive streams 
    onbuttonpress = pipe(
      createEventStream("#mybutton",'click'), 
      pick('target'), 
      pick('value')
    ) 

## Local scope 

If you [don't want to use global scope using expose()](http://stackoverflow.com/questions/2613310/ive-heard-global-variables-are-bad-what-alternative-solution-should-i-use), but 
you still want to use FP without `_.` syntax-noise, you can include it in your local scope like this:

    require('essentialjs').local()(require)

