//크루스칼 알고리즘

//최소 거리를 찾는 것이 관건, O(N^2) 루프 불가.
let fs = require("fs");
//let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let input = fs.readFileSync("./s.txt").toString().trim().split("\n");

const n = +input.shift();
const coordinate = [];
for (let i = 0; i < n; i++) {
  coordinate.push({ p: input.shift().split(" ").map(Number), node: i + 1 });
}

function solution(n, coordinate) {
  const edges = [];

  for (let i = 0; i <= 2; i++) {
    coordinate.sort((a, b) => a.p[i] - b.p[i]);
    for (let j = 0; j < n - 1; j++) {
      edges.push([
        coordinate[j].node,
        coordinate[j + 1].node,
        Math.abs(coordinate[j].p[i] - coordinate[j + 1].p[i]),
      ]);
    }
  }

  edges.sort((a, b) => a[2] - b[2]);

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

  let result = 0;
  for (let [start, end, cost] of edges) {
    if (findParent(start, parent) !== findParent(end, parent)) {
      union(start, end, parent);
      result += cost;
    }
  }
  console.log(result);
}

solution(n, coordinate);
console.log(r);
