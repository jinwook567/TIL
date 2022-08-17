function step(coordinate, L, R) {
  let count = 0;
  let alliance = [];
  const dy = [1, -1, 0, 0];
  const dx = [0, 0, 1, -1];
  const N = coordinate.length;
  const border = Array(N)
    .fill()
    .map(() => Array(N).fill(false));
  const visited = Array(N)
    .fill()
    .map(() => Array(N).fill(false));

  function dfs(h, w) {
    if (visited[h][w]) return;
    visited[h][w] = true;
    for (let i = 0; i < 4; i++) {
      const ny = h + dy[i];
      const nx = w + dx[i];
      if (ny < 0 || nx < 0 || nx >= N || ny >= N) continue;
      const gap = Math.abs(coordinate[h][w] - coordinate[ny][nx]);
      if (gap >= L && gap <= R) {
        border[h][w] = true;

        if (!alliance.find(([ah, aw]) => ah === h && aw === w)) {
          alliance.push([h, w, count]);
        }
        dfs(ny, nx);
        //alliance.push([ny, nx, count]);
      }
    }
  }

  border.forEach((arr, h) =>
    arr.forEach((v, w) => {
      if (border[h][w]) return;

      //dfs 실행하고 만일 실행 결과에 따라서 true가 된다면, count를 더해라.
      dfs(h, w);
      if (border[h][w]) {
        count++;
      }
    })
  );

  return { alliance, count };
  //몇개의 동맹이 있는지(몇개의 얼음이 얼었는지)
  //같은 동맹끼리의 좌표
}

function solution(N, L, R, coordinate) {
  let answer = 0;

  //count를 포함한 arr에 전부 넣어주고, 같은 count를 전부 찾아서, arr를 초기화 시켜준다.
  //만약에 border가 all false이면 while문 끝나버리면 됨.

  while (true) {
    const { alliance, count } = step(coordinate, L, R);
    if (count === 0) break;

    for (let i = 0; i <= count; i++) {
      const filtered = alliance.filter(([h, w, c]) => c === i);
      const sum = filtered.reduce((acc, cur) => acc + coordinate[cur[0]][cur[1]], 0);
      filtered.forEach(([h, w, c]) => {
        coordinate[h][w] = Math.floor(sum / filtered.length);
      });
    }

    answer++;
  }

  return answer;
}

//문제를 잘못 이해한게 한 단계당 그냥 1번의 인구이동 이라고 하는 듯.

const coordinate = [
  [10, 100, 20, 90],
  [80, 100, 60, 70],
  [70, 20, 30, 40],
  [50, 20, 100, 10],
];

const coordinate2 = [
  [50, 30],
  [30, 40],
];

const coordinate3 = [
  [10, 15, 20],
  [20, 30, 25],
  [40, 22, 10],
];

const r = solution(4, 10, 50, coordinate);
console.log(r);
const r2 = solution(2, 20, 50, coordinate2);
console.log(r2);

const r3 = solution(3, 5, 10, coordinate3);
console.log(r3);
