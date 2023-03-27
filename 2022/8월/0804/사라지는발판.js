//이기는 경우
//1. 움직일 곳이 없을 때
//2. 내가 발판을 나가면서 이 친구가 죽을 때
const dy = [0, 0, -1, 1];
const dx = [1, -1, 0, 0];
let aMax = 0;
let bMax = 0;
let aWin = new Set();
let bWin = new Set();
let history = [];

//이기는 전략으로 움직이기. (절댓값이 최대한 적도록 움직이기)
function getDistance(loc1, loc2) {
  const [y1, x1] = loc1;
  const [y2, x2] = loc2;
  return Math.abs(y1 - y2) + Math.abs(x1 - x2);
}

function dfs(board, aloc, bloc, count, turn, winner) {
  history.push({ board, aloc, bloc, count, turn, winner });
  let loc = turn === "a" ? aloc : bloc;
  //종료 조건 1. 내 발판이 없을 경우
  const [ay, ax] = aloc;
  const [by, bx] = bloc;

  if (board[ay][ax] === 0 || board[by][bx] === 0) {
    if (winner === "a") {
      aWin.add(turn === "a" ? "b" : "a");
      aMax = Math.max(aMax, count);
    }
    if (winner === "b") {
      bWin.add(turn === "a" ? "b" : "a");
      bMax = Math.max(bMax, count);
    }
    return;
  }

  const [y, x] = loc;
  let flag = false;
  let dist = Infinity;
  let dist_position;
  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];
    if (ny < 0 || nx < 0 || ny >= board.length || nx >= board[0].length) continue;
    if (board[ny][nx] === 0) continue;
    //그게 아닐 경우 들어감.
    dist = Math.min(dist, getDistance(loc, [ny, nx]));
    if (dist === getDistance(loc, [ny, nx])) dist_position = [ny, nx];

    flag = true;
    if (turn !== winner) {
      console.log(ny, nx, y, x, "hihihi", turn, winner);
      const newBoard = JSON.parse(JSON.stringify(board));
      newBoard[y][x] = 0;
      dfs(
        newBoard,
        turn === "a" ? [ny, nx] : aloc,
        turn === "b" ? [ny, nx] : bloc,
        count + 1,
        turn === "a" ? "b" : "a",
        winner
      );
    }
  }

  //flag가 false라면 종료조건임. 갈 곳이 없다는 뜻이므로
  if (!flag) {
    if (turn !== winner) {
      if (winner === "a") {
        aWin.add(turn === "a" ? "b" : "a");
        aMax = Math.max(aMax, count);
      }
      if (winner === "b") {
        bWin.add(turn === "a" ? "b" : "a");
        bMax = Math.max(bMax, count);
      }
      return true;
    } else {
      return false;
    }
  }

  //나의 turn이 winner인 경우에는 이기는 전략으로만 이동함.
  if (turn === winner) {
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[dist_position[0]][dist_position[1]] = 0;
    dfs(
      newBoard,
      turn === "a" ? dist_position : aloc,
      turn === "b" ? dist_position : bloc,
      count + 1,
      turn === "a" ? "b" : "a",
      winner
    );
  }
}

function solution(board, aloc, bloc) {
  //이길 수 밖에 없는 플레이어가 이길 때, count의 최댓값을 알면 되는 것인가?!
  dfs(board, aloc, bloc, 0, "a", "a");
  dfs(board, aloc, bloc, 0, "a", "b");

  //누가 winner인지 판단.
  console.log({ aWin, bWin, aMax, bMax });
  console.log(history);

  return aWin.size === 1 ? aMax : bMax;
  //b가 무조건 이긴다.
}

const board = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

const aloc = [1, 0];
const bloc = [1, 2];
const r = solution(board, aloc, bloc);
console.log(r);

[
  [1, 1, 1],
  [0, 0, 0],
  [1, 1, 1],
];
[(0, 1)][(1, 1)];
