//순서가 상관이 없음.
//순열로 생각했으나, 조합임. 왜냐면 순서가 상관이 없기 때문에.

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
  let lionScore = 0;
  let infoScore = 0;
  for (let i = 0; i <= 10; i++) {
    if (info[i] === 0 && lion[i] === 0) continue;
    if (info[i] >= lion[i]) infoScore += 10 - i;
    else lionScore += 10 - i;
  }
  return { lionScore, infoScore };
}

function solution(n, info) {
  const numbers = Array(11)
    .fill()
    .map((_, i) => i);

  let max = 0;
  let result = [];
  const combination = getCombination(numbers, n);

  combination.forEach((shots) => {
    const lion = Array(11).fill(0);
    shots.forEach((v) => {
      lion[10 - v] += 1;
    });

    const { infoScore, lionScore } = getScore(info, lion);
    if (lionScore > infoScore) {
      if (lionScore - infoScore >= max) {
        max = lionScore;
        result.push({ max, lion });
      }
    }
  });

  if (result.length === 0) return [-1];

  const candidate = result.filter((v) => v.max === max);
  function sorting(a, b, i) {
    if (a[i] === b[i] && i !== 0) return sorting(a, b, i - 1);
    return b[i] - a[i];
  }

  candidate.sort((a, b) => sorting(a.lion, b.lion, 11));

  return candidate[0].lion;
}

const test = [
  [1, 2, 1, 10],
  [0, 2, 1, 10],
];

function ans(a, b, i) {
  if (a[i] === b[i] && i !== 0) return ans(a, b, i - 1);
  return b[i] - a[i];
}

test.sort((a, b) => ans(a, b, 3));
console.log(test);

const r = solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3]);
console.log(r);
