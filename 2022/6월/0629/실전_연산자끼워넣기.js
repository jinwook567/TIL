//console.log(4 ** 11);
//400만으로 완전탐색 가능하다.

let fs = require("fs");
let input = fs.readFileSync("./sample.txt").toString().trim().split("\n");
//let input = fs.readFileSync('/dev/stdin').toString().trim().split(example);

const N = input.shift();
const numbers = input.shift().split(" ").map(Number);
const operation = input.shift().split(" ").map(Number);

function solution(N, numbers, operation) {
  let max = -Infinity;
  let min = Infinity;

  function dfs(numbers, operation) {
    if (operation.reduce((acc, cur) => acc + cur, 0) === 0) {
      max = Math.max(max, numbers[0]);
      min = Math.min(min, numbers[0]);
      return;
    }
    //연산할게 없다면 numbers 리턴

    //+-*/
    if (operation[0] !== 0) {
      dfs(
        [numbers[0] + numbers[1], ...numbers.slice(2)],
        [operation[0] - 1, operation[1], operation[2], operation[3]]
      );
    }

    if (operation[1] !== 0) {
      dfs(
        [numbers[0] - numbers[1], ...numbers.slice(2)],
        [operation[0], operation[1] - 1, operation[2], operation[3]]
      );
    }

    if (operation[2] !== 0) {
      dfs(
        [numbers[0] * numbers[1], ...numbers.slice(2)],
        [operation[0], operation[1], operation[2] - 1, operation[3]]
      );
    }

    if (operation[3] !== 0) {
      const calculate =
        numbers[0] / numbers[1] < 0
          ? -Math.floor(numbers[0] / -numbers[1])
          : Math.floor(numbers[0] / numbers[1]);
      dfs(
        [calculate, ...numbers.slice(2)],
        [operation[0], operation[1], operation[2], operation[3] - 1]
      );
    }
  }
  dfs(numbers, operation);

  if (max === +0 || -0) max = 0;
  if (min === -0 || +0) min = 0;
  console.log(max);
  console.log(min);
}

solution(N, numbers, operation);
