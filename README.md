# Essential.js

**Latest:** 1.1.0  
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
module.exports = {
  _, id,
  builtin, toArray,
  variadic, apply,
  curryN, curry, partial,
  flip, flip3, flipN,
  compose, sequence,
  notF, isF, isntF, isType,
  toObject, extend, forOwn,
  fold, foldr, map, filter, any, all,
  slice, first, last, rest, initial, take, drop,
  inArray, unique, flatten, flatMap,
  pluck, pluckR, where,
  pairs, zip, zipWith, zipObject, unzipObject,
  range, shuffle,
  sortBy, groupBy, countBy,
  format, template, gmatch
}
```

#### id
#### builtin
#### toArray
#### variadic
#### apply
#### curryN
#### curry
#### partial
#### flip
#### flip3
#### flipN
#### compose
#### sequence
#### notF
#### isF
#### isntF
#### isType
#### toObject
#### extend
#### forOwn
#### fold
#### foldr
#### map
#### filter
#### any
#### all
#### slice
#### first
#### last
#### rest
#### initial
#### take
#### drop
#### inArray
#### unique
#### flatten
#### flatMap
#### pluck
#### pluckR
#### where
#### pairs
#### zip
#### zipWith
#### zipObject
#### unzipObject
#### range
#### shuffle
#### sortBy
#### groupBy
#### countBy
#### format
#### template
#### gmatch