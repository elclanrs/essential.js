![essential.js](http://i.imgur.com/CalNHKK.png)

**Latest:** 1.1.2  
**Compatibility:** Node, ES5, Common, AMD  
**License:** MIT

```
npm install essentialjs
```

```javascript
// Require
var essential = require('essentialjs')
// Global functions
essential.extend(global, essential)
```

## Highlights

Essential.js is a simpler alternative to [Underscore.js](http://underscorejs.org/) that gives you a solid base to get started with functional programming in JavaScript "the right way":

- All non-variadic functions with more than one argument are curried.
- Arguments are in proper order for better composition.
- Includes a few helpers not found in Underscore.
- Inspired by [Brian Lonsdorf's](https://github.com/DrBoolean) talk, [Hey Underscore, You're Doing it Wrong](https://www.youtube.com/watch?v=m3svKOdZijA).

## API

```javascript
id(x)  
builtin(f)  
toArray(ArrayLike)  
variadic(as...)  
apply(f, as...)  
curryN(n, f)  
curry(f)  
partial(f, as...)  
flip(f(x, y))  
flip3(f(x, y, z))  
flipN(f(as...))  
compose(fs...)  
sequence(fs...)  
notF(f)  
eq(x, y)  
notEq(x, y)  
isType(t, x)  
toObject(Array)  
extend(Object...)  
forOwn(acc, f(acc, k, v), Object<k,v>)  
fold(acc, f(acc, x), Array<x>)  
foldr(acc, f(acc, x), Array<x>)  
map(f(x), Array<x>)  
filter(f(x), Array<x>)  
any(f(x), Array<x>)  
all(f(x), Array<x>)  
each(f(x), Array(x))  
concat(Array...)  
slice(Number, Number?, Array)  
first(Array)  
last(Array)  
rest(Array)  
initial(Array)  
take(Number, Array)  
drop(Number, Array)  
inArray(Array, x)  
unique(Array)  
dups(Array)  
flatten(Array)  
union(Array...)  
intersection(Array...)
flatMap(Array<x>, f(x))  
pluck(String|Number, Array|Object)  
pluckR(String|Number, Array|Object)  
where(Object, Array<Object>)  
pairs(Object)  
zip(Array...)  
zipWith(f(x1, x2, ..., xN), Array<x>...)  
zipObject(Array<Array>)  
unzipObject(Object)  
range(Number, Number)  
shuffle(Array)  
sortBy(Array)  
groupBy(Array)  
countBy(Array)  
format(Array, String)  
template(Object, String)  
gmatch(RegExp, String)  
```
