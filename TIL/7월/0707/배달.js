function solution(N, road, K) {
  //1번 마을이니까 다익스트라 알고리즘이다. 하지만 N이 50으로 충분히 작으니 플로이드 워셜 알고리즘을 사용해도 좋다.
  //같은 정보 여러개 있을 수 있다고 했으니까 간선의 길이도 업데이트 하면서 나가야함. [1,2] -> [2,1] 이렇게 2번 해줘야함.
  const distance = Array(N + 1)
    .fill()
    .map(() => Array(N + 1).fill(Infinity));

  for (let i = 1; i <= N; i++) {
    distance[i][i] = 0;
  }

  road.forEach(([start, end, cost]) => {
    distance[start][end] = Math.min(distance[start][end], cost);
    distance[end][start] = Math.min(distance[end][start], cost);
  });

  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j]);
      }
    }
  }

  let cnt = 0;
  for (let i = 1; i <= N; i++) {
    if (distance[1][i] <= K) cnt++;
  }
  return cnt;
}

const N = 6;
const road = [
  [1, 2, 1],
  [1, 3, 2],
  [2, 3, 2],
  [3, 4, 3],
  [3, 5, 2],
  [3, 5, 3],
  [5, 6, 1],
];
const K = 4;

const r = solution(N, road, K);
console.log({ r });
