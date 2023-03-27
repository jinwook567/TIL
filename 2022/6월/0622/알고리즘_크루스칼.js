function kruskal(V, E, graph) {
  //V는 노드, E는 간선의 개수
  const parent = Array(V + 1).fill(0);

  //초기화
  for (let i = 1; i <= V; i++) {
    parent[i] = i;
  }

  function findParent(parent, i) {
    if (parent[i] !== i) {
      parent[i] = findParent(parent, parent[i]);
    }
    return parent[i];
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

  graph.sort((a, b) => a[2] - b[2]);

  for (let i = 0; i < E; i++) {
    const [a, b, count] = graph[i];

    if (findParent(parent, a) !== findParent(parent, b)) {
      //사이클이 없다면,
      union(parent, a, b);
      result += count;
    }
  }
  return result;
}

const r = kruskal(7, 9, [
  [1, 2, 29],
  [1, 5, 75],
  [2, 3, 35],
  [2, 6, 34],
  [3, 4, 7],
  [4, 6, 23],
  [4, 7, 13],
  [5, 6, 53],
  [6, 7, 25],
]);

console.log(r);
