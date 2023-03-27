function solution(n, s, a, b, fares) {
  //s 출발, a 도착, b 도착
  const distance = Array(n + 1)
    .fill()
    .map(() => Array(n + 1).fill(Infinity));

  for (let i = 0; i <= n; i++) {
    distance[i][i] = 0;
  }

  fares.forEach(([start, end, cost]) => {
    distance[start][end] = Math.min(distance[start][end], cost);
    distance[end][start] = Math.min(distance[end][start], cost);
  });

  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j]);
      }
    }
  }

  let cost = Infinity;
  console.log(distance);

  //합승하지 않는 경우.
  cost = Math.min(cost, distance[s][a] + distance[s][b]);

  //합승할 경우
  for (let i = 1; i <= n; i++) {
    cost = Math.min(cost, distance[s][i] + distance[i][a] + distance[i][b]);
  }
  return cost;
}

const [n, s, a, b] = [6, 4, 6, 2];
const fares = [
  [4, 1, 10],
  [3, 5, 24],
  [5, 6, 2],
  [3, 1, 41],
  [5, 1, 24],
  [4, 6, 50],
  [2, 4, 66],
  [2, 3, 22],
  [1, 6, 25],
];
const r = solution(n, s, a, b, fares);
console.log(r);

//
