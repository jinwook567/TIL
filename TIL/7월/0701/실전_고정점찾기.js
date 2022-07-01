const n = 7;
const numbers = [-15, -4, 3, 8, 9, 13, 15];

function solution(n, numbers) {
  function binarySearch(numbers, start, end) {
    if (start > end) return -1;
    const mid = Math.floor((start + end) / 2);

    if (mid === numbers[mid]) return mid;

    if (mid > numbers[mid]) {
      return binarySearch(numbers, mid + 1, end);
    } else {
      return binarySearch(numbers, start, mid - 1);
    }
  }
  return binarySearch(numbers, 0, n);
}

const r = solution(n, numbers);
console.log(r);
