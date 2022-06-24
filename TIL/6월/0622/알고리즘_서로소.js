//서로소 판별 알고리즘

function relativelyPrime(V, E, graph) {
  //V는 노드의 개수 E는 간선의 개수

  const parent = Array(V + 1).fill(0);
  //인덱스 0은 넣어주지 않음.

  //노드값 초기화
  for (let i = 1; i <= V; i++) {
    parent[i] = i;
  }

  //부모 찾기
  function findParent(i) {
    if (parent[i] !== i) {
      return findParent(parent[i]);
    } else {
      return i;
    }
  }

  //경로 압축 기법
  function findParentPress(i) {
    if (parent[i] !== i) {
      return (parent[i] = findParent(parent[i]));
    } else {
      return i;
    }
  }

  function union(a, b) {
    const pa = findParentPress(a);
    const pb = findParentPress(b);

    if (pa < pb) {
      parent[pb] = pa;
    } else {
      parent[pa] = pb;
    }
  }

  for (let i = 0; i < E; i++) {
    const [a, b] = graph[i];
    union(a, b);
  }

  for (let i = 1; i <= V; i++) {
    console.log(findParentPress(i));
  }

  console.log(parent);
  //노드가 1부터 순차적으로 증가하는게 아니라면 그냥 최댓값 기준으로 parent를 만들면되고 만약 0이 들어가있으면 해당 부분은 그냥 무시하면 된다.
}

relativelyPrime(6, 4, [
  [1, 4],
  [2, 3],
  [2, 4],
  [5, 6],
]);

//서로소 집합의 사이클 판별 알고리즘

function checkCycle(V, E, graph) {
  //V는 노드의 개수
  //E는 간선의 개수
  //graph는 간선의 정보
  const parent = Array(V + 1).fill(0);

  function findParent(parent, i) {
    if (parent[i] !== i) {
      findParent(parent[i]);
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

  //초기화
  for (let i = 1; i <= V; i++) {
    parent[i] = i;
  }

  let cycle = false;

  for (let i = 0; i < E; i++) {
    const [a, b] = graph[i];

    if (findParent(parent, a) === findParent(parent, b)) {
      cycle = true;
      break;
    } else {
      union(parent, a, b);
    }
  }
  return cycle;
}

const r = checkCycle(3, 3, [
  [1, 2],
  [1, 3],
  [2, 3],
]);
