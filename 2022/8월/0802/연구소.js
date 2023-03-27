const board = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1],
  [0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0],
];

const dy = [1, -1, 0, 0];
const dx = [0, 0, -1, 1];

function virus(board, position) {
  const [y, x] = position;
  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];
    if (ny < 0 || nx < 0 || nx >= board.length || ny >= board.length) continue;
    if (board[ny][nx] !== 0) continue;
    board[ny][nx] = 2;
    virus(board, [ny, nx]);
  }
}
virus(board, [1, 1]);
