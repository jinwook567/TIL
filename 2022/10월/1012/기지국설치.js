function solution(n, stations, w) {
  let current = 1;
  let before = 1;

  let answer = 0;
  const area = (w) => w * 2 + 1;

  for (let i = 0; i < stations.length; i++) {
    current = stations[i] - w;

    const diff = current - before;

    if (diff > 0) {
      answer += Math.ceil(diff / area(w));
    }

    before = stations[i] + w + 1;
  }

  if (before <= n) {
    answer += Math.ceil((n - before + 1) / area(w));
  }
  return answer;
}

const n = 16;
const stations = [9];
const w = 2;
const r = solution(n, stations, w);
console.log(r);
