function solution(n, graph) {
  const distance = Array(n + 1).fill(Infinity);
  distance[1] = 0;

  const visited = Array(n + 1).fill(false);
  visited[0] = true;
  visited[1] = true;

  let start = 1;
  while (!visited.every((v) => v)) {
    const nodes = graph.filter((v) => v[0] === start || v[1] === start);
    console.log(nodes, distance);

    for (let [start, end] of nodes) {
      distance[end] = Math.min(distance[end], distance[start] + 1);
      visited[end] = true;
      visited[start] = true;
    }
    start = nodes[0][1];
  }
  console.log(distance);
}

const n = 6;
const graph = [
  [3, 6],
  [4, 3],
  [3, 2],
  [1, 3],
  [1, 2],
  [2, 4],
  [5, 2],
];
const r = solution(n, graph);
console.log(r);
