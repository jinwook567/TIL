function solution(n, money) {
  const d = Array(n + 1).fill(0);

  money.sort((a, b) => a - b);

  for (let i = 0; i <= n; i++) {
    for (let m of money) {
      if (i + m <= n) {
        if (money.find((v) => v === i)) continue;
        d[i + m] = Math.max(d[i + m], d[i] + 1);
      }
    }
  }

  console.log(d);
  return d[n];

  //1,1
  //2

  //1,1,1
  //2,1
  //1,2

  //1,1,1,1
  //2,2
  //2,1,1
  //1,2,1
  //1,1,2

  //나보다 큰 것만 넣어야함.
}

const n = 5;
const money = [1, 2, 5];
const r = solution(n, money);
console.log(r);
