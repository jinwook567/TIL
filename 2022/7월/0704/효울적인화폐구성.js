//거꾸로 가야함. 거꾸로 안가면 n 이상 일 때는 안한다.. 이딴거 필요함
function solution(M, numbers) {
  const d = Array(M + 1).fill(Number.MAX_SAFE_INTEGER);
  d[M] = 0;
  for (let i = M; i > 0; i--) {
    numbers.forEach((v) => {
      if (d[i] === Number.MAX_SAFE_INTEGER) return;
      if (i - v < 0) return;
      d[i - v] = Math.min(d[i - v], d[i] + 1);
    });
  }
  return d[0] === Number.MAX_SAFE_INTEGER ? -1 : d[0];
}

const numbers = [2, 3];
const r = solution(15, numbers);
const r2 = solution(4, [3, 5, 7]);
console.log({ r, r2 });

function solution2(M, numbers) {
  const d = Array(M + 1).fill(Number.MAX_SAFE_INTEGER);
  d[0] = 0;

  for (let i = 1; i <= M; i++) {
    numbers.forEach((v) => {
      if (d[i - v] !== Number.MAX_SAFE_INTEGER && i - v >= 0) {
        d[i] = Math.min(d[i], d[i - v] + 1);
      }
    });
  }
  return d[M] === Number.MAX_SAFE_INTEGER ? -1 : d[M];
}

const r3 = solution2(15, numbers);
console.log(r3);
