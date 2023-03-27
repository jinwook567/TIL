function solution(numbers) {
  const len = numbers.length;

  const d = Array(len).fill(0);
  d[0] = numbers[0];
  d[1] = Math.max(numbers[0], numbers[1]);

  for (let i = 2; i < len; i++) {
    d[i] = Math.max(d[i - 1], d[i - 2] + numbers[i]);
  }
  return d[len - 1];
}

const numbers = [1, 3, 1, 5];
const r = solution(numbers);
console.log(r);
