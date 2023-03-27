function solution(n) {
  const conversion = [...n.toString(2)];
  const cnt = conversion.reduce((acc, cur) => (cur === "1" ? ++acc : acc), 0);

  let i = n + 1;
  while (true) {
    const nCnt = [...i.toString(2)].reduce((acc, cur) => (cur === "1" ? ++acc : acc), 0);
    if (cnt === nCnt) break;
    i++;
  }
  return i;
}

function solution(n) {}

const n = 78;
const r = solution(n);
console.log(r);
