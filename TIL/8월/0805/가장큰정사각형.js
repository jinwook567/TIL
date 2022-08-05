function solution(board) {
  const marking = Array(board.length)
    .fill()
    .map((_) => Array(board[0].length).fill(0));

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === 1) marking[i][j] = 1;
    }
  }

  for (let i = 1; i < board.length; i++) {
    for (let j = 1; j < board[0].length; j++) {
      if (
        board[i - 1][j] === 1 &&
        board[i - 1][j - 1] === 1 &&
        board[i][j - 1] === 1 &&
        board[i][j] === 1
      ) {
        marking[i][j] = Math.min(marking[i - 1][j], marking[i - 1][j - 1], marking[i][j - 1]) + 1;
      }
    }
  }

  let max = 0;
  marking.forEach((arr) => arr.forEach((v) => (max = Math.max(max, v))));

  return max * max;
}

const board = [
  [1, 0],
  [0, 0],
];
const r = solution(board);
console.log(r);
