function solution(n, paths, gates, summits) {
  let answer = [Infinity, Infinity];

  const pathsByNode = Array(n + 1)
    .fill()
    .map((_) => []);

  paths.forEach(([i, j, w]) => {
    pathsByNode[i].push([j, w]);
    pathsByNode[j].push([i, w]);
  });

  pathsByNode.forEach((arr) => arr.sort((a, b) => a[1] - b[1]));

  function dfs(visited, current, intensity, start) {
    if (summits.includes(current)) {
      if (answer[1] > intensity) {
        answer[1] = intensity;
        answer[0] = current;
      }

      if (answer[1] === intensity) {
        answer[0] = Math.min(answer[0], current);
      }
      return;
    }

    if (intensity > answer[1]) return;

    if (current !== start && gates.includes(current)) return;

    pathsByNode[current].forEach(([end, cost]) => {
      if (visited.includes(end)) return;
      dfs([...visited, end], end, cost > intensity ? cost : intensity, start);
    });
  }

  gates.forEach((g) => {
    pathsByNode[g].forEach(([end, cost]) => {
      dfs([g, end], end, cost, g);
    });
  });
  return answer;
}

const n = 7;
const paths = [
  [1, 2, 5],
  [1, 4, 1],
  [2, 3, 1],
  [2, 6, 7],
  [4, 5, 1],
  [5, 6, 1],
  [6, 7, 1],
];
const gates = [3, 7];
const summits = [1, 5];
const r = solution(n, paths, gates, summits);
console.log(r);
