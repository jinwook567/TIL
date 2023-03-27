function solution(sticker) {
  if (sticker.length <= 2) return Math.max(...sticker);

  const len = sticker.length;
  const d = Array(len - 1).fill(0);

  d[0] = sticker[0];
  d[1] = d[0];
  for (let i = 2; i < d.length; i++) {
    d[i] = Math.max(d[i - 2] + sticker[i], d[i - 1]);
  }
  const max_first = Math.max(...d);

  const d2 = Array(len - 1).fill(0);
  d2[0] = sticker[1];
  d2[1] = Math.max(d2[0], sticker[2]);

  for (let i = 2; i < d.length; i++) {
    d2[i] = Math.max(d2[i - 2] + sticker[i + 1], d2[i - 1]);
  }
  const max_second = Math.max(...d2);

  return Math.max(max_first, max_second);
}

const sticker = [5, 7, 9, 11];
const r = solution(sticker);
console.log(r);
