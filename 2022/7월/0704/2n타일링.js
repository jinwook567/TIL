function solution(n) {
  const d = Array(n + 1).fill(0);
  d[1] = 1;
  d[2] = 2;

  //1가지 경우밖에 없음.
  for (let i = 3; i <= n; i++) {
    d[i] = d[i - 1] + d[i - 2];
  }

  return d[n] % 1000000007;
}
const r = solution(300);
console.log(r);

// 5 - 4 = 1
//1-2-3-5-8-13...
