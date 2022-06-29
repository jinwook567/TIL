const example = [
  [0, 0, 1, 1, 0],
  [0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
];

function solution(example) {
  const n = example.length;
  const m = example[0].length;
  function dfs(graph, position) {
    const [y, x] = position;

    if (y < 0 || x < 0 || x >= m || y >= n) return false;
    if (graph[y][x] === 0) {
      graph[y][x] = 1;
      dfs(graph, [y - 1, x]);
      dfs(graph, [y + 1, x]);
      dfs(graph, [y, x - 1]);
      dfs(graph, [y, x + 1]);

      return true;
    } else {
      return false;
    }
  }

  let cnt = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (dfs(example, [i, j])) {
        cnt++;
      }
    }
  }

  return cnt;
}

const r = solution(example);
console.log({ r });
