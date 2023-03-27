const graph = [[], [2, 3, 8], [1, 7], [1, 4, 5], [3, 5], [3, 4], [7], [2, 6, 8], [1, 7]];
const visited = Array(9).fill(false);

function dfs(graph, v, visited) {
  visited[v] = true;
  console.log(v);
  for (let node of graph[v]) {
    if (!visited[node]) {
      dfs(graph, node, visited);
    }
  }
}

dfs(graph, 1, visited);
