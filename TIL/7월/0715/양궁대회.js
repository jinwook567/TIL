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

function getScore(info, lion) {
  let infoScore = 0;
  let lionScore = 0;

  for (let i = 0; i <= 10; i++) {
    if (info[i] === 0 && lion[i] === 0) continue;
    if (info[i] >= lion[i]) {
      infoScore += 10 - i;
    } else {
      lionScore += 10 - i;
    }
  }
  return { infoScore, lionScore };
}

function solution(n, info) {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const combination = getCombination(numbers, n);

  let max = 0;
  const result = [];

  combination.forEach((scores) => {
    const lion = Array(11).fill(0);
    scores.forEach((s) => {
      lion[10 - s] += 1;
    });

    const { infoScore, lionScore } = getScore(info, lion);
    const d = lionScore - infoScore;
    if (d >= max && d > 0) {
      result.push({ d, lion });
      max = d;
    }
  });

  const answer = result.filter((el) => el.d === max).map((v) => v.lion);
  if (answer.length === 0) return [-1];

  for (let i = 10; i >= 0; i--) {
    const max = answer.reduce((acc, cur) => Math.max(acc, cur[i]), -Infinity);
    const arr = answer.filter((v) => v[i] === max);
    if (arr.length === 1) return arr[0];
  }
}

const info = [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
const n = 5;
const r = solution(n, info);
console.log(r);
