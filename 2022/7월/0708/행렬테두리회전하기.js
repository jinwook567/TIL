function rotate(dimension, x1, y1, x2, y2) {
  let temp = dimension[x1][y1];
  let [x, y] = [x1, y1];
  //x가 행, y가 열
  let min = temp;

  for (let i = y1 + 1; i <= y2; i++) {
    y++;
    [dimension[x][y], temp] = [temp, dimension[x][y]];
    min = Math.min(min, temp);
  }

  for (let i = x1 + 1; i <= x2; i++) {
    x++;
    [dimension[x][y], temp] = [temp, dimension[x][y]];
    min = Math.min(min, temp);
  }

  for (let i = y2 - 1; i >= y1; i--) {
    y--;
    [dimension[x][y], temp] = [temp, dimension[x][y]];
    min = Math.min(min, temp);
  }

  for (let i = x2 - 1; i >= x1; i--) {
    x--;
    [dimension[x][y], temp] = [temp, dimension[x][y]];
    min = Math.min(min, temp);
  }
  return min;
}

function solution(rows, columns, queries) {
  let dimension = Array(rows)
    .fill()
    .map(() => Array(columns).fill(0));

  let k = 1;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      dimension[i][j] = k;
      k++;
    }
  }

  const answer = [];
  queries.forEach((q) => {
    const nq = q.map((v) => v - 1);
    const min = rotate(dimension, ...nq);
    answer.push(min);
  });
  return answer;
}

const queries = [
  [2, 2, 5, 4],
  [3, 3, 6, 6],
  [5, 1, 6, 3],
];
const r = solution(6, 6, queries);
console.log({ r });
