//요청한 떡의 길이의 범위가 매우 크다.
//절단기 높이를 설정하면서 계산을 해봐야하는데 반복문을 사용해서 차례대로 내려가면 분명 시간 초과가 발생한다.
//따라서 이진 탐색을 생각해보아야한다. 정확히 떡의 길이가 일치하지 않을 수 있다. 따라서 값을 저장해놔야한다. 그리고 그중에서 최댓값 리턴..
const N = 4;
const M = 6;
const numbers = [19, 15, 10, 17];

//재귀로 한다면 result 배열에 값을 넣어주는 방식으로 가야함.
function solution(N, M, numbers) {
  const end = Math.max(...numbers);
  const start = 0;
  let result = [];

  function binarySearch(numbers, target, start, end) {
    if (start > end) return; //종료 조건
    const mid = Math.floor((end + start) / 2); //절단기의 길이

    const length = numbers.reduce((acc, cur) => acc + (cur - mid > 0 ? cur - mid : 0), 0);

    if (length >= target) {
      //떡의 길이가 기니까, 절단기의 길이를 늘려야함.
      result.push(mid);
      return binarySearch(numbers, target, mid + 1, end);
    } else {
      return binarySearch(numbers, target, start, mid - 1);
    }
  }
  binarySearch(numbers, M, start, end);
  return Math.max(...result);
}

//아래의 정답이 맞음. 왜냐하면 떡의 길이가 딱 안맞아 떨어질 수도 있기 때문에, 그리고
function solution2(N, M, numbers) {
  let end = Math.max(...numbers);
  let start = 0;
  let result = 0;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const len = numbers.reduce((acc, cur) => acc + (cur - mid > 0 ? cur - mid : 0), 0);

    if (M < len) {
      //떡의 더 큼. 절단기 길이가 짧음.
      start = mid + 1;
    } else {
      //같거나도 포함되있음..
      result = mid;
      end = mid - 1;
    }
  }
  return result;
}

const r = solution(N, M, numbers);
const r2 = solution2(N, M, numbers);
console.log(r, r2);
