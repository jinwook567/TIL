//우리는 최솟값만 알면 된다.
function solution(example) {
  const numbers = example.sort((a, b) => a - b);

  let currentNum = 1;
  const made = new Set();
  made.add(numbers[0]);

  while (true) {
    if (!made.has(currentNum)) return currentNum;
    const copy = new Set(made);
    for (const num of copy) {
      made.add(num + numbers[currentNum]);
    }
    currentNum++;
  }
}

function solution2(example) {
  const numbers = example.sort((a, b) => a - b);
  let acc = 0;

  for (let i = 0; i < numbers.length; i++) {
    if (acc + 2 <= numbers[i]) {
      break;
    }
    acc += numbers[i];
  }
  return acc + 1;
}

const example = [3, 2, 1, 1, 9];

console.log(solution(example));
console.log(solution2(example));
