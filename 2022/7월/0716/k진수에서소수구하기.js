function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function solution(n, k) {
  const numbers = n.toString(k).split(0);

  let cnt = 0;
  numbers.forEach((v) => {
    if (isPrime(+v)) {
      cnt++;
    }
  });
  return cnt;
}

const [n, k] = [110011, 10];
const r = solution(n, k);
console.log(r);
