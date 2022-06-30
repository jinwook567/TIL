let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
//let input = fs.readFileSync("./sample.txt").toString().trim().split("\n");
const numbers = [];
const N = +input.shift();
for (let i = 0; i < N; i++) {
  numbers.push(+input.shift());
}

function solution(numbers) {
  numbers.sort((a, b) => a - b);
  if (N === 1) return numbers[0];

  let before = numbers[0] + numbers[1];
  let result = numbers[0] + numbers[1];
  for (let i = 1; i < N - 1; i++) {
    result += before + numbers[i + 1];
    before += numbers[i + 1];
  }
  return result;
}

const r = solution(numbers);
console.log(r);
