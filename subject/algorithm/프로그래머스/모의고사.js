function solution(answers) {
  const answerPattern = {
    1: [1, 2, 3, 4, 5],
    2: [2, 1, 2, 3, 2, 4, 2, 5],
    3: [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  };
  const countObj = { 1: 0, 2: 0, 3: 0 };

  for (let i = 0; i < answers.length; i++) {
    for (let j = 1; j < 4; j++) {
      const index = i % answerPattern[j].length;
      if (answerPattern[j][index] === answers[i]) {
        countObj[j] += 1;
      }
    }
  }

  const arr = [
    { p: 1, count: countObj[1] },
    { p: 2, count: countObj[2] },
    { p: 3, count: countObj[3] },
  ];
  arr.sort((x, y) => y.count - x.count);

  const max = arr[0].count;
  const sameCounts = arr.filter((t) => t.count === max);
  const personArr = sameCounts.map((t) => t.p);
  let answer = personArr.sort((x, y) => x - y);
  return answer;
}

function refactoring(answers) {
  //filter 함수를 쓰면 굉장히 간단하게 끝낼 수 있다..!
  const a1 = [1, 2, 3, 4, 5];
  const a2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const a3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  const a1c = answers.filter((answer, i) => answer === a1[i % a1.length]).length;
  const a2c = answers.filter((answer, i) => answer === a2[i % a2.length]).length;
  const a3c = answers.filter((answer, i) => answer === a3[i % a2.length]).length;

  const max = Math.max(a1c, a2c, a3c);
  let answer = [];

  if (max === a1c) answer.push(1);
  if (max === a2c) answer.push(2);
  if (max === a3c) answer.push(3);
}
