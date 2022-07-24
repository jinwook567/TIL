function sum(x) {
  if (x === 1) return x;
  return x + sum(x - 1);
}

function solution(n) {
  const triangle = Array(n)
    .fill()
    .map((_, i) =>
      Array(i + 1)
        .fill()
        .map((_) => [])
    );

  triangle[0][0] = 1;
  const loop = sum(n);
  let cnt = 1;
  let i = 0; //y
  let j = 0; //x
  let start = [0, 0];

  while (cnt < loop) {
    cnt++;
    if (j === 0 && i < n - 1) {
      triangle[++i][j] = cnt;
      continue;
    }

    if (i === n - 1 && j < n - 1) {
      triangle[i][++j] = cnt;
      continue;
    }

    if (i === j && i > start[0] + 1 && j > start[1] + 1) {
      triangle[--i][--j] = cnt;
      continue;
    }

    if (i === start[0] + 1 && j === start[1] + 1) {
      start = [++i, j];
    }
  }
  console.log(triangle);
}

const n = 4;
const r = solution(n);
console.log(r);
