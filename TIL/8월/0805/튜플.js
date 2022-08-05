//작은 원소부터 하나씩 숫자 제거해나가야함.
function solution(s) {
  const set = new Set();
  s = s.replace(/}/g, "]");
  s = s.replace(/{/g, "[");
  s = JSON.parse(s);
  s.sort((a, b) => a.length - b.length);

  s.forEach((el) => {
    el.forEach((v) => set.add(v));
  });
  return [...set];
}

const s = "{{2},{2,1},{2,1,3},{2,1,3,4}}";
const r = solution(s);
console.log(r);
