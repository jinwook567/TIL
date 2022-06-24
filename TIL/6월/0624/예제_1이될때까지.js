function solution(N, K) {
  let n = N;
  let count = 0;

  while (n !== 1) {
    if (n % K === 0) {
      //나누어 떨어질 때
      n = n / K;
    } else {
      //나누어 떨어지지 않을 때
      n--;
    }
    count++;
  }
  console.log(count);
}

solution(25, 5);
