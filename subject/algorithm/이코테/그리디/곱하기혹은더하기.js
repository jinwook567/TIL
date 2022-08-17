function solution(number) {
  const numArr = [...number].map((v) => Number(v));
  let answer = 0;

  for (let i = 0; i < numArr.length; i++) {
    if (numArr[i] <= 1 || answer <= 1) {
      answer += numArr[i];
    } else {
      answer *= numArr[i];
    }
  }

  return answer;
}

console.log(solution("567"));
