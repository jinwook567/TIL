function solution(n) {
  const array = Array(n)
    .fill()
    .map((_, i) => i + 1);
  let start = 0;
  let end = 0;
  let sum = 0;
  let cnt = 0;

  while (start <= array.length - 1) {
    if (sum <= n && end <= array.length - 1) {
      sum += array[end++];
    } else {
      sum -= array[start++];
    }
    if (sum === n) cnt++;
  }
  return cnt;
}

const n = 15;
const r = solution(n);
console.log(r);
