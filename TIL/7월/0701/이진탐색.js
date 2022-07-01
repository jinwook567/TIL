const numbers = [1, 3, 5, 7, 10, 13, 15];

//재귀를 이용한 이진탐색
function binarySearch(numbers, target, start, end) {
  const mid = Math.floor((start + end) / 2);
  if (start > end) return "none";

  if (numbers[mid] === target) return mid;

  if (numbers[mid] > target) {
    //target은 numbers[mid] 이전에 있다.
    return binarySearch(numbers, target, start, mid - 1);
  } else {
    //target은 numbers[mid] 이후에 있다.
    return binarySearch(numbers, target, mid + 1, end);
  }
}

const index = binarySearch(numbers, 5, 0, numbers.length);
console.log(index);

function binarySearch2(numbers, target, start, end) {
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (numbers[mid] === target) return mid;

    if (numbers[mid] > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return "none";
}

const index2 = binarySearch2(numbers, 10, 0, numbers.length);
console.log(index2);
