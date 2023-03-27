function solution(M, K, numbers) {
  numbers.sort((a, b) => b - a);
  let m = K;
  let result = 0;
  for (let i = 0; i < M; i++) {
    if (m > 0) {
      result += numbers[0];
      m--;
    } else {
      result += numbers[1];
      m = K;
    }
  }
  console.log(result);
}

//만일 numbers의 길이가 너무 길어서 시간 초과가 날 경우 아래 풀이를 사용해야함.
function solution2(M, K, numbers) {
  numbers.sort((a, b) => b - a);
  let result = 0;
  const first = numbers[0];
  const second = numbers[1];

  const secondCount = Math.floor(M / (K + 1));
  const firstCount = secondCount * K + (M % (K + 1));

  result = firstCount * first + secondCount * second;
  console.log(result);
}

solution(8, 3, [2, 4, 5, 4, 6]);
solution2(8, 3, [2, 4, 5, 4, 6]);
