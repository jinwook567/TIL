function solution(N, pyramid) {
  const d = Array(N)
    .fill()
    .map((_, i) => Array(i + 1).fill(0));

  d[0][0] = pyramid[0][0];

  pyramid.forEach((layer, y) =>
    layer.forEach((v, x) => {
      const ny = y + 1;
      const nx_L = x;
      const nx_R = x + 1;

      if (ny >= N) return;

      d[ny][nx_L] = Math.max(d[ny][nx_L], d[y][x] + pyramid[ny][nx_L]);
      d[ny][nx_R] = Math.max(d[ny][nx_R], d[y][x] + pyramid[ny][nx_R]);
    })
  );

  return Math.max(...d[N - 1]);
}

const r = solution(5, [[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]);
