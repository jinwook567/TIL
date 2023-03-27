function solution(n, paths, gates, summits) {
  //다른 출발지를 경유하지 않고..
  const d = Array(n + 1)
    .fill()
    .map((_) => Array(n + 1).fill(Infinity));

  for (let i = 1; i <= n; i++) {
    d[i][i] = 0;
  }

  paths.forEach(([start, end, cost]) => {
    d[start][end] = Math.min(d[start][end], cost);
    d[end][start] = Math.min(d[end][start], cost);
  });

  const mountains = Array(n)
    .fill()
    .map((_, i) => i + 1);
  const notGates = mountains.filter((v) => !gates.find((el) => el === v));

  for (let k of notGates) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        const via = Math.max(d[i][k], d[k][j]);
        d[i][j] = Math.min(d[i][j], via);
      }
    }
  }

  summits.sort((a, b) => b - a);

  let minIntensity = Infinity;
  let summit = null;

  summits.forEach((s) => {
    gates.forEach((g) => {
      minIntensity = Math.min(d[g][s], minIntensity);
      if (minIntensity === d[g][s]) summit = s;
    });
  });

  return [summit, minIntensity];
}

const n = 6;
const paths = [
  [1, 2, 3],
  [2, 3, 5],
  [2, 4, 2],
  [2, 5, 4],
  [3, 4, 4],
  [4, 5, 3],
  [4, 6, 1],
  [5, 6, 1],
];
const gates = [1, 3];
const summits = [5];
const r = solution(n, paths, gates, summits);
console.log(r);
