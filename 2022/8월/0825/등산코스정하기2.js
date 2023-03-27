const nextNode = (visited, d, anotherGatesAndSummits) => {
  let min = Infinity;
  let minIndex = null;
  for (let i = 0; i < d.length; i++) {
    if (!visited[i]) {
      min = Math.min(d[i], min);
      if (min === d[i] && !anotherGatesAndSummits.find((v) => v === i)) minIndex = i;
    }
  }
  return minIndex;
};

function solution(n, paths, gates, summits) {
  let summit = null;
  let min = Infinity;

  summits.sort((a, b) => b - a);
  paths = [...paths, ...paths.map((v) => [v[1], v[0], v[2]])];

  summits.sort((a, b) => b - a);
  gates.forEach((start) => {
    summits.forEach((end) => {
      const d = Array(n + 1).fill(Infinity);
      const visited = Array(n + 1).fill(false);
      visited[0] = true;
      const anotherGates = gates.filter((v) => v !== start);
      //산봉우리도 2번 가면 안됨.
      const anotherSummits = summits.filter((v) => v !== end);

      d[start] = 0;
      paths
        .filter((v) => v[0] === start)
        .forEach(([_, end, cost]) => {
          d[end] = cost;
        });

      while (true) {
        const node = nextNode(visited, d, [...anotherGates, ...anotherSummits]);
        if (!node) break;

        visited[node] = true;

        paths
          .filter((v) => v[0] === node)
          .forEach(([_, end, cost]) => {
            const distance = Math.max(d[node], cost);
            d[end] = Math.min(d[end], distance);
          });
      }

      min = Math.min(min, d[end]);
      if (min === d[end]) summit = end;
    });
  });
  return [summit, min];
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
