const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let answer = Infinity;

//간단하게 시간 복잡도..visited를 못가니까 줄어들긴함.
function dfs(board, winner, loser, is_a_win, turn, cnt) {
  const copyBoard = JSON.parse(JSON.stringify(board));
  const row = board.length;
  const column = board[0].length;
  const [wy, wx] = winner;
  const [ly, lx] = loser;

  if (turn === "winner") {
    if (copyBoard[wy][wx] === 0) return;
    copyBoard[wy][wx] = 0;

    let minD = Infinity;
    const next_positions = [];

    for (let i = 0; i < 4; i++) {
      const ny = wy + dy[i];
      const nx = wx + dx[i];
      if (ny < 0 || nx < 0 || nx >= column || ny >= row || board[ny][nx] === 0) continue;
      minD = Math.min(minD, Math.abs(ny - ly) + Math.abs(nx - lx));
      if (minD === Math.abs(ny - ly) + Math.abs(nx - lx)) {
        next_positions.push({ p: [ny, nx], v: minD });
      }
    }
    //최댓값만 뽑아야해..

    next_positions
      .filter((el) => el.v === minD)
      .forEach((next) => {
        dfs(copyBoard, next.p, loser, is_a_win, "loser", cnt + 1);
      });

    //갈 곳이 한군데도 없다면 잘못된 것이므로 별도의 처리를 해주지 않는다. 함수 종결
  } else {
    //내 자리가 0이라면 끝난다.
    if (copyBoard[ly][lx] === 0) {
      answer = Math.min(answer, cnt);
      return;
    }
    copyBoard[ly][lx] = 0;
    let maxD = -Infinity;
    const next_positions = [];

    let flag = false;
    for (let i = 0; i < 4; i++) {
      const ny = ly + dy[i];
      const nx = lx + dx[i];
      if (ny < 0 || nx < 0 || nx >= column || ny >= row || board[ny][nx] === 0) continue;
      flag = true;

      maxD = Math.max(maxD, Math.abs(ny - wy) + Math.abs(nx - wx));
      if (maxD === Math.abs(ny - wy) + Math.abs(nx - wx)) {
        next_positions.push({ p: [ny, nx], v: maxD });
      }
    }
    //내가 더이상 갈곳이 없으면 끝난다.
    if (!flag) {
      answer = Math.min(answer, cnt);
      return;
    }
    next_positions
      .filter((el) => el.v === maxD)
      .forEach((next) => {
        dfs(copyBoard, winner, next.p, is_a_win, "winner", cnt + 1);
      });
  }
}

function solution(board, aloc, bloc) {
  dfs(board, aloc, bloc, true, "winner", 0);
  dfs(board, bloc, aloc, false, "loser", 0);
  return answer;
}

const board = [[1, 1, 1, 1, 1]];
const aloc = [0, 0];
const bloc = [0, 4];
const r = solution(board, aloc, bloc);
console.log(r);

function match(board, winner, loser, is_a_win) {
  board = JSON.parse(JSON.stringify(board));
  const row = board.length;
  const column = board[0].length;

  let i = 0;
  let wloc = winner;
  let lloc = loser;

  let turn = is_a_win ? "winner" : "loser";
  while (true) {
    if (turn === "winner") {
      const [wy, wx] = wloc;

      //내 자리가 0이라면 그것은 무효다.
      if (board[wy][wx] === 0) return Infinity;

      let minD = Infinity;
      let next_position = wloc;
      for (let i = 0; i < 4; i++) {
        const ny = wy + dy[i];
        const nx = wx + dx[i];
        if (ny < 0 || nx < 0 || nx >= column || ny >= row || board[ny][nx] === 0) continue;

        const [ly, lx] = lloc;
        minD = Math.min(minD, Math.abs(ny - ly) + Math.abs(nx - lx));
        if (minD === Math.abs(ny - ly) + Math.abs(nx - lx)) next_position = [ny, nx];
      }
      //전부 갈 곳이 한군데도 없다면 이는 잘못된 것이고 무한대 값을 리턴한다.
      if (minD === Infinity) return Infinity;

      board[wloc[0]][wloc[1]] = 0;
      wloc = next_position;
      turn = "loser";
    } else {
      //loser
      const [ly, lx] = lloc;

      //내 자리가 0이라면 끝난다.
      if (board[ly][lx] === 0) return i;

      let maxD = -Infinity;
      let next_position = lloc;
      for (let i = 0; i < 4; i++) {
        const ny = ly + dy[i];
        const nx = lx + dx[i];
        if (ny < 0 || nx < 0 || nx >= column || ny >= row || board[ny][nx] === 0) continue;

        const [wy, wc] = wloc;
        maxD = Math.max(maxD, Math.abs(ny - wy) + Math.abs(nx - wc));
        if (maxD === Math.abs(ny - wy) + Math.abs(nx - wc)) next_position = [ny, nx];
      }
      //내가 더이상 갈곳이 없으면 끝난다.
      if (maxD === -Infinity) return i;

      board[lloc[0]][lloc[1]] = 0;
      lloc = next_position;
      turn = "winner";
    }
    i++;
  }
}
