let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
//let input = fs.readFileSync("./sample.txt").toString().trim().split("\n");

const [N, C] = input.shift().split(" ").map(Number);

const numbers = [];
for (let i = 0; i < N; i++) {
  numbers.push(+input[i]);
}
//숫자가 너무 많아서 shift 하는 방식으로는 시간 초과가 나버리는군..

//공유기 거리를 기준으로 설치해보면서 성립하는지 안하는지 탐색하기. 떡 문제와 유사함.
function solution(N, C, numbers) {
  numbers.sort((a, b) => a - b);

  let start = 1; //최소의 길이
  let end = numbers[N - 1] - numbers[0]; //최대의 길이
  let answer = 0;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    //최대 거리가 mid다.

    //설치를 해보자. (while문 사용해서)
    let cnt = 0;
    let left = 0;
    let right = 1;
    while (right < numbers.length) {
      if (numbers[right] - numbers[left] < mid) {
        right++;
      } else {
        left = right;
        right += 1;
        cnt++;
      }
    }
    //mid가 2일 때 cnt가 3이여야하는데,

    //설치된 공유기 숫자가 목표 공유기 숫자보다 적다면, 공유기간 사이의 거리를 좁혀야한다.
    //C-1인 이유는 공유기 1대 설치되었다고 생각해야함.
    if (cnt < C - 1) {
      end = mid - 1;
    } else {
      start = mid + 1;
      answer = mid;
    }
  }
  return answer;
}

const r = solution(N, C, numbers);
console.log(r);
