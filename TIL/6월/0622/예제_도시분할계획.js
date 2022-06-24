//크루스칼 알고리즘
function solution(N, M, graph) {
  //최소 신장 트리를 2개 만들어야함.
  //절반을 뽑는 경우를 전부 생각..? 1000개이기 떄문에 안된다.
  //신장트리에서 가장 긴 간선을 제거하면.. 분리가 되는구나.. 미쳤군..
  //이 사고가 필연적으로 나와야하는 이유에 대해서.

  //일단 연결되어 있지 않은 상태에서 나눠봤자 아무런 의미가 없다.
  //이런 경우 반대로 생각해야한다. 먼저 만든 다음에 나눈다.

  graph.sort((a, b) => a[2] - b[2]);

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

  let result = 0;
  let max = 0;

  for (let i = 0; i < M; i++) {
    const [a, b, count] = graph[i];
    if (findParent(parent, a) !== findParent(parent, b)) {
      union(parent, a, b);
      result += count;
      max = Math.max(max, count);
    }
  }

  return result - max;
}

const graph = [
  [1, 2, 3],
  [1, 3, 2],
  [3, 2, 1],
  [2, 5, 2],
  [3, 4, 4],
  [7, 3, 6],
  [5, 1, 5],
  [1, 6, 2],
  [6, 4, 1],
  [6, 5, 3],
  [4, 5, 3],
  [6, 7, 4],
];

const r = solution(7, 12, graph);
console.log(r);
