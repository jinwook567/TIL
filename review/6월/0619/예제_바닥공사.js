function solution(K) {
  const d = Array(K + 1).fill(0);
  d[1] = 1;
  d[2] = 3;
  d[3] = 5;

  for (let i = 3; i <= K; i += 2) {
    d[i] = d[i - 1] + 1;
    d[i + 1] = d[i - 1] + 3;
  }
  return d[K] % 796796;
}

const r = solution(3);
console.log(r);
