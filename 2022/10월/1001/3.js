//완전 탐색으로 문제 풀어야함.

//y,x
const map = {
  N: [-1, 0],
  S: [1, 0],
  E: [0, 1],
  W: [-1, 0],
};

const match = {
  N: "S",
  S: "N",
  E: "W",
  W: "E",
};

const directions = ["N", "S", "E", "W"];

function check(train) {
  for (let i = 0; i < train.length; i++) {
    for (let j = 0; j < train[0].length; j++) {
      const direction = train[i].charAt(j);
      const [dy, dx] = map[direction];
      const ny = dy + i;
      const nx = dx + j;
      if (ny >= train.length || nx >= train[0].length || ny < 0 || nx < 0) continue;

      const opposite = train[ny].charAt(nx);
      if (match[direction] === opposite) {
        return false;
      }
    }
  }
  return true;
}

function solution(train) {
  let answer = Infinity;
  function dfs(changedTrain, visited) {
    console.log(visited);
    if (check(changedTrain)) {
      answer = Math.min(answer, visited.length);
      return;
    }

    for (let i = 0; i < train.length; i++) {
      for (let j = 0; j < train[0].length; j++) {
        if (visited.find((v) => v[0] === i && v[1] === j)) continue;
        const copy = changedTrain.map((v) => [...v]);
        const originDirection = copy[i][j];
        const otherDirections = directions.filter((v) => v !== copy[i][j]);
        for (let direction of otherDirections) {
          copy[i][j] = direction;
          dfs(
            copy.map((v) => v.join("")),
            [...visited, [i, j]]
          );
          copy[i][j] = originDirection;
        }
      }
    }
  }
  dfs(train, []);
  //dfs 수행
  return answer;
}

console.log(3 ** 16);

const train = ["ESS", "EEW", "NNW"];
const r = solution(train);
console.log(r);
