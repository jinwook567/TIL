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
  return Math.min(...results);
}

const arr = [15, 11, 4, 8, 5, 2, 4];

const r = solution(arr);
console.log(r);

//다이나믹 프로그래밍 방식
//객체로 만들어서 비교..? arr, count 객체

function solution2(arr) {
  //문제가 되는 상황에서 작은 놈을 빼버리면 된다.
  const len = arr.length;
  const excluded = Array(len).fill(false);
  let count = 0;

  for (i = 0; i < len - 1; i++) {
    //내림차순을 만족하는지.

    if (arr[i] < arr[i + 1]) {
      excluded[i] = true;
      count++;
    }
  }

  return count;
}

function solution3(arr) {
  //LIS 알고리즘.
  const len = arr.length;
  const d = Array(arr.length).fill(1);

  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] < arr[j]) {
        d[i] = Math.max(d[i], d[j] + 1);
      }
    }
  }

  return arr.length - Math.max(...d);
}

let fs = require("fs");
let input = fs.readFileSync("./병사.txt").toString().split("\n");

const arr2 = input[1].split(" ").map((v) => Number(v));
console.log(arr2);

const r2 = solution2(arr2);
const r3 = solution3(arr);
console.log({ r2, r3 });
