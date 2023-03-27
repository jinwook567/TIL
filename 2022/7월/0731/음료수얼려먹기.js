function solution(board) {
  const row = board.length;
  const column = board[0].length;
  function dfs(board, y, x) {
    if (x < 0 || y < 0 || y >= row || x >= column) return false;
    if (board[y][x] === 1) return false;
    board[y][x] = 1;

    dfs(board, y + 1, x);
    dfs(board, y - 1, x);
    dfs(board, y, x + 1);
    dfs(board, y, x - 1);
    return true;
  }

  let cnt = 0;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (dfs(board, i, j)) cnt++;
    }
  }
  return cnt;
}

const board = [
  [0, 0, 1, 1, 0],
  [0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 1, 0],
];

console.log(solution(board));
