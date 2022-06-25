let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim();

function solution(example) {
  const s = `${example}`;
  const len = s.length;

  let left = 0;
  let right = 0;
  for (let i = 0; i < len / 2; i++) {
    left += Number(s.charAt(i));
  }

  for (let i = len / 2; i < len; i++) {
    right += Number(s.charAt(i));
  }

  return left === right ? "LUCKY" : "READY";
}

const r = solution(example);
console.log(r);
