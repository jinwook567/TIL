function solution(n) {
  const d = Array(n + 1).fill(0);
  d[1] = 1;
  d[2] = 2;

  for (let i = 3; i <= n; i++) {
    d[i] = (d[i - 1] + d[i - 2]) % 123456;
  }
  return d[n];
}

const n = 3;
const r = solution(n);
console.log(r);

//개미창고와 유사한 문제이다..
