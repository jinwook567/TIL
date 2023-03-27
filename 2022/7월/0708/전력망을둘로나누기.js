//곧 죽어도 서로소 알고리즘이네
function solution(n, wires) {
  let answer = Infinity;
  wires.forEach((_, i, origin) => {
    const eliminated = origin.filter((_, index) => index !== i);
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

      if (a < b) {
        parent[b] = a;
      } else {
        parent[a] = b;
      }
    }

    eliminated.forEach(([a, b]) => {
      union(a, b, parent);
    });

    for (let i = 1; i < n; i++) {
      findParent(i, parent);
    }

    const c = parent.filter((v) => v !== parent[1]).length - 1;
    const d = parent.filter((v) => v === parent[1]).length;
    const cnt = Math.abs(c - d);
    answer = Math.min(answer, cnt);
  });
  return answer;
}

const wires = [
  [1, 3],
  [2, 3],
  [3, 4],
  [4, 5],
  [4, 6],
  [4, 7],
  [7, 8],
  [7, 9],
];
const n = 9;
const r = solution(n, wires);
console.log(r);
