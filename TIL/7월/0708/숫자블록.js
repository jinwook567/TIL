function solution(begin, end) {
  const len = end - begin + 1;
  const d = Array(len).fill(0);

  for (let i = begin; i <= end; i++) {
    //array에 삽입 시 -1 해줄 것.
    for (let j = 2; i * j <= end; j++) {
      const index = i * j - begin;
      d[index] = i;
    }
  }
  return d;
}

const r = solution(10, 21);
console.log(r);
