const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const answer = [];

//간단하게 시간 복잡도..visited를 못가니까 줄어들긴함.
function dfs(board, winner, loser, is_a_win, turn, winnerCnt, loserCnt) {
  const copyBoard = JSON.parse(JSON.stringify(board));
  const row = board.length;
  const column = board[0].length;
  const [wy, wx] = winner;
  const [ly, lx] = loser;

  if (turn === "winner") {
    if (copyBoard[wy][wx] === 0) return;
    copyBoard[wy][wx] = 0;

    for (let i = 0; i < 4; i++) {
      const ny = wy + dy[i];
      const nx = wx + dx[i];
      if (ny < 0 || nx < 0 || nx >= column || ny >= row || board[ny][nx] === 0) continue;
      dfs(copyBoard, [ny, nx], loser, is_a_win, "loser", winnerCnt + 1, loserCnt);
    }

    //갈 곳이 한군데도 없다면 잘못된 것이므로 별도의 처리를 해주지 않는다. 함수 종결
  } else {
    //내 자리가 0이라면 끝난다.
    if (copyBoard[ly][lx] === 0) {
      answer.push({ winnerCnt, loserCnt });
      return;
    }
    copyBoard[ly][lx] = 0;

    let flag = false;
    for (let i = 0; i < 4; i++) {
      const ny = ly + dy[i];
      const nx = lx + dx[i];
      if (ny < 0 || nx < 0 || nx >= column || ny >= row || board[ny][nx] === 0) continue;
      flag = true;

      dfs(copyBoard, winner, [ny, nx], is_a_win, "winner", winnerCnt, loserCnt + 1);
    }
    //내가 더이상 갈곳이 없으면 끝난다.
    if (!flag) {
      //   if (winnerCnt === 3 && loserCnt === 3) {
      //     console.log(copyBoard);
      //   }
      answer.push({ winnerCnt, loserCnt });
      return;
    }
  }
}

function solution(board, aloc, bloc) {
  dfs(board, aloc, bloc, true, "winner", 0, 0);
  dfs(board, bloc, aloc, false, "loser", 0, 0);
  answer.sort((a, b) => {
    if (a.winnerCnt === b.winnerCnt) {
      return a.loserCnt - b.loserCnt;
    }
    return b.winnerCnt - a.winnerCnt;
  });
  return answer[0].winnerCnt + answer[0].loserCnt;
}

const board = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
];
[
  [1, 0, 0],
  [0, 0, 0],
  [0, 0, 1],
];
const aloc = [1, 0];
const bloc = [1, 2];
const r = solution(board, aloc, bloc);
console.log(r);
//많이 가고 적게 가는데.. 이를 어떻게 판별해서 리턴하면 됩니까..
