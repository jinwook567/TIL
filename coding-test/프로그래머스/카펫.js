function solution(brown, yellow) {
  //약수 구하기.
  const getDivided = (number) => {
    const result = [];
    for (let i = 1; i < number + 1; i++) {
      if (number % i === 0) {
        result.push(i);
      }
    }
    return result;
  };

  const arr = getDivided(yellow);

  let answer = [];

  for (let item of arr) {
    const vertical = item;
    const horizontal = yellow / item;
    if ((vertical + 2) * (horizontal + 2) - yellow === brown) {
      answer = [horizontal + 2, vertical + 2];
      break;
    }
  }
  //forEach문은 중도에 멈추기가 불가능하다.

  return answer;
}

function refactoring1(brown, yellow) {
  const answer = [];
  for (let i = 1; i < yellow + 1; i++) {
    if (yellow % i === 0) {
      const vertical = i;
      const horizontal = yellow / i;
      if ((vertical + 2) * (horizontal + 2) - yellow === brown) {
        answer = [horizontal + 2, vertical + 2];
        break;
      }
    }
  }
  return answer;
}

function refactoring2(brown, yellow) {
  const area = brown + yellow;

  for (let i = 1; i < area + 1; i++) {
    if (area % i === 0) {
      //이하 로직 refactoring1 함수와 동일함.
      //단지 브라운과 옐로우를 합쳐서 실행할 것인지, 따로 할 것인지에 대한 차이일 뿐임.
    }
  }
}
