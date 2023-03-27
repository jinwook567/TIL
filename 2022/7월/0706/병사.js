//LIS 알고리즘

let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input.shift();
const numbers = input.shift().split(" ").map(Number);

const d = Array(n + 1).fill(1);

for (let i = 1; i <= n; i++) {
  for (let j = 1; j < i; j++) {
    if (numbers[j - 1] > numbers[i - 1]) {
      d[i] = Math.max(d[i], d[j] + 1);
    }
  }
}

console.log(n - Math.max(...d));
