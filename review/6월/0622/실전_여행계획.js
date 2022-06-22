//그래프로 연결이 되어 있으면 갈 수 있다. 즉 서로소 집합 알고리즘을 사용하면 된다.
function solution(N, graph, plan) {
  const parent = Array(N + 1).fill(0);
  const edges = [];
  graph.forEach((arr, y) =>
    arr.forEach((v, x) => {
      if (v === 1) {
        edges.push([x + 1, y + 1]);
      }
    })
  );
  console.log(edges);

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

  edges.forEach((v) => {
    const [a, b] = v;
    union(parent, a, b);
  });

  //   let root = findParent(parent, plan[0]);
  //   for (let node of plan) {
  //     if (root !== findParent(parent, node)) {
  //       return "NO";
  //     }
  //   }

  //위의 방식보다는 아래 방식이 더 멋짐.
  for (let i = 0; i < plan.length - 1; i++) {
    if (findParent(parent, plan[i]) !== findParent(parent, plan[i + 1])) {
      return "NO";
    }
  }

  return "YES";
  //2,3,4,3
}

const graph = [
  [0, 1, 0, 1, 1],
  [1, 0, 1, 1, 0],
  [0, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [1, 0, 0, 0, 0],
];

const plan = [2, 3, 4, 3];

const r = solution(5, graph, plan);
console.log(r);
