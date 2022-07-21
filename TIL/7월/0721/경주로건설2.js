//dfs로 한번 풀어보기.

function getDirection(before, current) {
  const [y, x] = before;
  const [ny, nx] = current;

  if (y !== ny) {
    return y > ny ? "T" : "B";
  } else {
    return x > nx ? "L" : "R";
  }
}

function solution(board) {
  const n = board.length;
  const visited = Array(n)
    .fill()
    .map(() => Array(n).fill("F"));

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, 1, -1];
  let answer = Infinity;

  function dfs(coordinate, visited, direction, acc) {
    const [y, x] = coordinate;
    //console.log(y, x, visited);
    if (y === n - 1 && x === n - 1) {
      console.log(y, x, visited);
      answer = Math.min(answer, acc);
      return;
    }
    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (ny < 0 || nx < 0 || nx >= n || ny >= n) continue;
      if (visited[ny][nx] === "T") continue;
      if (board[ny][nx] === 1) continue;

      const nDirection = getDirection(coordinate, [ny, nx]);
      const newVisited = JSON.parse(JSON.stringify(visited));
      newVisited[ny][nx] = "T";
      dfs(
        [ny, nx],
        newVisited,
        nDirection,
        direction === nDirection || direction === "S" ? acc + 100 : acc + 100 + 500
      );
    }
  }

  visited[0][0] = "T";
  dfs([0, 0], visited, "S", 0);
  return answer;
}
const board = [
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0],
];
const r = solution(board);
console.log(r);
