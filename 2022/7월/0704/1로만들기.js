//함수형으로.
function solution(n) {
  //2,3,5로 나눌 수 있고 1 뺄 수 있다.
  const d = Array(n + 1).fill(Infinity);
  d[n] = 0;

  for (let i = n; i >= 2; i--) {
    if (i % 2 === 0) {
      d[i / 2] = Math.min(d[i / 2], d[i] + 1);
    }

    if (i % 5 === 0) {
      d[i / 5] = Math.min(d[i / 5], d[i] + 1);
    }

    if (i % 3 === 0) {
      d[i / 3] = Math.min(d[i / 3], d[i] + 1);
    }
    d[i - 1] = Math.min(d[i - 1], d[i] + 1);
  }
  console.log(d);
  return d[1];
}

//아래에서 위로
function solution2(n) {
  const d = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
  d[1] = 0;

  for (let i = 2; i <= n; i++) {
    if (i % 2 === 0) {
      d[i] = Math.min(d[i], d[i / 2] + 1);
    }

    if (i % 3 === 0) {
      d[i] = Math.min(d[i], d[i / 3] + 1);
    }

    if (i % 5 === 0) {
      d[i] = Math.min(d[i], d[i / 5] + 1);
    }

    d[i] = Math.min(d[i], d[i - 1] + 1);
  }
  return d[n];
}

const r = solution(26);
console.log(r);

const r2 = solution2(26);
console.log(r2);
