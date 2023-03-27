function solution(n) {
  const d = Array(n + 1).fill(0);

  d[1] = 1;
  d[2] = 3;

  for (let i = 3; i <= n; i++) {
    d[i] = d[i - 1] + d[i - 2] * 2;
  }
  return d[n];
}
//i-1까지 채워져 있으면 그냥 하나 놓는 수밖에 없음.
//i-2면 2개 만들 수 있음. (세로 세로 놓는 것은 i-1에 해당 되었기 떄문에 제외함.)
//i-2일 때 개수 * 2

const n = 3;
const r = solution(n);
console.log(r);
