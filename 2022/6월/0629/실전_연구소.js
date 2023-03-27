let fs = require("fs");
let input = fs.readFileSync("./연구소.txt").toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);

const coordinate = [];
const blanks = [];

for (let i = 0; i < n; i++) {
  const r = input.shift().split(" ").map(Number);
  for (let j = 0; j < r.length; j++) {
    if (r[j] === 0) blanks.push([i, j]);
  }
  coordinate.push(r);
}

function getCombination(arr, n) {
  const result = [];
  if (n === 1) return arr.map((el) => [el]);

  arr.forEach((v, i) => {
    const rest = arr.slice(i + 1);
    const combination = getCombination(rest, n - 1);
    const attached = combination.map((el) => [v, ...el]);
    result.push(...attached);
  });
  return result;
}

function solution(coordinate, blanks) {
  const combination = getCombination(blanks, 3);
  console.log(combination);

  let safe = 0;

  const dy = [1, -1, 0, 0];
  const dx = [0, 0, -1, 1];

  function dfs(coordinate, position) {
    const [y, x] = position;
    if (coordinate[y][x] === 1) return;

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];
      if (ny < 0 || nx < 0 || ny >= n || nx >= m) continue;
      if (coordinate[ny][nx] === 0 && coordinate[y][x] === 2) {
        coordinate[ny][nx] = 2;
        dfs(coordinate, [ny, nx]);
      }
    }
  }

  combination.forEach((p) => {
    const newCoordinate = JSON.parse(JSON.stringify(coordinate));
    p.forEach(([y, x]) => {
      newCoordinate[y][x] = 1;
    });

    //전체에 대하여 실행해야지.
    newCoordinate.forEach((arr, y) =>
      arr.forEach((v, x) => {
        dfs(newCoordinate, [y, x]);
      })
    );

    let cnt = 0;
    newCoordinate.forEach((arr, y) =>
      arr.forEach((v, x) => {
        if (v === 0) cnt++;
      })
    );

    safe = Math.max(safe, cnt);
  });
  console.log(safe);
}

solution(coordinate, blanks);
