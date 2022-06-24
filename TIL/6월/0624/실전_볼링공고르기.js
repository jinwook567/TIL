function solution(N, M, pattern) {
  //최대한 주어진 모든 수를 활용해보면,
  //본인보다 큰 것을 골라야 한다고 가정하니까.
  let answer = 0;

  for (let i = 1; i < M; i++) {
    const now = pattern.filter((v) => v === i).length;
    const next = pattern.filter((v) => v > i).length;
    answer += now * next;
  }
  console.log(answer);
}

const [N, M, pattern] = [5, 3, [1, 3, 2, 3, 2]];
solution(N, M, pattern);

function solution2(N, M, pattern) {
  //무게의 개수 저장.
  let left = N;
  let answer = 0;

  const table = Array(M + 1).fill(0);
  for (let num of pattern) {
    table[num] += 1;
  }

  for (let i = 1; i <= M; i++) {
    left -= table[i];
    answer += table[i] * left;
  }
  console.log(answer);
}

solution2(N, M, pattern);
