!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.essential=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/*
 * Essential.js 1.1.9
 * @author Cedric Ruiz
 * @license MIT
 */
var K, all, any, ap, apply, applyNew, builtin, chain, compose, concat, countBy, curry, deepClone, drop, dups, each, eq, extend, filter, first, flatMap, flatten, flip, flip3, fmap, fold, foldr, forOwn, format, gmatch, groupBy, id, inArray, indexOf, initial, intersection, isType, last, liftA, map, ncurry, nflip, notEq, notF, over, pairs, partial, pcompose, pluck, range, rest, rpluck, seqM, sequence, shuffle, slice, sortBy, take, template, toArray, toObject, typeOf, union, unique, uniqueBy, unzipObject, values, variadic, where, zip, zipObject, zipWith, λ, _,
  __slice = [].slice,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __hasProp = {}.hasOwnProperty;

_ = {};

id = function(x) {
  return x;
};

K = function(x) {
  return function() {
    return x;
  };
};

builtin = id.bind.bind(id.call);

toArray = builtin(Array.prototype.slice);

variadic = function() {
  var as;
  as = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return as;
};

ncurry = function(n, f, as) {
  if (as == null) {
    as = [];
  }
  return function() {
    var bs;
    bs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    bs = as.concat(bs);
    if (bs.length < n) {
      return ncurry(n, f, bs);
    } else {
      return f.apply(null, bs);
    }
  };
};

λ = curry = function(f) {
  return function() {
    var as;
    as = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (f.length > as.length) {
      return ncurry(f.length, f, as);
    } else {
      return f.apply(null, as);
    }
  };
};

apply = λ(function(f, as) {
  return f.apply(null, as);
});

applyNew = λ(function(f, as) {
  return new (f.bind.apply(f, [null].concat(__slice.call(as))));
});

partial = function() {
  var as, f;
  f = arguments[0], as = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  return function() {
    var args, bs, i;
    bs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    args = as.concat(bs);
    i = args.length;
    while (i--) {
      if (args[i] === _) {
        args[i] = args.splice(-1)[0];
      }
    }
    return f.apply(null, args);
  };
};

flip = λ(function(f, x, y) {
  return f(y, x);
});

flip3 = λ(function(f, x, y, z) {
  return f(z, y, x);
});

nflip = function(f) {
  return function() {
    var as;
    as = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return f.apply(null, as.reverse());
  };
};

compose = function() {
  var fs;
  fs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return fs.reduce(function(f, g) {
    return function() {
      var as;
      as = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return f(g.apply(null, as));
    };
  });
};

pcompose = function() {
  var fs;
  fs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return function(xs) {
    return xs.map(function(x, i) {
      return typeof fs[i] === "function" ? fs[i](x) : void 0;
    });
  };
};

sequence = nflip(compose);

over = λ(function(f, g, x, y) {
  return f(g(x), g(y));
});

notF = function(f) {
  return function() {
    var as;
    as = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return !f.apply(null, as);
  };
};

eq = λ(function(x, y) {
  return y === x;
});

notEq = ncurry(2, notF(eq));

typeOf = function(x) {
  return Object.prototype.toString.call(x).slice(8, -1);
};

isType = λ(function(t, x) {
  return typeOf(x) === t;
});

toObject = function(xs) {
  return xs.reduce(function(acc, x, i) {
    if (i % 2) {
      acc[xs[i - 1]] = x;
    }
    return acc;
  }, {});
};

extend = function() {
  var a, bs;
  a = arguments[0], bs = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  return bs.reduce(function(acc, x) {
    Object.keys(x).forEach(function(k) {
      return acc[k] = x[k];
    });
    return acc;
  }, a);
};

deepClone = function(obj) {
  var init;
  init = isType('Array', obj) ? [] : {};
  return Object.keys(obj).reduce(function(acc, k) {
    var mustClone, x;
    x = obj[k];
    mustClone = isType('Array', x) || isType('Object', x);
    acc[k] = mustClone ? deepClone(x) : x;
    return acc;
  }, init);
};

forOwn = λ(function(acc, f, obj) {
  Object.keys(obj).forEach(function(k, i) {
    return acc = f(acc, k, obj[k], i);
  });
  return acc;
});

fold = flip3(builtin(Array.prototype.reduce));

foldr = flip3(builtin(Array.prototype.reduceRight));

map = flip(builtin(Array.prototype.map));

filter = flip(builtin(Array.prototype.filter));

any = flip(builtin(Array.prototype.some));

all = flip(builtin(Array.prototype.every));

each = flip(builtin(Array.prototype.forEach));

indexOf = flip(builtin(Array.prototype.indexOf));

concat = builtin(Array.prototype.concat);

slice = λ(function(i, j, xs) {
  if (j != null) {
    return xs.slice(i, j);
  } else {
    return xs.slice(i);
  }
});

first = function(_arg) {
  var x, xs;
  x = _arg[0], xs = 2 <= _arg.length ? __slice.call(_arg, 1) : [];
  return x;
};

last = function(_arg) {
  var x, xs, _i;
  xs = 2 <= _arg.length ? __slice.call(_arg, 0, _i = _arg.length - 1) : (_i = 0, []), x = _arg[_i++];
  return x;
};

rest = slice(1, null);

initial = slice(0, -1);

take = slice(0);

drop = partial(slice, _, null, _);

inArray = λ(function(xs, x) {
  return __indexOf.call(xs, x) >= 0;
});

uniqueBy = λ(function(f, xs) {
  var seen;
  seen = [];
  return xs.filter(function(x) {
    var fx;
    fx = f(x);
    if (fx == null) {
      return true;
    }
    if (__indexOf.call(seen, fx) >= 0) {
      return;
    }
    seen.push(fx);
    return true;
  });
});

unique = uniqueBy(id);

dups = function(xs) {
  return xs.filter(function(x, i) {
    return xs.indexOf(x) !== i;
  });
};

flatten = function(xs) {
  var _ref;
  while (xs.some(Array.isArray)) {
    xs = (_ref = Array.prototype).concat.apply(_ref, xs);
  }
  return xs;
};

union = compose(unique, flatten, variadic);

intersection = compose(unique, dups, flatten, variadic);

flatMap = flip(compose(flatten, map));

pluck = λ(function(x, xs) {
  return String(x).split('.').reduce(function(acc, x) {
    return acc && acc[x];
  }, xs);
});

rpluck = λ(function(x, xs) {
  var out;
  out = [];
  while (xs = pluck(x, xs)) {
    out.push(xs);
  }
  return out;
});

where = λ(function(obj, xs) {
  return xs.filter(function(x) {
    return Object.keys(obj).every(function(k) {
      return obj[k] === x[k];
    });
  });
});

values = function(obj) {
  var v, _results;
  _results = [];
  for (_ in obj) {
    if (!__hasProp.call(obj, _)) continue;
    v = obj[_];
    _results.push(v);
  }
  return _results;
};

pairs = forOwn([], function(acc, k, v) {
  return acc.concat([[k, v]]);
});

zip = function() {
  var xss;
  xss = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return xss[0].map(function(_, i) {
    return xss.map(pluck(i));
  });
};

zipWith = function() {
  var f, xss;
  f = arguments[0], xss = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  return apply(zip, xss).map(partial(apply, f));
};

zipObject = compose(toObject, flatten, zip);

unzipObject = forOwn([[], []], function(acc, k, v, i) {
  acc[0][i] = k;
  acc[1][i] = v;
  return acc;
});

range = λ(function(m, n) {
  var _i, _results;
  return (function() {
    _results = [];
    for (var _i = m; m <= n ? _i <= n : _i >= n; m <= n ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this);
});

shuffle = function(xs) {
  var i, j, ys, _i, _len, _ref;
  ys = xs.slice(0);
  for (i = _i = 0, _len = ys.length; _i < _len; i = ++_i) {
    _ = ys[i];
    j = Math.random() * (i + 1) | 0;
    _ref = [ys[j], ys[i]], ys[i] = _ref[0], ys[j] = _ref[1];
  }
  return ys;
};

sortBy = λ(function(f, xs) {
  return xs.sort(function(x, y) {
    var fx, fy;
    fx = f(x);
    fy = f(y);
    switch (false) {
      case typeof fx !== 'number':
        return fx - fy;
      case !(fx > fy):
        return 1;
      case !(fx < fy):
        return -1;
      default:
        return 0;
    }
  });
});

groupBy = λ(function(f, xs) {
  return xs.reduce(function(acc, x) {
    var fx;
    fx = f(x);
    acc[fx] = (acc[fx] || []).concat([x]);
    return acc;
  }, {});
});

countBy = sequence(groupBy, forOwn({}, function(acc, k, v) {
  acc[k] = v.length;
  return acc;
}));

format = λ(function(xs, x) {
  return x.replace(/%(\d+)/g, function(_, i) {
    return xs[--i] || '';
  });
});

template = λ(function(obj, x) {
  return x.replace(/#\{(.+?)\}/g, function(_, k) {
    return obj[k] || '';
  });
});

gmatch = λ(function(re, x) {
  var out;
  out = [];
  x.replace(re, function() {
    var as;
    as = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return out.push.apply(out, as.slice(1, -2));
  });
  return out;
});

fmap = λ(function(f, ma) {
  return ma.map(f);
});

ap = λ(function(mf, ma) {
  return ma.ap(mf);
});

chain = λ(function(f, ma) {
  return ma.chain(f);
});

liftA = λ(function(ctor, f, ms) {
  return ms.reduce(function(acc, ma) {
    return acc.ap(ma);
  }, ctor.of(f));
});

seqM = λ(function(ctor, ms) {
  return ms.reduceRight(function(ma, mb) {
    return ma.chain(function(a) {
      return mb.map(function(b) {
        return [b].concat(a);
      });
    });
  }, ctor.of([]));
});

module.exports = {
  _: _,
  id: id,
  K: K,
  builtin: builtin,
  toArray: toArray,
  variadic: variadic,
  apply: apply,
  applyNew: applyNew,
  ncurry: ncurry,
  λ: λ,
  curry: curry,
  partial: partial,
  flip: flip,
  flip3: flip3,
  nflip: nflip,
  compose: compose,
  pcompose: pcompose,
  sequence: sequence,
  over: over,
  notF: notF,
  not: notF,
  eq: eq,
  notEq: notEq,
  typeOf: typeOf,
  isType: isType,
  toObject: toObject,
  extend: extend,
  deepClone: deepClone,
  forOwn: forOwn,
  fold: fold,
  foldr: foldr,
  map: map,
  filter: filter,
  any: any,
  all: all,
  each: each,
  indexOf: indexOf,
  concat: concat,
  slice: slice,
  first: first,
  last: last,
  rest: rest,
  initial: initial,
  take: take,
  drop: drop,
  inArray: inArray,
  uniqueBy: uniqueBy,
  unique: unique,
  dups: dups,
  flatten: flatten,
  union: union,
  intersection: intersection,
  flatMap: flatMap,
  pluck: pluck,
  rpluck: rpluck,
  where: where,
  values: values,
  pairs: pairs,
  zip: zip,
  zipWith: zipWith,
  zipObject: zipObject,
  unzipObject: unzipObject,
  range: range,
  shuffle: shuffle,
  sortBy: sortBy,
  groupBy: groupBy,
  countBy: countBy,
  format: format,
  template: template,
  gmatch: gmatch,
  fmap: fmap,
  ap: ap,
  chain: chain,
  liftA: liftA,
  seqM: seqM
};

module.exports.expose = partial(extend, _, module.exports);



},{}]},{},[1])(1)
});