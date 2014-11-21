![essential.js](http://i.imgur.com/CalNHKK.png)

**Latest:** 1.1.5  
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

```javascript
module.exports = {
  _, id, K,
  builtin, toArray,
  variadic, apply,
  curryN, λ, curry, partial,
  flip, flip3, flipN,
  compose, sequence, pcompose,
  notF, eq, notEq, typeOf, isType,
  toObject, extend, deepClone, forOwn,
  fold, foldr, map, filter, any, all, each, indexOf, concat,
  slice, first, last, rest, initial, take, drop,
  inArray, uniqueBy, unique, dups, flatten, union, intersection, flatMap,
  pluck, pluckR, where,
  values, pairs, zip, zipWith, zipObject, unzipObject,
  range, shuffle,
  sortBy, groupBy, countBy,
  format, template, gmatch
}
```
