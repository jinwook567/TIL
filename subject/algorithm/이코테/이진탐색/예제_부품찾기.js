//이진탐색 문제이다.
//현재 arr은 sort가 안된 상황이므로 sort 해줘야한다.
function solution(arr, list) {
  const N = arr.length;
  arr.sort((a, b) => a - b);
  //Set을 활용하여 중복을 제거해주면 더 빠르다.

  function binarySearch(arr, target, start, end) {
    if (start > end) return "no";
    const mid = Math.floor((start + end) / 2);

    if (arr[mid] === target) return "yes";
    if (arr[mid] > target) {
      return binarySearch(arr, target, start, mid - 1);
    } else {
      return binarySearch(arr, target, mid + 1, end);
    }
  }

  return list.map((num) => binarySearch(arr, num, 0, N));
}

const result = solution([8, 3, 7, 9, 2], [5, 7, 9]);
console.log(result);

const set = new Set([1, 1, 3, 3, 5, 5]);
