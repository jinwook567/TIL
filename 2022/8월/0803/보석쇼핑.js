function solution(gems) {
  const all = new Set(gems);
  let start = gems.length - 1;
  let end = gems.length - 1;
  const map = new Map();
  map.set(gems[gems.length - 1], 1);

  let answer = [0, start];

  while (start >= 0) {
    const flag = map.size === all.size;
    if (flag && answer[1] - answer[0] >= start - end) {
      answer = [end, start];
    }

    if (flag || end === 0) {
      if (map.get(gems[start]) === 1) {
        map.delete(gems[start]);
      } else {
        map.set(gems[start], map.get(gems[start]) - 1);
      }
      start--;
    } else {
      end--;
      map.set(gems[end], (map.get(gems[end]) || 0) + 1);
    }
  }
  return [answer[0] + 1, answer[1] + 1];
}

const gems = ["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"];
const r = solution(gems);
console.log(r);
