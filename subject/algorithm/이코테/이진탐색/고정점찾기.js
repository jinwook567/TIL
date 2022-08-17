function solution(arr) {
  //이진 탐색을 한 이유. arr[mid] 값이 찾고자 하는 값인데, 이 값이 index 작다면, 그 전은 검사할 필요가 없다. index 크다면 그 후는 검사할 필요가 없는 것이다.
  function binarySearch(arr) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);

      if (arr[mid] === mid) return mid;

      if (arr[mid] < mid) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
    return -1;
  }
  return binarySearch(arr);
}

const test1 = [-15, -6, 1, 3, 7];
const test2 = [-15, -4, 2, 8, 9, 13, 15];
const test3 = [-15, -4, 3, 8, 9, 13, 15];
console.log(solution(test3));
