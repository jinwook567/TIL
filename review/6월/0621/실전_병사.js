function check(arr) {
  return arr.every((v, i) => (i === 0 ? true : arr[i - 1] >= arr[i]));
}

//완전 탐색이라고 생각하면, 2^2000이기 때문에 무조건 시간 초과 걸린다.
//본인을 넣었다가 뺏다가.

function solution(arr) {
  const results = [];
  const resultArrs = [];
  const len = arr.length;

  function recursion(arr, acc, i) {
    if (i >= len) return;
    if (check(arr) || arr.length === 0) {
      results.push(acc);
      resultArrs.push(arr);
      return;
    }
    const newArr = [...arr];
    newArr.splice(i, 1);

    recursion(newArr, acc + 1, i + 1);
    recursion(arr, acc, i + 1);
  }
  recursion(arr, 0, 0);
  console.log(results);
  console.log(resultArrs);
}

const arr = [15, 11, 4, 8, 5, 2, 4];

const r = solution(arr);
console.log(r);

//다이나믹 프로그래밍 방식
//객체로 만들어서 비교..? arr, count 객체
