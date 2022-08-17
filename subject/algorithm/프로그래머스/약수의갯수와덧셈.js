function solution(left, right) {
  const getDividorsLength = (number) => {
    let answer = 0;
    for (let i = 1; i < number + 1; i++) {
      if (number % i === 0) {
        answer += 1;
      }
    }
    return answer;
  };

  let answer = 0;
  for (let i = left; i <= right; i++) {
    const length = getDividorsLength(i);
    if (length % 2 === 0) {
      //짝수
      answer += i;
    } else {
      //홀수
      answer -= i;
    }
  }

  return answer;
}

function refactoring1(left, right) {
  let answer = 0;
  for (let i = left; i <= right; i++) {
    let count = 0;
    for (let j = 1; j <= i; j++) {
      if (i % j === 0) count++;
    }
    if (count % 2 === 0) {
      answer += i;
    } else {
      answer -= i;
    }
  }
  return answer;
}

function refactoring2(left, right) {
  let answer = 0;
  //제곱근이 가능하면 약수가 홀수개임.
  for (let i = left; i <= right; i++) {
    if (Number.isInteger(Math.sqrt(i))) {
      answer += i;
    } else {
      answer -= i;
    }
  }
  return answer;
}
