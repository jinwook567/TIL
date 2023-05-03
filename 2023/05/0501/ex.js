const { map, filter, reduce, log, go, pipe, curry, range, L, take, join, find } = require("./fx");

const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

const sum = (a, b) => a + b;

// log(
//   reduce(
//     sum,
//     filter(
//       (price) => price > 15000,
//       map(({ price }) => price, products)
//     )
//   )
// );

// log(
//   go(
//     3,
//     (a) => a + 10,
//     (a) => a + 20
//   )
// );

const add30 = pipe(
  (a) => a + 10,
  (a) => a + 20
);

const c_sum = curry(sum);
const add1 = c_sum(1);

// curry 적용하여 무인수 스타일 코딩
// log(
//   go(
//     products,
//     map(({ price }) => price),
//     filter((price) => price > 15000),
//     reduce(sum)
//   )
// );

const total_price = pipe(
  map(({ price }) => price),
  reduce(sum)
);

// go(
//   range(10),
//   map((a) => a + 1),
//   filter((a) => a < 5),
//   log
// );

// go(
//   L.range(10),
//   L.filter((a) => a < 5),
//   L.map((a) => a + 10),
//   take(2),
//   log
// );

// log(find(({ price }) => price > 15000, products));
