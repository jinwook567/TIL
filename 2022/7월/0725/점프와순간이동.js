function solution(n) {
  let answer = 0;
  while (n > 0) {
    if (n % 2 === 0) n = n / 2;
    else {
      answer++;
      n--;
    }
  }
  return answer;
}

const r = solution(n);
console.log(r);
