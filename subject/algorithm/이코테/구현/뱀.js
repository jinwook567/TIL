function solution(N, applePositions, changeDirections) {
  const directions = [
    [-1, 0], //북
    [0, 1], //동
    [1, 0], //남
    [0, -1], //서
  ];
  //Left -> -1 만큼, Right -> +1만큼 directions 내에서 이동..

  let headDirectionIndex = 1;
  let tailDirectionIndex = 1;

  let headPosition = [0, 0];
  let tailPosition = [0, 0];

  const board = Array(N)
    .fill()
    .map(() => Array(N).fill(0));
  //0은 빈 보드, 1은 뱀 몸통, A는 애플

  board[0][0] = 1;

  for (let [h, w] of applePositions) {
    board[h - 1][w - 1] = "A";
  }

  let time = 0;
  let tailMoveTime = 0;
  while (true) {
    time++;
    const [currentH, currentW] = headPosition;
    let eatApple = false;

    const [h, w] = directions[headDirectionIndex];
    //종료 조건
    if (
      currentH + h >= N ||
      currentW + w >= N ||
      currentH + h < 0 ||
      currentW + w < 0 ||
      board[currentH + h][currentW + w] >= 1
    ) {
      return time;
    }

    if (board[currentH + h][currentW + w] === "A") {
      board[currentH + h][currentW + w] = 1;
      eatApple = true;
    } else {
      board[currentH + h][currentW + w] += 1;
    }
    headPosition = [currentH + h, currentW + w];

    const direction = changeDirections.find(([t, d]) => t === time);

    if (direction) {
      if (direction[1] === "L") {
        headDirectionIndex--;
      } else {
        headDirectionIndex++;
      }
      if (headDirectionIndex === -1) headDirectionIndex = 3;
      if (headDirectionIndex === 4) headDirectionIndex = 0;
    }
    //tailPosition 변경.
    if (!eatApple) {
      const [h, w] = directions[tailDirectionIndex];
      const [tailPositionH, tailPositionW] = tailPosition;
      board[tailPositionH][tailPositionW] -= 1;
      //지워줬다.

      tailPosition = [tailPositionH + h, tailPositionW + w];
      tailMoveTime++;

      const direction = changeDirections.find(([t, d]) => t === tailMoveTime);
      if (direction) {
        if (direction[1] === "L") {
          tailDirectionIndex--;
        } else {
          tailDirectionIndex++;
        }
        if (tailDirectionIndex === -1) tailDirectionIndex = 3;
        if (tailDirectionIndex === 4) tailDirectionIndex = 0;
      }
    }
  }
}

const applePositions = [
  [1, 5],
  [1, 3],
  [1, 2],
  [1, 6],
  [1, 7],
];

const ex1Apple = [
  [3, 4],
  [2, 5],
  [5, 3],
];

const ex1ChangeDirections = [
  [3, "D"],
  [15, "L"],
  [17, "D"],
];

const changeDirections = [
  [8, "D"],
  [10, "D"],
  [11, "D"],
  [13, "L"],
];

function refactoring(N, applePositions, changeDirections) {
  const board = Array(N)
    .fill()
    .map(() => Array(N).fill(0));
  let time = 0;

  const apple = Array(N)
    .fill()
    .map(() => Array(N).fill(0));

  for (let [h, w] of applePositions) {
    apple[h - 1][w - 1] = 1;
  }

  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];
  //동, 남, 서, 북 기준
  let directionIndex = 0;
  let headPosition = [0, 0];
  const routes = [];
  routes.push([0, 0]);
  board[0][0] = 1;
  //위치 정보 저장.

  function turn(direction) {
    if (direction === "L") {
      directionIndex = (directionIndex - 1) % 4;
    } else {
      directionIndex = (directionIndex + 1) % 4;
    }
  }

  while (true) {
    time++;

    //뱀 움직임 구하기.
    const nx = headPosition[0] + dx[directionIndex];
    const ny = headPosition[1] + dy[directionIndex];
    headPosition = [nx, ny];

    if (nx < 0 || nx >= N || ny < 0 || ny >= N || board[ny][nx] >= 1) {
      return time;
    }

    //사과 유무에 따라 꼬리 움직임.
    routes.push([nx, ny]);
    board[ny][nx] = 1;

    //사과를 먹지 않았다면 꼬리 위치 이동.
    if (apple[ny][nx] === 0) {
      const [tx, ty] = routes.shift();
      board[ty][tx] = 0;
    } else {
      apple[ny][nx] = 0;
      //사과 먹은 처리 해줘야함.
    }

    //방향 전환
    if (changeDirections.length === 0) continue;
    const [changeTime, direction] = changeDirections[0];
    if (time === changeTime) {
      turn(directionIndex, direction);
      changeDirections.shift();
    }
  }
}

console.log(refactoring(10, applePositions, changeDirections));
//console.log(refactoring(6, ex1Apple, ex1ChangeDirections));
