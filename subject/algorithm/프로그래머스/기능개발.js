function solution(progresses, speeds) {
  //오른쪽으로 가면서, 나보다 큰 배열 요소가 있을 경우 1씩 더해주면 된다.

  let elapsedTimes = [];
  for (let i = 0; i < progresses.length; i++) {
    const time = Math.ceil((100 - progresses[i]) / speeds[i]);
    elapsedTimes.push(time);
  }

  let answer = [];
  let i = 1;
  while (true) {
    if (!elapsedTimes[0]) break;
    if (!elapsedTimes[i]) {
      answer.push(i);
      break;
    }

    if (elapsedTimes[0] < elapsedTimes[i]) {
      answer.push(i);
      elapsedTimes.splice(0, i);
      i = 1;
    } else {
      i++;
    }
  }

  return answer;
}

function refactoring(progresses, speeds) {
  //어차피 배열의 개수가 동일하므로 map 함수로 리팩토링
  let elapsedTimes = progresses.map((_, i) => {
    return Math.ceil((100 - progresses[i]) / speeds[i]);
  });
  let answer = [0];
  let maxDay = elapsedTimes[0];
  //초기값 설정

  //while문이 아닌 for문으로 리팩토링.
  //변수를 2개로 설정하여 굳이 배열을 자르고 하는 행위를 하지 않음.
  for (let i = 0, j = 0; i < elapsedTimes.length; i++) {
    if (maxDay < elapsedTimes[i]) {
      j += 1;
      answer[j] = 1;
      maxDay = elapsedTimes[i];
    } else {
      answer[j] += 1;
    }
  }
}
