//쓰면서는 아니고, 그냥 생각을 충분히 하고 하면 된다.
const t0 = performance.now();
const testCase2 = Array(40000).fill(1).join("");
const t1 = performance.now();
console.log(t1 - t0);
const testCase = "10110";

function solution(S) {
  const t2 = performance.now();
  let answer = 0;
  const length = S.length;
  let queue = [];

  for (let i = length - 1; i >= 0; i--) {
    if (S[i] === "1") {
      queue.push(length - i - 1);
    }
  }

  return queue[queue.length - 1] + queue.length;
}

const answer = solution(testCase);
console.log(answer);

const a = "st";
const b = "st";
//배열 비교..
console.log(a === b);
