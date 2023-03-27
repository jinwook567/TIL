//몇개를 세울 수 있는지 확인하기.
function count(arr, target) {
  let cnt = 1;
  let start = 0;
  let end = 1;
  //왜 나는 토스에 합격했을까?
  while (end <= arr.length - 1) {
    if (arr[end] - arr[start] >= target) {
      start = end;
      cnt++;
    }
    end++;
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
