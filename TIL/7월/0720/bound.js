function lowBound(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] >= target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return end + 1;
}

const test = [0, 1, 1, 2, 2, 2];
const low = lowBound(test, 0);

function upperBound(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] <= target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return start;
}
//해당 값보다 큰 것.

const max = upperBound(test, 2);
console.log({ max });
