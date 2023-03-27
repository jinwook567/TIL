function solution(line) {
  const cross = [];

  //모든 교점에 대해서 정수인 부분만 도출
  for (let i = 0; i < line.length; i++) {
    for (let j = i + 1; j < line.length; j++) {
      const [A, B, E] = line[i];
      const [C, D, F] = line[j];

      //교점 없음
      if (A / C === B / D) continue;

      const x = (B * F - E * D) / (A * D - B * C);
      const y = (E * C - A * F) / (A * D - B * C);
      if (Number.isInteger(x) && Number.isInteger(y)) cross.push([x, y]);
    }
  }

  if (cross.length === 1) return ["*"];

  //x 최소, x 최대
  //y 최소, y 최대
  let min_x = Infinity;
  let max_x = -Infinity;
  let min_y = Infinity;
  let max_y = -Infinity;

  for (let i = 0; i < cross.length; i++) {
    const [x, y] = cross[i];
    min_x = Math.min(min_x, x);
    max_x = Math.max(max_x, x);
    min_y = Math.min(min_y, y);
    max_y = Math.max(max_y, y);
  }

  const len_x = max_x - min_x + 1;
  const len_y = max_y - min_y + 1;

  const answer = Array(len_y)
    .fill()
    .map(() => Array(len_x).fill("."));

  cross.forEach((v) => {
    if (min_x < 0) v[0] += -min_x;
    else v[0] -= min_x;

    if (min_y < 0) v[1] += -min_y;
    else v[1] -= min_y;

    answer[v[1]][v[0]] = "*";
  });
  return answer.map((v) => v.join("")).reverse();
}

const line = [
  [2, -1, 4],
  [-2, -1, 4],
  [0, -1, 1],
  [5, -8, -12],
  [5, 8, 12],
];
const r = solution(line);
console.log(r);
