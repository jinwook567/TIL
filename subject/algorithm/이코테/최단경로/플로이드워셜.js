const V = 4;
const E = 7;

const graph = [
  [1, 2, 4],
  [1, 4, 6],
  [2, 1, 3],
  [2, 3, 7],
  [3, 1, 5],
  [3, 4, 4],
  [4, 3, 2],
];

function solution(graph, V, E) {
  //플로이드 워셜. 중간값에 넣어서 한번씩..
  const arr = [];
  for (let i = 0; i < V; i++) {
    arr.push(Array(V).fill(Infinity));
  }

  //본인에서 본인으로 가는 거리 0으로 초기화.
  for (let i = 0; i < V; i++) {
    arr[i][i] = 0;
  }

  for (let data of graph) {
    const [start, end, distance] = data;
    arr[start - 1][end - 1] = distance;
    //나의 node는 0부터 시작하기에 1을 빼줬다.
  }

  for (let i = 0; i < V; i++) {
    for (let j = 0; j < V; j++) {
      for (let k = 0; k < V; k++) {
        if (arr[j][k] > arr[j][i] + arr[i][k]) {
          arr[j][k] = arr[j][i] + arr[i][k];
        }
      }
    }
  }

  return arr;
}

const result = solution(graph, V, E);
console.log(result);
