function solution(n, computers) {
  const parent = Array(n + 1)
    .fill()
    .map((_, index) => index);

  const findParent = (x, parent) => {
    if (parent[x] === x) return x;
    parent[x] = findParent(parent[x], parent);
    return parent[x];
  };

  const union = (a, b, parent) => {
    a = findParent(a, parent);
    b = findParent(b, parent);

    if (a > b) {
      parent[a] = b;
    } else {
      parent[b] = a;
    }
  };

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
    graph[i].forEach((v) => {
      union(i, v, parent);
    });
  }

  for (let i = 1; i <= n; i++) {
    findParent(i, parent);
  }

  return new Set(parent).size - 1;
}

const n = 3;
const computers = [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1],
];
const r = solution(n, computers);
console.log(r);
