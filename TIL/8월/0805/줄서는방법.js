function solution(n, k) {
  const answer = [];
  let numbers = Array(n)
    .fill()
    .map((_, i) => i + 1);
  let fac = numbers.reduce((acc, val) => acc * val, 1);

  k--;
  while (answer.length !== n) {
    fac = fac / numbers.length;
    let index = Math.floor(k / fac);
    answer.push(numbers[index]);
    k = k % fac;
    numbers = numbers.filter((v, i) => i !== index);
  }
  return answer;
}

const n = 2;
const k = 2;
const r = solution(n, k);
console.log(r);

const d = Array(21).fill(0);

// d[1] = 1;
// function factorial(n) {
//   if (d[n] !== 0) return d[n];
//   d[n] = n * factorial(n - 1);
//   return d[n];
// }
