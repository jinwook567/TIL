function solution(arr1, arr2) {
  const row = arr1.length;
  const column = arr1[0].length;
  const answer = [];

  for (let i = 0; i < row; i++) {
    const arr = [];
    for (let j = 0; j < arr2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < column; k++) {
        console.log(arr1[i][k], arr2[k][j], i, k, j);
        sum += arr1[i][k] * arr2[k][j];
      }
      arr.push(sum);
    }
    answer.push(arr);
  }
  return answer;
}

const arr1 = [
  [1, 4],
  [3, 2],
  [4, 1],
];
const arr2 = [
  [3, 3],
  [3, 3],
];
const r = solution(arr1, arr2);
console.log(r);
