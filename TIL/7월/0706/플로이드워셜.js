const graph = [
  [1, 2, 4],
  [1, 4, 6],
  [2, 1, 3],
  [2, 3, 7],
  [3, 1, 5],
  [3, 4, 4],
  [4, 3, 2],
];

function floyd(n, graph) {
  const distance = Array(n + 1)
    .fill()
    .map(() => Array(n + 1).fill(Number.MAX_SAFE_INTEGER));

  for (let [start, end, cost] of graph) {
    distance[start][end] = cost;
  }

  for (let i = 0; i <= n; i++) {
    distance[i][i] = 0;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      for (let k = 1; k <= n; k++) {
        distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j]);
      }
    }
  }
  console.log(distance);
  //그냥 다른 곳으로 떠나고 싶다..
}

floyd(4, graph);
