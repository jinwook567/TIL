let fs = require("fs");
//let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let input = fs.readFileSync("./sample.txt").toString().trim().split("\n");

const N = +input.shift();
const arr = [];
for (let i = 0; i < N; i++) {
  const splited = input.shift().split(" ");
  arr.push([splited[0], +splited[1], +splited[2], +splited[3]]);
}

function solution(arr) {
  arr.sort((a, b) => {
    if (a[1] === b[1]) {
      if (a[2] === b[2]) {
        if (a[3] === b[3]) {
          return (a[0] > b[0]) - (a[0] < b[0]);
        }
        return b[3] - a[3];
      }
      return a[2] - b[2];
    }

    return b[1] - a[1];
  });

  for (let v of arr) {
    console.log(v[0]);
  }
}

solution(arr);
