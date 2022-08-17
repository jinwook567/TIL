function permutation(arr, num) {
  const results = [];
  if (num === 1) return arr.map((v) => [v]);

  arr.forEach((v, index) => {
    const rest = arr.filter((_, i) => i !== index);
    const permutations = permutation(rest, num - 1);
    const attached = permutations.map((el) => [v, ...el]);
    results.push(...attached);
  });
  return results;
}

function solution(numbers, p, s, m, d) {
  const calcuate = {
    "+": (a, b) => a + b,
    "*": (a, b) => a * b,
    "/": (a, b) => {
      const v = Math.floor(Math.abs(a) / b);
      return a > 0 ? v : -v;
    },
    "-": (a, b) => a - b,
  };

  const operators = [];
  [p, s, m, d].forEach((count, i) => {
    const c = i === 0 ? "+" : i === 1 ? "-" : i === 2 ? "*" : "/";
    operators.push(...Array(count).fill(c));
  });

  const permutations = permutation(operators, p + s + m + d);
  const answers = [];

  permutations.forEach((operator) => {
    const calcuated = numbers.reduce((acc, cur, index) => {
      if (index === 0) return cur;
      return calcuate[operator[index - 1]](acc, cur);
    }, 0);
    answers.push(calcuated);
  });

  return { max: Math.max(...answers), min: Math.min(...answers) };
}

const r = solution([3, 4, 5], 1, 0, 1, 0);
console.log(r);

function solution2(numbers, p, s, m, d) {
  //dfs로 문제풀기. permutation이 아니라.
  const answers = [];
  function dfs(numbers, acc, [p, s, m, d]) {
    if (p === 0 && s === 0 && m === 0 && d === 0) {
      answers.push(acc);
      return;
    }
    const _numbers = [...numbers];
    const dequeued = _numbers.shift();

    if (acc === 0) {
      dfs(_numbers, dequeued, [p, s, m, d]);
      return;
    }

    if (p > 0) {
      dfs(_numbers, acc + dequeued, [p - 1, s, m, d]);
    }

    if (s > 0) {
      dfs(_numbers, acc - dequeued, [p, s - 1, m, d]);
    }

    if (m > 0) {
      dfs(_numbers, acc * dequeued, [p, s, m - 1, d]);
    }

    if (d > 0) {
      dfs(_numbers, Math.floor(acc / dequeued), [p, s, m, d - 1]);
    }
  }

  dfs(numbers, 0, [p, s, m, d]);
  return { min: Math.min(...answers), max: Math.max(...answers) };
}
const r2 = solution2([3, 4, 5], 1, 0, 1, 0);
console.log(r2);
