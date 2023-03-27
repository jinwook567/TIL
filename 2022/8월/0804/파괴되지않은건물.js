function solution(board, skill) {
  const checkBoard = Array(board.length + 1)
    .fill()
    .map((_) => Array(board[0].length + 1).fill(0));

  skill.forEach((s) => {
    const [type, r1, c1, r2, c2, degree] = s;
    console.log(c1);
    checkBoard[r1][c1] += type === 1 ? -degree : degree;
    checkBoard[r1][c2 + 1] += type === 1 ? degree : -degree;
    checkBoard[r2 + 1][c1] += type === 1 ? degree : -degree;
    checkBoard[r2 + 1][c2] += type === 1 ? -degree : degree;
  });
  //가로 한번 돌리고, 세로 한번 돌리고.

  for (let i = 0; i < checkBoard.length; i++) {
    for (let j = 1; j < checkBoard[0].length; j++) {
      checkBoard[i][j] += checkBoard[i][j - 1];
    }
  }

  for (let i = 1; i < checkBoard.length; i++) {
    for (let j = 0; j < checkBoard[0].length; j++) {
      checkBoard[i][j] += checkBoard[i - 1][j];
    }
  }

  let cnt = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      board[i][j] += checkBoard[i][j];
      if (board[i][j] > 0) cnt++;
    }
  }
  return cnt;
}

const board = [
  [5, 5, 5, 5, 5],
  [5, 5, 5, 5, 5],
  [5, 5, 5, 5, 5],
  [5, 5, 5, 5, 5],
];
const skill = [
  [1, 0, 0, 3, 4, 4],
  [1, 2, 0, 2, 3, 2],
  [2, 1, 0, 3, 1, 2],
  [1, 0, 1, 3, 3, 1],
];
const r = solution(board, skill);
console.log(r);
