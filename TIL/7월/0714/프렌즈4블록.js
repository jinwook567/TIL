function check(board, m, n) {
  //y,x
  //m은 y, n은 x
  const left = [
    [0, -1],
    [1, -1],
    [1, 0],
  ];
  const right = [
    [0, 1],
    [1, 1],
    [1, 0],
  ];

  const moves = [left, right];
  const result = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      //무식하게 2번 수행
      if (board[i][j] === 1) continue;
      const now = board[i][j];

      moves.forEach((arr) => {
        let flag = true;
        const temp = [];
        for (let [y, x] of arr) {
          const ny = i + y;
          const nx = j + x;
          temp.push([ny, nx]);
          if (ny < 0 || nx < 0 || nx >= n || ny >= m || board[ny][nx] !== now) {
            flag = false;
            break;
          }
        }

        if (flag) result.push(...temp);
      });
    }
  }

  return result;
}

function arrange(board, m, n) {
  for (let i = 0; i < n; i++) {
    //열을 하나씩 돌음.
    let blankCnt = 0;
    for (let j = m - 1; j >= 0; j--) {
      if (board[j][i] === 1) {
        blankCnt++;
      } else {
        if (blankCnt !== 0) {
          board[j + blankCnt][i] = board[j][i];
          board[j][i] = 1;
        }
      }
    }
  }
}

function solution(m, n, board) {
  board = board.map((s) => s.split(""));
  let count = 0;

  while (true) {
    const arr = check(board, m, n);
    //arr의 길이가 0이라면 더 이상 부술 블록이 없는 것이므로 루프 종료.
    if (arr.length === 0) break;
    arr.forEach(([y, x]) => {
      if (board[y][x] !== 1) count++;
      //만일 빈칸이 아니라면 카운트, arr에 중복이 있기 때문에.
      board[y][x] = 1;
    });
    arrange(board, m, n);
  }
  return count;
}

const board = ["CCBDE", "AAADE", "AAABF", "CCBBF"];

// ("CCBDE");
// ("AAADE");
// ("AAABF");
// ("CCBBF");
const r = solution(4, 5, board);
console.log(r);
