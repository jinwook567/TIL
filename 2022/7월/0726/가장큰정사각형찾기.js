function check(board, i, j, size) {
  for (let k = 0; k < size; k++) {
    for (let l = 0; l < size; l++) {
      if (board[i + k][j + l] !== 1) return false;
    }
  }
  return true;
}

function solution(board) {
  const row = board.length;
  const column = board[0].length;

  let cnt = 0;
  while (true) {
    let flag = false;

    //카운팅 할 때 flag true이면 넘어간다.
    for (let i = 0; i < row - cnt + 1; i++) {
      if (flag) break;
      for (let j = 0; j < column - cnt + 1; j++) {
        const isSquare = check(board, i, j, cnt, d[i][j]);
        if (isSquare) {
          flag = true;
        }
      }
    }

    if (!flag) break;
    cnt++;
  }

  return (cnt - 1) * (cnt - 1);
}

const board = [
  [0, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [0, 0, 1, 0],
];

const r = solution(board);
console.log({ r });
