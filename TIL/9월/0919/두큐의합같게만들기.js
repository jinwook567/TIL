function solution(queue1, queue2) {
  const sum = (arr) => arr.reduce((acc, cur) => acc + cur, 0);
  const len = queue1.length;

  let index1 = 0;
  let index2 = 0;

  let sum1 = sum(queue1);
  let sum2 = sum(queue2);

  let cnt = 0;

  while (index1 < 2 * len && index2 < 2 * len) {
    if (sum1 === sum2) return cnt;

    if (sum1 > sum2) {
      const dequeued = queue1[index1];
      sum1 -= dequeued;
      sum2 += dequeued;
      index1++;
      queue2.push(dequeued);
    } else {
      const dequeued = queue2[index2];
      sum1 += dequeued;
      sum2 -= dequeued;
      index2++;
      queue1.push(dequeued);
    }
    cnt++;
  }
  return -1;
}

const queue1 = [1, 2, 1, 2];
const queue2 = [1, 10, 1, 2];
const r = solution(queue1, queue2);
console.log(r);
