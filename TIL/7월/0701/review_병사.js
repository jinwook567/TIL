// let fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// const N = +input.shift();
// const soldiers = input.shift().split(" ").map(Number);

const N = 7;
const soldiers = [15, 11, 4, 8, 5, 2, 4];

function solution(N, soldiers) {
  const d = Array(N + 1).fill(0);
  //모든 이전에 더한 최댓값에 대해서 +1,
  d[0] = 1;
  let maxValue = 1;
  for (let i = 1; i <= N; i++) {
    if (soldiers[i] - soldiers[i - 1] < 0) {
      //정상
      d[i] = maxValue + 1;
      maxValue = d[i];
    } else {
      //비정상
      d[i] = maxValue;
    }
  }
  console.log(d);
}

const r = solution(N, soldiers);
