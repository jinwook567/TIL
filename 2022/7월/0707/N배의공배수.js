//전부 나눠질 수 있는지 체크하는 함수
const canDivide = (arr, i) => arr.every((v) => v % i === 0);
//모든 원소가 서로소인지 체크하는 함수
const isCoPrime = (arr) => {
  const max = Math.max(...arr);
  for (let i = 2; i <= max; i++) {
    let cnt = 0;
    arr.forEach((v) => {
      if (v % i === 0) cnt++;
    });
    if (cnt >= 2) return false;
  }
  return true;
};

function solution(arr) {
  let gcd = 1;
  const max = Math.max(...arr);

  for (let i = 1; i <= max; i++) {
    if (canDivide(arr, i)) {
      const divided = arr.map((v) => v / i);
      if (isCoPrime(divided)) gcd = i;
    }
  }
  return arr.reduce((acc, cur) => acc * cur, 1) / gcd ** (arr.length - 1);
}

const arr = [2, 6, 8, 14];
const arr2 = [3, 4, 9, 16];
//144
//const r = solution(arr);
const r2 = solution(arr2);

//모두 공통되는 것이 아니라, 일부만 공통되도 되는 것..
function getGCD(a, b) {
  if (b === 0) return a;
  [a, b] = [a > b ? a : b, a > b ? b : a];

  return getGCD(b, a % b);
}

function solution2(arr) {
  return arr.reduce((acc, cur) => (acc * cur) / getGCD(acc, cur), 1);
}

const r = solution2(arr);
console.log({ r });
