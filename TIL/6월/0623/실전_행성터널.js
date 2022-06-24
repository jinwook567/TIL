//이 방식으로 풀게되면 O(N^2)이 되기 때문에 문제를 풀 수 없다. 근데 그래도 풀려야 하는 것 아닌가?!
function solution(N, graph) {
  const parent = Array(N + 1).fill(0);
  for (let i = 1; i <= N; i++) {
    parent[i] = i;
  }
  console.log(parent);

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

  const edges = [];

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const a = Math.abs(graph[i][0] - graph[j][0]);
      const b = Math.abs(graph[i][1] - graph[j][1]);
      const c = Math.abs(graph[i][2] - graph[j][2]);
      edges.push([i + 1, j + 1, Math.min(a, b, c)]);
    }
  }

  edges.sort((a, b) => a[2] - b[2]);

  let result = 0;
  const load = [];

  for (let i = 0; i < edges.length; i++) {
    const [a, b, cost] = edges[i];
    if (findParent(parent, a) !== findParent(parent, b)) {
      load.push([a, b, cost]);
      result += cost;
      union(parent, a, b);
    }
  }

  return result;
}

const graph = [
  [11, -15, -15],
  [14, -5, -15],
  [-1, -1, -5],
  [10, -4, -1],
  [19, -4, 19],
];

const r = solution(5, graph);

function solution2(N, graph) {
  const parent = Array(N + 1).fill(0);
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

  //머니까.. sort 한다음에 하면..
  //홀리쉿.. 개쩌네..
  const x = [];
  const y = [];
  const z = [];

  graph.forEach((k, i) => {
    x.push([k[0], i + 1]);
    y.push([k[1], i + 1]);
    z.push([k[2], i + 1]);
  });
  //0번째 좌표, 1번째는 node

  x.sort((a, b) => a[0] - b[0]);
  y.sort((a, b) => a[0] - b[0]);
  z.sort((a, b) => a[0] - b[0]);

  const edges = [];
  for (let i = 0; i < N - 1; i++) {
    edges.push([x[i + 1][0] - x[i][0], x[i][1], x[i + 1][1]]);
    edges.push([y[i + 1][0] - y[i][0], y[i][1], y[i + 1][1]]);
    edges.push([z[i + 1][0] - z[i][0], z[i][1], z[i + 1][1]]);
  }

  edges.sort((a, b) => a[0] - b[0]);
  let result = 0;

  for (let i = 0; i < edges.length; i++) {
    const [cost, a, b] = edges[i];
    if (findParent(parent, a) !== findParent(parent, b)) {
      result += cost;
      union(parent, a, b);
    }
  }
  return result;
}

const r2 = solution2(5, graph);
