//이진 탐색은 정렬이 되어 있어야 사용할 수 있다.
//데이터 탐색 관련해서 1,000만번 이상 일어날 때 사용하면 좋다.

function binarySearch(arr, target, start, end) {
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] > target) {
    return binarySearch(arr, target, start, mid - 1);
    //꼭 return을 해줘야한다. return을 해주지 않으면, undefined를 배출하고만다.
  } else {
    return binarySearch(arr, target, mid + 1, end);
    //꼭 return을 해줘야한다. return을 해주지 않으면, undefined를 배출하고만다.
  }
}

const result = binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 11, 0, 9);
console.log({ result });
