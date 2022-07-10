const n = 6;
const m = 6;
const graph = [
  [1, 5],
  [3, 4],
  [4, 2],
  [4, 6],
  [5, 2],
  [5, 4],
];

function solution(n, m, graph) {
  const distance = Array(n + 1)
    .fill()
    .map(() => Array(n + 1).fill(Infinity));
  for (let i = 1; i <= n; i++) {
    distance[i][i] = 0;
  }

  for (let [start, end] of graph) {
    distance[start][end] = 1;
  }

  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j]);
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      distance[i][j] = distance[i][j] === Infinity ? "I" : distance[i][j];
    }
  }

  let cnt = 0;

  for (let i = 1; i <= n; i++) {
    let start = 0;
    let end = 0;
    for (let j = 1; j <= n; j++) {
      if (distance[i][j] !== "I") start++;
      if (distance[j][i] !== "I") end++;
    }

    if (start + end - 1 === n) cnt++;
  }

  //1에 대해서 갈 수 있는 모든 수를 카운트
  //1이 갈 수 있는 모든 수를 카운트.
  //만일 그 합이 n과 같다면,

  return cnt;
}

const r = solution(n, m, graph);
console.log(r);
