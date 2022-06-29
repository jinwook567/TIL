let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, L, R] = input.shift().split(" ").map(Number);
const coordinate = [];
for (let i = 0; i < N; i++) {
  coordinate.push(input.shift().split(" ").map(Number));
}

const dy = [1, -1, 0, 0];
const dx = [0, 0, -1, 1];

function solution(N, R, L, coordinate) {
  //union에는 연합 정보를 숫자로, 그리고 방문 처리를 넣어줌.
  function dfs(coordinate, union, position, cnt) {
    const [y, x] = position;
    for (let i = 0; i < 4; i++) {
      const ny = dy[i] + y;
      const nx = dx[i] + x;
      if (ny < 0 || nx < 0 || nx >= N || ny >= N) continue;
      if (union[ny][nx] !== 0) continue;

      union[ny][nx] = "V";
      //방문 처리 (연합 유무에 관계없이 해줘야함.)
      const calculated = coordinate[ny][nx] - coordinate[y][x];
      if (calculated >= L && calculated <= R) {
        //새로운 연합이 생겼다면, 기존에 연합이라면,
        if (union[y][x] === 0) {
          cnt++;
          union[y][x] = cnt;
          union[ny][nx] = cnt;
          dfs(coordinate, union, [ny, nx], cnt);
        } else {
          union[ny][nx] = union[y][x];
          dfs(coordinate, union, [ny, nx], cnt);
        }
      }
    }
  }

  let answer = 0;

  function check(union) {
    return union.every((arr) => arr.every((v) => v === 0));
  }

  while (true) {
    answer++;
    //union 정의하고, union check 했을 떄 전부 0이라면 return 한다.
  }
}

//while을 돌면서 count를 늘려가며 dfs 시행하고, 만일 연합의 갯수가 없다면 그 떄 리턴한다.

solution(N, R, L, coordinate);
