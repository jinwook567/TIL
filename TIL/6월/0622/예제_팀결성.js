function solution(N, M, calculation) {
  const parent = Array(N + 1).fill(0);

  //초기화
  for (let i = 1; i <= N; i++) {
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

  for (let i = 0; i < calculation.length; i++) {
    const [type, a, b] = calculation[i];

    if (type === 0) {
      union(parent, a, b);
    }

    if (type === 1) {
      const msg = findParent(parent, a) === findParent(parent, b) ? "YES" : "NO";
      console.log(msg);
    }
  }
}

const calculation = [
  [0, 1, 3],
  [1, 1, 7],
  [0, 7, 6],
  [1, 7, 1],
  [0, 3, 7],
  [0, 4, 2],
  [0, 1, 1],
  [1, 1, 1],
];

solution(7, 8, calculation);
