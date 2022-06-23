function solution(N, M, graph) {
  const parent = Array(N).fill(0);
  for (let i = 0; i < N; i++) {
    parent[i] = i;
  }

  function findParent(parent, x) {
    if (parent[x] !== x) {
      parent[x] = findParent(parent, parent[x]);
    }
    return parent[x];
  }

  function union(parent, a, b) {
    const pa = findParent(parent, a);
    const pb = findParent(parent, b);

    if (pa < pb) {
      parent[pb] = pa;
    } else {
      parent[pa] = pb;
    }
  }
  let result = 0;
  let total = 0;
  const edges = [];
  graph.sort((a, b) => a[2] - b[2]);

  for (let i = 0; i < M; i++) {
    const [a, b, cost] = graph[i];
    total += cost;
    if (findParent(parent, a) !== findParent(parent, b)) {
      edges.push([a, b]);
      union(parent, a, b);
      result += cost;
    }
  }

  return total - result;
}

const graph = [
  [0, 1, 7],
  [0, 3, 5],
  [1, 2, 8],
  [1, 3, 9],
  [1, 4, 7],
  [2, 4, 5],
  [3, 4, 15],
  [3, 5, 6],
  [4, 5, 8],
  [4, 6, 9],
  [5, 6, 11],
];

const r = solution(7, 11, graph);
console.log(r);
