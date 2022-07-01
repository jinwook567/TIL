let fs = require("fs");
//let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let input = fs.readFileSync("./sample.txt").toString().trim().split("\n");
const N = +input.shift();
const T = [0];
const P = [0];

for (let i = 0; i < N; i++) {
  const [t, p] = input.shift().split(" ").map(Number);
  T.push(t);
  P.push(p);
}

const findMax = (arr) => {
  return arr.reduce((acc, cur) => Math.max(acc, cur), -Number.MAX_SAFE_INTEGER);
};

function solution(T, P) {
  const d = Array(N + 2).fill(0);
  let maxValue = 0;
  for (let i = 1; i <= N; i++) {
    const day = i + T[i];

    if (day > N + 1) {
      d[i] = maxValue;
    } else {
      d[i] = Math.max(d[i], maxValue);
      maxValue = d[i];
      const cost = Math.max(d[day], d[i] + P[i]);
      d[day] = cost;
    }
  }
  console.log(d);
  return d[N + 1];
}

const r = solution(T, P);
console.log(r);

// 거꾸로 돌아가는 방식. 비슷하네. findMax를 매번 하기보다는 max_value를 사용해서 간단하게 업데이트 하는군.
function solution2(T, P) {
  const d = Array(N + 2).fill(0);
  let maxValue = 0;

  for (let i = N; i >= 1; i--) {
    const time = i + T[i];

    if (time <= N + 1) {
      //d[time] = Math.max(d[i] + P[i], d[time]);
      d[i] = Math.max(P[i] + d[time], maxValue);
      maxValue = d[i];
    } else {
      d[i] = maxValue;
    }
  }

  return maxValue;
}

const r2 = solution2(T, P);
console.log(r2);

//거꾸로 가게 되면, 배열 내에서 빈 부분이 없기 떄문에 현재의 d[i]와 maxValue의 값을 비교할 필요가 없다. 한단계 줄게된다.
