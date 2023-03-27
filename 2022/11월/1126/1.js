function checkOuter(square) {
  const n = square.length;

  for (let i = 0; i < n; i++) {
    if (square[0][i] !== "#") return false;
    if (square[n - 1][i] !== "#") return false;
  }

  for (let i = 0; i < n; i++) {
    if (square[i][0] !== "#") return false;
    if (square[i][n - 1] !== "#") return false;
  }

  return true;
}

function checkPersent(square, low, high) {
  const n = square.length;

  let blackCnt = 0;
  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < n - 1; j++) {
      if (square[i][j] === "#") blackCnt++;
    }
  }

  if ((low / 100) * (n - 2) * (n - 2) <= blackCnt && k < (high / 100) * (n - 2) * (n - 2))
    return true;
  else false;
}

function solution(low, high, img) {
  const row = img.length;
  const column = img[0].length;
  const n = Math.min(row, column);

  for (let i = 3; i <= n; i++) {
    const arr = [];
    for (let j = 0; j + i < column; j++) {
      for (let k = 0; k + i < row; k++) {
        //사각형 안에 원소 채워넣는 알고리즘..
      }
    }
    console.log(arr);
  }
}

const low = 25;
const high = 51;
const img = [
  ".########......",
  ".####...#......",
  ".#.####.#.#####",
  ".#.#..#.#.#..##",
  ".#.##.#.#.#...#",
  ".#.####.#.#...#",
  ".#....###.#####",
  ".########......",
];

const r = solution(low, high, img);
console.log({ r });
