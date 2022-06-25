function solution(N, example) {
  const dx = {
    R: 1,
    L: -1,
    U: 0,
    D: 0,
  };

  const dy = {
    R: 0,
    L: 0,
    U: -1,
    D: 1,
  };
  let position = [1, 1];
  //y,x

  for (let direction of example) {
    console.log(position);
    const nx = position[1] + dx[direction];
    const ny = position[0] + dy[direction];

    if (nx < 1 || ny < 1 || nx >= N || ny >= N) continue;
    position = [ny, nx];
  }
  return position;
  //y,x로 리턴.
}

const N = 5;
const example = ["R", "R", "R", "U", "D", "D"];
const r = solution(N, example);
console.log(r);
