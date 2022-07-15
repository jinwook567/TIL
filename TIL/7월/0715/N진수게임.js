function solution(n, t, m, p) {
  const max = m * (t - 1) + p;
  const numbers = [];
  for (let i = 0; i <= max; i++) {
    const str = i.toString(n);
    const arr = [...str];
    numbers.push(...arr);
  }

  const answer = [];
  for (let i = 0; i < t; i++) {
    answer.push(numbers[m * i + p - 1]);
  }
  return answer.join("").toUpperCase();
}

//t개니까.. 0,1,2,3

const [n, t, m, p] = [16, 16, 2, 1];
const r = solution(n, t, m, p);
console.log(r);
