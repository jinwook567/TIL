const graph = [
  [0, 0, 1, 1, 0],
  [0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
];
//0이 얼음. 1은 칸막이.

function solution(graph, N, M) {
  //n이 세로, M이 가로
  const visited = Array(N)
    .fill()
    .map(() => Array(M).fill(false));

  //상, 하, 좌, 우
  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, -1, 1];
  let count = 0;

  function dfs(graph, visited, x, y) {
    visited[y][x] = true;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx >= 0 && nx < M && ny >= 0 && ny < N) {
        //범위 내에,
        if (!visited[ny][nx] && graph[ny][nx] === 0) {
          dfs(graph, visited, nx, ny);
        }
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j] === 0 && !visited[i][j]) {
        count++;
        dfs(graph, visited, j, i);
      }
    }
  }
  console.log(visited);
  return count;
}
//알고리즘이 조금 잘못되었다. 일부분 에러가 있다. visited 디버깅 해봤을 때..

const result = solution(graph, 4, 5);
console.log(result);

//차분하게 풀면 풀린다...
