//우리가 원하는 건 단순히 순위를 정확히 알 수 있는 학생은 몇명인지 이다.
//순위를 정확히 알 수 있으려면, 앞 뒤의 개수가 본인을 제외하고 정확히 있으면 된다.
function solution(n, m, graph) {
  //while문을 돌면서 뒤에 있는 것을 찾는다..?
  const before = Array(n + 1).fill(0);
  const after = Arary(n + 1).fill(0);
  for (let [start, end] of graph) {
    //우선 이전 것을 처리해보면
    while (graph.filter((v) => v[1] === start).length !== 0) {}
  }
}

const n = 6;
const m = 6;
const graph = [
  [1, 5],
  [3, 4],
  [4, 2],
  [4, 6],
  [5, 2],
  [5, 4],
];
const r = solution(n, m, graph);
console.log(r);
