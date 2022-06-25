function solution(N, M, initalPosition, coordinate) {
  const visited = Array(N + 1)
    .fill()
    .map(() => Array(M + 1).fill(false));
  //바다 전부 visited
  //초기 위치 visited
  let [y, x, d] = initalPosition;
  visited[y][x] = true;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (coordinate[j][i] === 1) visited[j][i] = true;
    }
  }

  const directionSteps = ["T", "L", "B", "R"];
  let dIndex = d;

  const moves = {
    T: [-1, 0],
    L: [0, -1],
    B: [1, 0],
    R: [0, 1],
  };
  let count = 0;

  while (true) {
    for (let i = 0; i < 4; i++) {
      dIndex = (dIndex + 1) % 4;
      const direction = directionSteps[dIndex];
      const ny = moves[direction][0] + y;
      const nx = moves[direction][1] + x;
      if (ny < 1 || nx < 1 || ny >= N || nx >= M) continue;
      if (!visited[ny][nx]) {
        y = ny;
        x = nx;
        visited[y][x] = true;
        count++;
        break;
      }

      if (i === 3) {
        const direction2 = directionSteps[(dIndex + 2) % 4];
        const ny = moves[direction2][0] + y;
        const nx = moves[direction2][1] + x;
        if (coordinate[ny][nx] === 1) {
          return count;
        } else {
          y = ny;
          x = nx;
          visited[y][x] = true;
          count++;
        }
      }
    }
  }
}

const coordinate = [
  [1, 1, 1, 1],
  [1, 0, 0, 1],
  [1, 1, 0, 1],
  [1, 1, 1, 1],
];

const r = solution(4, 4, [1, 1, 0], coordinate);
console.log(r);
