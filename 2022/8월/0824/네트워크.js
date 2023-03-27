function dfs(node, graph, visited) {
  if (visited[node]) return;
  visited[node] = true;

  graph[node].forEach((v) => {
    dfs(v, graph, visited);
  });
}

function solution(n, computers) {
  const visited = Array(n + 1).fill(false);
  visited[0] = true;
  let answer = 0;

  const graph = Array(n + 1)
    .fill()
    .map((_) => []);

  computers.forEach((arr, i) =>
    arr.forEach((v, index) => {
      if (v === 1) {
        graph[index + 1].push(i + 1);
      }
    })
  );

  for (let i = 1; i <= n; i++) {
    if (!visited[i]) answer++;
    dfs(i, graph, visited);
  }
  return answer;
}

const n = 3;
const computers = [
  [1, 1, 0],
  [1, 1, 1],
  [0, 1, 1],
];

const r = solution(n, computers);
console.log(r);
