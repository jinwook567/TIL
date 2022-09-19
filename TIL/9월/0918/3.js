//정답 조건
//1. 바로 지뢰를 눌렀을 경우 해당 지뢰를 X, 나머지는 M
//2. 활성화된 빈 단추는 B로 표시
//3. 지뢰가 있는 단추와, 아직 열리지 않은 단추는 모두 E로 채운다.

//전략
//클릭을 했을 때 만약에 주변 8개에 지뢰가 없다면 전부 열리게 된다. 이 떄 열린 단추에 대해서도 주변 8개에 지뢰가 없다면 재귀적으로 똑같이 열리게 된다.
//클릭할 좌표들을 뱉어버린다. OK!! 그리고 원본 board를 교체해주는 알고리즘을 짜면 된다.
//그리고 8개의 면에 대해서 (내 인근) 지뢰의 개수를 받아오는 함수를 작성해야 한다.
//주변 8개의 좌표에 대해서도 받아오는 함수가 필요하네..

const dy = [-1, -1, -1, 0, 0, 1, 1, 1];
const dx = [-1, 0, 1, -1, 1, -1, 0, 1];

const getNearMineCnt = (board, y, x) => {
  let cnt = 0;

  for (let i = 0; i < dy.length; i++) {
    const ny = dy[i] + y;
    const nx = dx[i] + x;
    if (ny >= 0 && ny < board.length && nx >= 0 && nx < board[0].length) {
      if (board[ny][nx] === "M") cnt++;
    }
  }
  return cnt;
};

const getNearPositions = (board, y, x) => {
  const arr = [];
  for (let i = 0; i < dy.length; i++) {
    const ny = dy[i] + y;
    const nx = dx[i] + x;
    if (ny >= 0 && ny < board.length && nx >= 0 && nx < board[0].length) {
      arr.push([ny, nx]);
    }
  }
  return arr;
};

function dfs(board, copyBoard, y, x) {
  const mineCnt = getNearMineCnt(board, y, x);
  copyBoard[y][x] = mineCnt || "B";

  if (mineCnt === 0) {
    const positions = getNearPositions(board, y, x);
    positions.forEach(([ny, nx]) => {
      if (copyBoard[ny][nx] === "B") return;
      dfs(board, copyBoard, ny, nx);
    });
  }
}

function solution(board, y, x) {
  board = board.map((v) => [...v]);

  //첫 번째 누른게 지뢰일 경우
  if (board[y][x] === "M") {
    board[y][x] = "X";
    return board.map((v) => v.join(""));
  }

  let copyBoard = JSON.parse(JSON.stringify(board));
  copyBoard = copyBoard.map((v) => [...v].map((el) => "E"));
  dfs(board, copyBoard, y, x);
  return copyBoard.map((v) => v.join(""));
}

const board = ["EEEEE", "EEMEE", "EEEEE", "EEEEE"];
const y = 2;
const x = 0;
const r = solution(board, y, x);
console.log(r);
