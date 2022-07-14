const dy = [-1, 1, 0, 0];
const dx = [0, 0, 1, -1];

function solution(places) {
  return places.map((place, i) => {
    place = place.map((s) => s.split(""));
    let flag = false;
    function dfs(y, x, step, visited, place, position) {
      if (place[y][x] === "P" && !(position[0] === y && position[1] === x)) {
        flag = true;
        return;
      }

      if (step === 2) return;

      //여기서 visited가 안했다면 넣어주기.
      for (let i = 0; i < 4; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];
        if (ny >= 5 || nx >= 5 || ny < 0 || nx < 0) continue;
        if (visited[ny][nx]) continue;
        if (place[ny][nx] === "X") continue;
        const newVisited = JSON.parse(JSON.stringify(visited));
        newVisited[ny][nx] = true;
        dfs(ny, nx, step + 1, newVisited, place, position);
      }
    }

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (place[i][j] === "P") {
          const visited = Array(5)
            .fill()
            .map(() => Array(5).fill(false));
          visited[i][j] = true;

          dfs(i, j, 0, visited, place, [i, j]);
        }
      }
    }
    return flag ? 0 : 1;
  });
}

const places = [
  ["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"],
  ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"],
  ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"],
  ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"],
  ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"],
];

const l = ["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"].map((v) => v.split(""));

[
  ["P", "O", "O", "O", "P"],
  ["O", "X", "X", "O", "X"],
  ["O", "P", "X", "P", "X"],
  ["O", "O", "X", "O", "X"],
  ["P", "O", "X", "X", "P"],
];

const r = solution(places);
console.log(r);
