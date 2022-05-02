//전형적인 플로이드워셜 문제이다. n의 범위가 100이하로 한정적이기 때문에 구현이 간단한 플로이드 워셜 알고리즘 사용한다.

const graph = [
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 4],
  [3, 4],
  [3, 5],
  [4, 5],
];
const N = 5;
//노드의 개수
const X = 4;
//최종 목적지

const K = 5;
//경유지

function solution(graph, N, X, K) {
  const layer = Array(N).fill(Infinity);
  const arr = layer.map((n) => Array(N).fill(Infinity));

  //본인에서 본인으로 0
  for (let i = 0; i < N; i++) {
    arr[i][i] = 0;
  }

  for (let data of graph) {
    const [start, end] = data;
    arr[start - 1][end - 1] = 1;
    //길이는 1이라고 문제에서 하였음.
    arr[end - 1][start - 1] = 1;
    //하나의 길이 이어져있으면 반대길도 갈 수 있음.
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < N; k++) {
        if (arr[j][k] > arr[j][i] + arr[i][k]) {
          arr[j][k] = arr[j][i] + arr[i][k];
        }
      }
    }
  }

  return arr[0][K - 1] + arr[K - 1][X - 1] === Infinity ? -1 : arr[0][K - 1] + arr[K - 1][X - 1];
}

//플로이드 워셜 알고리즘 이외에도 다익스트라 알고리즘 반복해서도 같은 결과나오는지 확인해보기.

const result = solution(graph, N, X, K);
console.log(result);
