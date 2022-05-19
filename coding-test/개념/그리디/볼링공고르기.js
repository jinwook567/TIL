function solution(bowlingBalls) {
  const numbers = [...bowlingBalls].map((v) => Number(v));
  let answer = 0;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] !== numbers[j]) answer++;
    }
  }
  return answer;
}

//이중 루프를 돌지 않게끔 하는 코드.
function solution2(bowlingBalls) {
  const weights = Array(11).fill(0);
  let n = 0;
  let count = 0;
  for (let x of bowlingBalls) {
    weights[x]++;
    n++;
  }

  for (let x of weights) {
    n -= x;
    count += x * n;
  }
  return count;
}

console.log(solution2("15432452"));
