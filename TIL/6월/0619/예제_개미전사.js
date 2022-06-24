const arr = [
  1, 3, 1, 5, 10, 5, 10, 3, 2, 3, 4, 2, 3, 5, 2, 2, 1, 2, 3, 1, 1, 2, 3, 5, 2, 2, 1, 2, 3, 1, 1, 2,
  3, 5, 2, 2, 1, 2, 3, 1, 1, 2, 3, 5, 2, 2, 1, 2, 3, 1, 1, 2, 3, 5, 2, 2, 1, 2, 3, 1, 1, 2, 3, 5, 2,
  2, 1, 2, 3, 1, 1, 2, 3, 5, 2, 2, 1, 2, 3, 1, 1, 2, 3, 5, 2, 2, 1, 2, 3, 1, 1, 2, 3, 5, 2, 2, 1, 2,
  3, 1, 1,
];
const arr2 = [1, 3, 1, 5];

//다이나믹 프로그래밍을 무시하고 재귀로 짠 코드.
function solution(arr) {
  const answers = [];

  function recursion(arr, acc) {
    if (arr.length <= 1) return answers.push(acc + (arr.length === 1 ? arr[0] : 0));

    for (let i = 0; i < arr.length; i++) {
      const rest = arr.slice(i + 2);
      recursion(rest, acc + arr[i]);
    }
  }
  recursion(arr, 0);
  return Math.max(...answers);
}

//const r = solution(arr);
//console.log(r);

function solution2(arr) {
  const d = Array(arr.length).fill(0);
  d[0] = arr[0];
  d[1] = Math.max(arr[0], arr[1]);

  for (let i = 2; i < arr.length; i++) {
    d[i] = Math.max(d[i - 2] + arr[i], d[i - 1]);
  }
  return d[arr.length - 1];
}

const r2 = solution2(arr2);
console.log(r2);
