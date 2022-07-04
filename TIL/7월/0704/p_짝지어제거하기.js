//이 방식은 시간 초과가 남.
function solution(s) {
  let i = 0;
  while (i <= s.length - 2) {
    if (s.charAt(i) === s.charAt(i + 1)) {
      const before = s.slice(0, i);
      const after = s.slice(i + 2);
      s = before + after;
      i = 0;
    } else {
      i++;
    }
  }
  return s.length === 0 ? 1 : 0;
}

const s = "baabaa";
const r = solution(s);
console.log(r);

//dog fight
