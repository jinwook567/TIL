function solution(N, number) {
  const maxLen = `${number}`.length;
  const maxNum = Number("9".repeat(maxLen));
  const d = Array(maxNum).fill(Infinity);

  //같은 숫자가 반복되는 숫자 만들어주기.
  for (let i = N, j = 1; i < maxNum; i += j * N) {
    d[i] = `${i}`.length;
    j *= 10;
  }

  d[1] = N === 1 ? 1 : 2;

  //1을 더하고, N을 더하고, N을 곱하고. 이것을 반복..
  for (let i = 1; i <= maxNum; i++) {
    //1더하기
    d[i + 1] = Math.min(d[i + 1], d[i] + d[1]);
    //N더하기
    d[i + N] = Math.min(d[i + N], d[i] + 1);
    //N곱하기
    d[i * N] = Math.min(d[i * N], d[i] + 1);
    //N나누기
    d[i / N] = Math.min(d[i / N], d[i] + 1);
  }
  console.log(d);
  return d[number] > 8 ? -1 : d[number];
}

const N = 5;
const number = 12;

const r = solution(N, number);
console.log({ r });
