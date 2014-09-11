![essential.js](http://i.imgur.com/CalNHKK.png)

**Latest:** 1.1.3  
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

Essential.js is a simpler alternative to [Underscore.js](http://underscorejs.org/) that gives you a solid base to get started with functional programming in JavaScript "the right way":

- All non-variadic functions with more than one argument are curried.
- Arguments are in proper order for better composition.
- Includes a few helpers not found in Underscore.
- Inspired by [Brian Lonsdorf's](https://github.com/DrBoolean) talk, [Hey Underscore, You're Doing it Wrong](https://www.youtube.com/watch?v=m3svKOdZijA).

## API

```javascript
id           : (x) -> x
builtin      : (x.f(Arguments...)) -> f(x, Arguments...)
toArray      : (ArrayLike<x>) -> Array<x>
variadic     : (x1, x2, ..., xN) -> Array<x>
apply        : (f, x1, x2, ..., xN) -> f(x1, x2, ..., xN)
curryN       : (n, f(x1, x2, ..., n)) -> f(x1)(x2)(...)(n)
curry        : (f(x1, x2, ..., xN)) -> f(x1)(x2)(...)(xN)
partial      : (f, Arguments...)
flip         : (f(x, y)) -> f(y, x)
flip3        : (f(x, y, z)) -> f(z, y, x)
flipN        : (f(x1, x2, ..., xN)) -> f(xN, ..., x2, x1)
compose      : (fs...)
sequence     : (fs...)
notF         : (f)
eq           : (x, y) -> Bool
notEq        : (x, y) -> Bool
isType       : (String, x) -> Bool
toObject     : (Array) -> Object
extend       : (target: Object, Object...) -> target
forOwn       : (acc, f(acc, k, v) -> acc, Object<k,v>) -> acc
fold         : (acc, f(acc, x) -> acc, Array<x>) -> acc
foldr        : (acc, f(acc, x) -> acc, Array<x>) -> acc
map          : (f(x) -> y, Array<x>) -> Array<y>
filter       : (f(x) -> Bool, Array<x>) -> Array<x>
any          : (f(x) -> Bool, Array<x>) -> Array<x>
all          : (f(x) -> Bool, Array<x>) -> Array<x>
each         : (f(x) -> Bool, Array<x>) -> Array<x>
concat       : (Array...) -> Array
slice        : (Number, Number?, Array) -> Array
first        : (Array<x>) -> x
last         : (Array<x>) -> x
rest         : (Array) -> Array
initial      : (Array) -> Array
take         : (Number, Array) -> Array
drop         : (Number, Array) -> Array
inArray      : (Array<x>, x) -> Bool
unique       : (Array) -> Array
dups         : (Array) -> Array
flatten      : (Array<Array<x>>) -> Array<x>
union        : (Array...) -> Array
intersection : (Array...) -> Array
flatMap      : (Array<x>, f(x)) -> Array<x>
pluck        : (String|Number, Array|Object) -> Any
pluckR       : (String|Number, Array|Object) -> Any
where        : (Object, Array<Object>) -> Array<Object>
pairs        : (Object) -> Array
zip          : (Array...) -> Array
zipWith      : (f(Arguments<x>...) -> y, Array<x>...) -> Array<y>
zipObject    : (Array<Array<k,v>>) -> Object<k,v>
unzipObject  : (Object<k,v>) -> Array<Array<k,v>>
range        : (Number, Number) -> Array
shuffle      : (Array) -> Array
sortBy       : (Array) -> Array
groupBy      : (Array) -> Object
countBy      : (Array) -> Object
format       : (Array, String) -> String
template     : (Object, String) -> String
gmatch       : (RegExp, String) -> String
```
