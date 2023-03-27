function solution(g, p, gates) {
  //g는 게이트 수.
  //p는 비행기 수.
  const parent = Array(g + 1)
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

  let cnt = 0;
  for (let gate of gates) {
    if (findParent(gate, parent) === 0) break;
    union(gate, gate - 1, parent);
    cnt++;
  }
  return cnt;
}

const gates = [4, 1, 1];
const r = solution(4, 3, gates);
console.log(r);
