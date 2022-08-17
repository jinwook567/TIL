function floydwarshall(N, graph) {
  const distance = Array(N + 1)
    .fill()
    .map(() => Array(N + 1).fill(Infinity));
  distance[0] = [];

  for (let i = 1; i <= N; i++) {
    distance[i][i] = 0;
  }

  for (let [start, end, d] of graph) {
    distance[start][end] = d;
  }

  for (let mid = 1; mid <= N; mid++) {
    for (let j = 1; j <= N; j++) {
      for (let k = 1; k <= N; k++) {
        if (distance[j][k] > distance[j][mid] + distance[mid][k]) {
          distance[j][k] = distance[j][mid] + distance[mid][k];
        }
      }
    }
  }
  console.log(distance);
}

const graph = [
  [1, 2, 4],
  [1, 4, 6],
  [2, 1, 3],
  [2, 3, 7],
  [3, 1, 5],
  [3, 4, 4],
  [4, 3, 2],
];

floydwarshall(4, graph);

//플로이드워셜과 다익스트라 머릿속에 정리가 끝나야하는데. 코드를 구현하는 것만으로는 안돼.
