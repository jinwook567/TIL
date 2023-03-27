function solution(info, edges) {
  let answer = 0;

  const getCanVisitNodes = (visited, edges) => {
    const canVisit = new Set();
    visited.forEach((v) => {
      const nodes = edges.filter((el) => el[0] === v);
      nodes.forEach(([start, end]) => {
        if (!visited.includes(end)) canVisit.add(end);
      });
    });
    return [...canVisit];
  };

  function dfs(visited, sheep, wolf) {
    if (wolf >= sheep) return;
    answer = Math.max(answer, sheep);

    const nodes = getCanVisitNodes(visited, edges);
    nodes.forEach((v) => {
      dfs([...visited, v], info[v] === 0 ? sheep + 1 : sheep, wolf + info[v]);
    });
  }
  dfs([0], 1, 0);
  return answer;
}

const info = [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1];
const edges = [
  [0, 1],
  [1, 2],
  [1, 4],
  [0, 8],
  [8, 7],
  [9, 10],
  [9, 11],
  [4, 3],
  [6, 5],
  [4, 6],
  [8, 9],
];
const r = solution(info, edges);
console.log(r);
