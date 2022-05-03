const graph = [
  [1, 1, 1, 1],
  [1, 0, 0, 1],
  [1, 1, 0, 1],
  [1, 1, 1, 1],
];
//1은 바다, 0은 육지. 바다로는 갈 수 없음.
const position = [1, 1, 0];
//(1,1) 위치 북쪽을 바라보고 있음.

//1. 왼쪽 방향부터 갈 곳을 정한다.
//2. 왼쪽 방향에 안가본 칸이 존재한다면, 왼쪽 방향 회전 후 한칸 전진, 가보지 않은 칸이 없다면 회전만.
//3. 만약 네 방향 모두 가본칸, 혹은 바다 인 경우 바라보는 방향 유지 후 한칸 뒤로 가고 1단계로 돌아간다.
//(종료조건) 3단계 마지막에 뒤쪽 방향도 바다인 칸이면 움직임 멈춘다.

function solution(N, graph, position) {
  //북, 동, 남, 서 정의 (direction에 따라서)
  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  let [x, y, direction] = position;

  function turnLeft() {
    direction -= 1;
    //1을 뺀다.
    if (direction === -1) direction = 3;
  }

  const visited = Array(N)
    .fill()
    .map(() => Array(N).fill(false));

  //갔는지 안갔는지 처리해줘야함.

  visited[y][x] = true;

  let count = 0;
  let turnTime = 0;

  while (true) {
    turnLeft();
    const nx = x + dx[direction];
    const ny = y + dy[direction];
    console.log({ direction, nx, ny, visited });
    if (!visited[ny][nx] && graph[ny][nx] === 0) {
      visited[ny][nx] = true;
      x = nx;
      y = ny;
      count++;
      turnTime = 0;
      continue;
    } else {
      turnTime++;
    }

    if (turnTime === 4) {
      const backDirection = (direction + 2) % 4;
      const nx = x + dx[backDirection];
      const ny = y + dy[backDirection];
      if (graph[ny][nx] === 1) {
        break;
      } else {
        turnTime = 0;
        x = nx;
        y = ny;
        count++;
      }
    }
  }

  return count;
  //while true로 설정하고, 끝나는 조건이 있으면 break를 걸어버린다.
}

const result = solution(4, graph, position);
console.log(result);
