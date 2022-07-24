function solution(land) {
  const d = Array(land.length)
    .fill()
    .map(() => Array(4).fill(0));

  for (let i = 0; i < 4; i++) {
    d[0][i] = land[0][i];
  }

  for (let i = 0; i < d.length - 1; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        if (j === k) continue;
        d[i + 1][k] = Math.max(d[i + 1][k], d[i][j] + land[i + 1][k]);
      }
    }
  }

  return Math.max(...d[land.length - 1]);
}

const land = [
  [1, 2, 3, 5],
  [5, 6, 7, 8],
  [4, 3, 2, 1],
];
const r = solution(land);
console.log(r);
