let fs = require("fs");
//let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let input = fs.readFileSync("./s.txt").toString().trim().split("\n");

const n = +input.shift();
const m = +input.shift();
const graph = [];

for (let i = 0; i < m; i++) {
  graph.push(input.shift().split(" ").map(Number));
}

function solution(n, graph) {
  const distance = Array(n + 1)
    .fill()
    .map(() => Array(n + 1).fill(Infinity));

  //본인에서 본인으로 가는 길 초기화
  for (let i = 1; i <= n; i++) {
    distance[i][i] = 0;
  }

  for (let [start, end, cost] of graph) {
    distance[start][end] = Math.min(distance[start][end], cost);
  }

  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j]);
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    console.log(distance[i].slice(1));
  }
}

const r = solution(n, graph);
console.log(r);
