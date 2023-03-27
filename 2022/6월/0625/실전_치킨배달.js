function combination(arr, n) {
  const result = [];

  if (n === 1) return arr.map((v) => [v]);

  arr.forEach((v, i) => {
    const rest = arr.slice(i + 1);
    const combi = combination(rest, n - 1);
    const attached = combi.map((k) => [v, ...k]);
    result.push(...attached);
  });
  return result;
}

function solution(coordinate, M) {
  const chicken = [];
  coordinate.forEach((arr, y) =>
    arr.forEach((v, x) => {
      if (v === 2) chicken.push([y, x]);
    })
  );

  let answer = Infinity;

  combination(chicken, M).forEach((positions) => {
    let total = 0;
    coordinate.forEach((acc, y) =>
      acc.forEach((v, x) => {
        if (v === 1) {
          let distance = Infinity;
          positions.forEach((p) => {
            const [py, px] = p;
            distance = Math.min(distance, Math.abs(py - y) + Math.abs(px - x));
          });
          total += distance;
        }
      })
    );
    answer = Math.min(answer, total);
  });
  return answer;
}

const c = [
  [0, 0, 1, 0, 0],
  [0, 0, 2, 0, 1],
  [0, 1, 2, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 2],
];

const r = solution(c, 3);
console.log(r);
