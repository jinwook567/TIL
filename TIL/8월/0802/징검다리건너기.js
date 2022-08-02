//k개 이하입니까?
function check(arr, k) {
  let cnt = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= 0) cnt++;
    else cnt = 0;
    if (cnt > k) return false;
  }
  return true;
}

function solution(stones, k) {
  let start = 1;
  let end = 200000000;

  while (start <= end) {
    //k+1개 이상일 때..
    const mid = Math.floor((start + end) / 2);
    const copy = [...stones].map((v) => v - mid);

    if (check(copy, k)) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return start - 1;
}
//>> 함수 알아보기

const stones = [2, 4, 5, 3, 2, 1, 4, 2, 5, 1];
const k = 3;
const r = solution(stones, k);
console.log(r);
