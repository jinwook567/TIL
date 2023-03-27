let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = +input.shift();
const numbers = input.shift().split(" ").map(Number);

function solution(numbers) {
  numbers.sort((a, b) => a - b);

  const len = numbers.length - 1;

  if (len % 2 === 0) {
    return numbers[len / 2];
  } else {
    //버림과 올림.
    const a1 = numbers[Math.floor(len / 2)];
    const a2 = numbers[Math.ceil(len / 2)];

    let cnt1 = 0;
    let cnt2 = 0;
    for (let i = 0; i < numbers.length; i++) {
      cnt1 += Math.abs(numbers[a1] - numbers[i]);
      cnt2 += Math.abs(numbers[a2] - numbers[i]);
    }

    if (cnt1 === cnt2) return a1;
    if (cnt1 > cnt2) {
      return a2;
    } else {
      return a1;
    }
  }
  //홀수면 그냥 가운데꺼 내보내면 됨.
  //짝수라면 비교를 해봐야하는가?
  //비교 해봐야함.
}

const r = solution(numbers);
console.log(r);
