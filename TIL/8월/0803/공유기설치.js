//구간의 차이가 target 이상인 숫자 n을 구하기.
function count(arr, target) {
  let cnt = 1;
  let start = 0;
  let end = 1;

  while (end <= arr.length - 1) {
    if (arr[end] - arr[start] < target) {
      end++;
    } else {
      start = end;
      cnt++;
    }
  }
  return cnt;
}

function solution(arr, n) {
  //파라메트릭 서치
  let start = 1;
  let end = 1000000000;

  arr.sort((a, b) => a - b);

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    console.log(count(arr, mid), mid);
    if (count(arr, mid) >= n) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return start - 1;
}

const arr = [1, 2, 4, 8, 9];
const n = 3;
const r = solution(arr, n);
console.log({ r });
