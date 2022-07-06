let fs = require("fs");
//let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let input = fs.readFileSync("./s.txt").toString().trim().split("\n");

const N = +input.shift();

const T = [0];
const P = [0];

for (let i = 0; i < N; i++) {
  const [t, p] = input.shift().split(" ").map(Number);
  T.push(t);
  P.push(p);
}

const d = Array(N + 2).fill(0);

for (let i = 1; i <= N; i++) {
  const maxValue = d.slice(1, i + 1).reduce((acc, cur) => Math.max(acc, cur), 0);
  //본인까지 포함해서 maxValue
  d[i] = maxValue;

  const finish = i + T[i];

  if (finish > N + 1) {
    continue;
  }

  d[finish] = Math.max(d[finish], d[i] + P[i]);
}
d[N + 1] = Math.max(d[N + 1], d[N]);
console.log(d[N + 1]);
