function binarySearch(arr, target) {
  let start = 0;
  let end = 200000000;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    const copy = [...arr].map((v) => (v - mid > 0 ? v - mid : 0));

    if (hasMore(copy, target)) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return end + 1;
}

function hasMore(arr, target) {
  let cnt = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= 0) cnt++;
    else cnt = 0;
    if (cnt >= target) return true;
  }
  return false;
}

function solution(stones, k) {
  const person = binarySearch(stones, k);
  return person;
}

const stones = [2, 4, 5, 3, 2, 1, 4, 2, 5, 1];
const k = 3;
const r = solution(stones, k);
console.log(r);

function solution(stones, k) {
  let start = 0;
  let end = 200000000;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    let cnt = 0;
    const copy = [...stones].map((v) => v - mid);
    let flag = false;

    for (let i = 0; i < copy.length; i++) {
      if (copy[i] <= 0) cnt++;
      else cnt = 0;
      if (cnt >= k) {
        flag = true;
        break;
      }
    }

    if (flag) end = mid - 1;
    else start = mid + 1;
  }
  return end + 1;
}
