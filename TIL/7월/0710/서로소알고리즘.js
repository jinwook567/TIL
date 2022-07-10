const n = 6;
const graph = [
  [1, 4],
  [2, 3],
  [2, 4],
  [5, 6],
];
function solution(n, graph) {
  const parent = Array(n + 1)
    .fill()
    .map((_, i) => i);

  function findParent(x, parent) {
    if (parent[x] !== x) {
      parent[x] = findParent(parent[x], parent);
    }
    return parent[x];
  }

  function union(a, b, parent) {
    a = findParent(a, parent);
    b = findParent(b, parent);

    if (a > b) {
      parent[a] = b;
    } else {
      parent[b] = a;
    }
  }

  for (let [a, b] of graph) {
    union(a, b, parent);
  }

  for (let i = 1; i <= n; i++) {
    findParent(i, parent);
  }

  console.log(parent);
}

solution(n, graph);
