function solution(dirs) {
  const dx = {
    U: 0,
    D: 0,
    R: 1,
    L: -1,
  };

  const dy = {
    U: -1,
    D: 1,
    R: 0,
    L: 0,
  };

  let x = 5;
  let y = 5;

  const visited = Array(11)
    .fill()
    .map(() => Array(11).fill(false));
  visited[y][x] = true;

  dirs = [...dirs];

  dirs.forEach((direction) => {
    const ny = y + dy[direction];
    const nx = x + dx[direction];

    if (nx < 0 || nx > 10 || ny < 0 || ny > 10) return;
    visited[ny][nx] = true;
    y = ny;
    x = nx;
  });

  let cnt = 0;
  visited.forEach((arr) =>
    arr.forEach((v) => {
      if (v) cnt++;
    })
  );
  return cnt - 1;
}

const dirs = "LULLLLLLU";
const r = solution(dirs);
console.log(r);
