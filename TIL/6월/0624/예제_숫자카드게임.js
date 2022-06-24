function solution(N, M, coordinate) {
  let result = 0;
  for (let i = 0; i < N; i++) {
    result = Math.max(result, Math.min(...coordinate[i]));
  }
  console.log(result);
}

solution(3, 3, [
  [3, 1, 2],
  [4, 1, 4],
  [2, 2, 2],
]);
