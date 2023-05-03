const log = console.log;

// const curry = (f) => {
//   const curried = (...args) => {
//     if (args.length >= f.length) return f(...args);
//     else return (...args2) => curried(...args, ...args2);
//   };
//   return curried;
// };

const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((f, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  const res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

const go = (a, ...fs) => {
  return reduce((acc, f) => f(acc), a, fs);
};

const pipe = (f, ...fs) => {
  return (...args) => go(f(...args), ...fs);
};

const range = (l) => {
  const res = [];
  for (let i = 0; i < l; i++) {
    console.log(i, "range");
    res.push(i);
  }
  return res;
};

const take = curry((l, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) break;
  }
  return res;
});

const L = {};

L.range = function* (l) {
  for (let i = 0; i < l; i++) {
    console.log(i, "lazy range");
    yield i;
  }
};

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield f(a);
  }
});

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

const join = (sep = ",", iter) => {
  return reduce((acc, a) => `${acc}${sep}${a}`, iter);
};

const find = (f, iter) => {
  return go(iter, L.filter(f), take(1));
};

module.exports = {
  map,
  filter,
  reduce,
  log,
  go,
  pipe,
  curry,
  range,
  L,
  take,
  join,
  find,
};
