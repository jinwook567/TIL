function solution(operations) {
  const arr = [];
  operations.forEach((v) => {
    const [command, strNum] = v.split(" ");
    const num = Number(strNum);
    if (command === "I") {
      arr.push(num);
      arr.sort((a, b) => a - b);
    }

    if (command === "D") {
      if (num === -1) {
        arr.shift();
      } else {
        arr.pop();
      }
    }
  });

  return arr.length === 0 ? [0, 0] : [arr[arr.length - 1], arr[0]];
}

const operations = ["I 16", "D -1", "I 15"];
const r = solution(operations);
console.log(r);
