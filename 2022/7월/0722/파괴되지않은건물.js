function solution(board, skill) {
  //[type, r1,c1,r2,c2,degree]
  //type 1 공격, 2 회복
  //대각선만 체크를 해놓고 마지막에 한번에 다 더해버리면..?! -> 이 개념이 맞다.. 구간합
  const row = board.length;
  const column = board[0].length;

  const newBoard = Array(row + 1)
    .fill()
    .map(() => Array(column + 1).fill(0));
  //newBoard에 플러스 마이너스만 넣어두고 마지막에 board랑 더한다.

  skill.forEach(([type, r1, c1, r2, c2, degree]) => {
    newBoard[r1][c1] += type === 1 ? -degree : degree;
    newBoard[r2 + 1][c1] += type === 1 ? degree : -degree;
    newBoard[r1][c2 + 1] += type === 1 ? degree : -degree;
    newBoard[r2 + 1][c2 + 1] += type === 1 ? -degree : degree;
  });

  //가로 구간합
  for (let i = 0; i <= row; i++) {
    for (let j = 1; j <= column; j++) {
      newBoard[i][j] += newBoard[i][j - 1];
    }
  }

  //세로 구간합
  for (let i = 1; i <= row; i++) {
    for (let j = 0; j <= column; j++) {
      newBoard[i][j] += newBoard[i - 1][j];
    }
  }

  let cnt = 0;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      board[i][j] += newBoard[i][j];
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
