function solution(n, times) {
  let start = 1;
  let end = 1000000000 * 1000000000;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const people = times.reduce((acc, cur) => acc + Math.floor(mid / cur), 0);

    if (people >= n) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return end + 1;
}

const n = 6;
const times = [7, 10];
const r = solution(n, times);
console.log(r);
