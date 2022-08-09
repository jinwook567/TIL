function solution(N, number) {
  const d = Array(32001).fill(0);

  d[N] = 1;
  d[1] = 2;

  const same = [11, 111, 1111, 11111];
  same.forEach((v, i) => {
    if (v * N <= 32000) {
      d[v * N] = i + 2;
    }
  });

  //N 곱하면서 나아가기.
  for (let i = 2 * N; i <= Math.floor(32000 / N); i += N) {
    if (d[i] === 0) d[i] = d[i - N] + 1;
    else d[i] = Math.min(d[i], d[i - N] + 1);
  }

  //1씩 더하기
  for (let i = 2; i <= 32000; i++) {
    if (d[i] === 0) d[i] = d[i - 1] + 2;
    else d[i] = Math.min(d[i], d[i - 1] + 2);
  }

  //나누기 연산
  for (let i = 32000; i > 1; i--) {
    if (i * N > 32000) continue;

    for (let j = i; j > 1; j = Math.floor(j / N)) {
      d[j] = Math.min(d[j], d[j * N] + 1);
    }
  }

  //1씩 더하기
  for (let i = 2; i <= 32000; i++) {
    if (d[i] === 0) d[i] = d[i - 1] + 2;
    else d[i] = Math.min(d[i], d[i - 1] + 2);
  }
  return d[number] > 8 ? -1 : d[number];
}

const N = 5;
const number = 12;
const r = solution(N, number);
console.log(r);
