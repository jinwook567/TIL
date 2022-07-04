function solution(n) {
  const len = n / 2;
  let cnt = 0;

  for (let i = 1; i <= len; i++) {
    let sum = i;
    for (let j = i + 1; j <= len + 1; j++) {
      sum += j;
      if (sum === n) cnt++;
      if (sum > n) break;
    }
  }
  return cnt + 1;
}
