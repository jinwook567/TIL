//같은 숫자에 넣을거면 1개를 더 넣어줘야한다.
//아니라면 1개만 넣어주면 된다.

//permutation이 아니고 combination이다..
function getScore(info, lion) {
  let appeachScore = 0;
  let lionScore = 0;

  for (let i = 0; i <= 10; i++) {
    if (info[i] >= lion[i]) {
      appeachScore += 10 - i;
    } else {
      lionScore += 10 - i;
    }
  }

  return { appeachScore, lionScore };
}

function getCombination(arr, n) {
  const result = [];
  if (n === 1) return arr.map((el) => [el]);

  arr.forEach((v, i) => {
    const rest = arr.slice(i);
    const combination = getCombination(rest, n - 1);
    const attached = combination.map((el) => [v, ...el]);
    result.push(...attached);
  });
  return result;
}

function solution(n, info) {
  let max = 0;
  let answer;

  const numbers = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  const permutation = getCombination(numbers, n);
  permutation.forEach((arr) => {
    const lion = Array(11).fill(0);
    arr.forEach((v) => {
      //i는 10-i라고 했습니다.
      lion[10 - v] += 1;
    });

    //d는 라이언이 쏜 경우의 수들
    const { appeachScore, lionScore } = getScore(info, lion);
    if (lionScore > appeachScore) {
      if (lionScore > max) {
        max = lionScore;
        answer = lion;
      }
    }
  });

  return answer ? answer : [-1];
}

const r = solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]);
console.log({ r });
