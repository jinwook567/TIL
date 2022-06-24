//완전 탐색으로..
//서로소 판별 알고리즘으로 해결할 수 있으나, 내 방식으로도 문제 해결할 수 있다.
function solution(N, M, docking) {
  const gates = Array(N + 1).fill(false);
  //큰 것부터 넣기 시작하면, docking에서 되지 않을까..?

  //내림차순 정렬
  docking.sort((a, b) => b - a);
  let count = 0;

  for (let i = 0; i < M; i++) {
    for (let j = docking[i]; j >= 1; j--) {
      if (!gates[j]) {
        gates[j] = true;
        count++;
        break;
      }
      if (j === 1 && gates[j]) {
        return count;
      }
    }
  }
}

function solution2(N, M, docking) {
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

  let count = 0;
  for (let i = 0; i < M; i++) {
    if (findParent(parent, docking[i]) === 0) {
      return count;
    } else {
      union(parent, findParent(parent, docking[i]), findParent(parent, docking[i] - 1));
      count++;
    }
  }
  return count;
}

const docking = [4, 1, 1];
const r = solution(4, 3, docking);
const r2 = solution2(4, 3, docking);
console.log({ r, r2 });
