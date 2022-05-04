const graph = [[], [2, 3, 8], [1, 7], [1, 4, 5], [3, 5], [3, 4], [7], [2, 6, 8], [1, 7]];
const visited = Array(9).fill(false);
const queue = [1];

function bfs(graph, v, visited) {
  visited[v] = true;
  queue.shift(v);
  console.log(v);
  graph[v].forEach((node) => {
    if (!visited[node] && !queue.find((q) => q === node)) {
      queue.push(node);
    }
  });
}

while (queue.length !== 0) {
  bfs(graph, queue[0], visited);
}
