function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function solution(n, k) {
  const numbers = Array(n)
    .fill()
    .map((_, i) => i + 1);

  //factorial 저장용
  const map = new Map();
  const a = map.set(1, "3");

  const answer = [];

  let i = numbers.length - 1;
  while (numbers.length !== 0) {
    const count = map.has(i) ? map.get(i) : map.set(i, factorial(i)).get(i);
    if (count < k) {
      const index = Math.floor(k / count) - 1;
      console.log(k, index);
      answer.push(numbers[index]);
      numbers.splice(index, 1);
      k = k % count;
    } else {
      answer.push(numbers.shift());
    }
    i--;
  }
  console.log(answer);
  //return [...answer, ...numbers.slice(0, n - answer.length)];
}
[1, 2, 3, 4];
[1, 2, 4, 3];
[1, 3, 2, 4];
[1, 3, 4, 2];
[1, 4, 2, 3];
[1, 4, 3, 2];
//[2, 1, 3, 4];

const n = 4;
const k = 5;
const r = solution(n, k);
console.log(r);
