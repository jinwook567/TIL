//완전 탐색으로 풀 수 있는 문제임.
//각 위치에서 최댓값을 설정해줘야함.

//재귀함수를 사용하는 방법
function solution(N, M, coordinate) {
  const d = Array(N)
    .fill()
    .map(() => Array(M).fill(0));

  const dx = [1, 1, 1];
  const dy = [-1, 0, 1];

  function recursion(position, count, acc) {
    if (count === M) return;
    const [y, x] = position;
    const nAcc = acc + coordinate[y][x];

    if (d[y][x] < nAcc) {
      d[y][x] = nAcc;
    } else {
      return;
    }

    for (let i = 0; i < 3; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];
      if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
      recursion([ny, nx], count + 1, nAcc);
    }
  }

  recursion([0, 0], 0, 0);
  recursion([1, 0], 0, 0);
  recursion([2, 0], 0, 0);

  let max = 0;
  d.forEach((arr) =>
    arr.forEach((v) => {
      if (v > max) max = v;
    })
  );
  return max;
}

//재귀함수를 사용하지 않는 방법.
//재귀함수를 사용하지 않는 방법이 조금! 더 효율적으로 풀 수 있다. (0일 때 다음 함수가 실행되지 않으므로)
function solution2(N, M, coordinate) {
  const d = Array(N)
    .fill()
    .map(() => Array(M).fill(0));

  const dy = [1, 0, -1];
  const dx = [1, 1, 1];

  d[0][0] = coordinate[0][0];
  d[1][0] = coordinate[1][0];
  d[2][0] = coordinate[2][0];

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < 3; k++) {
        const ny = dy[k] + j;
        const nx = dx[k] + i;
        if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
        d[ny][nx] = Math.max(d[ny][nx], d[j][i] + coordinate[ny][nx]);
      }
    }
  }

  let max = 0;
  d.forEach((arr) =>
    arr.forEach((v) => {
      if (v > max) max = v;
    })
  );
  return max;
}

const r1 = solution2(3, 4, [
  [1, 3, 3, 2],
  [2, 1, 4, 1],
  [0, 6, 4, 7],
]);
console.log(r1);

const r2 = solution2(4, 4, [
  [1, 3, 1, 5],
  [2, 2, 4, 1],
  [5, 0, 2, 3],
  [0, 6, 1, 2],
]);
console.log(r2);
