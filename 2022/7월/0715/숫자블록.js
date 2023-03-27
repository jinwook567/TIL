function max(num) {
  if (num === 1) return 0;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0 && num / i <= 10000000) return num / i;
  }
  return 1;
}

let flag = false;
for (let i = 2; i < 10 && !flag; i++) {}

function solution(begin, end) {
  const arr = [];
  for (let i = begin; i <= end; i++) {
    arr.push(max(i));
  }
  return arr;
}

const begin = 1;
const end = 10;
const r = solution(begin, end);

//본인에 대해서 나누기 2를 한 것이 가장 큰 값.
//홀수면 3을 나눈다.
//소수라면 1이다.
console.log(r);
