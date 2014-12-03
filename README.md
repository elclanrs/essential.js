![essential.js](http://i.imgur.com/CalNHKK.png)

**Latest:** 1.1.10  
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

```coffeescript
module.exports = {
  # Core
  _, id, K,
  builtin, toArray,
  variadic, apply, applyNew,
  ncurry, λ, curry, partial,
  flip, flip3, nflip,
  compose, pcompose, sequence, over,
  notF, not:notF, eq, notEq, typeOf, isType,
  toObject, extend, deepExtend, deepClone, forOwn,
  fold, foldr, map, filter, any, all, each, indexOf, concat,
  slice, first, last, rest, initial, take, drop,
  inArray, uniqueBy, unique, dups, flatten, union, intersection, flatMap,
  pluck, rpluck, where,
  values, pairs, zip, zipWith, zipObject, unzipObject,
  range, shuffle,
  sortBy, groupBy, countBy,
  format, template, gmatch,
  # Fantasy
  fmap, ap, chain, liftA, seqM
}
```
