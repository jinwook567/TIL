const N = 7;
const x = 1;
const numbers = [1, 1, 2, 2, 2, 2, 3];

//재귀로 풀기.
function solution(N, x, numbers) {
  const result = [];
  function binarySearch(numbers, target, start, end) {
    if (start > end) return -1;
    const mid = Math.floor((start + end) / 2);

    if (numbers[mid] === target) {
      result.push(mid);
      binarySearch(numbers, target, mid + 1, end);
      binarySearch(numbers, target, start, mid - 1);
      return;
    }

    if (target > numbers[mid]) {
      return binarySearch(numbers, target, mid + 1, end);
    } else {
      return binarySearch(numbers, target, start, mid - 1);
    }
  }
  binarySearch(numbers, x, 0, N - 1);

  return result.length === 0 ? -1 : result.length;
}

const r = solution(N, x, numbers);
console.log(r);

//첫 번째 요소가 등장하는 index, 마지막 요소가 등장하는 순간의 index를 구해서 서로 빼준다.
function solution2(N, x, numbers) {
  function left(numbers, target, start, end) {
    if (start > end) return;
    //mid값을 찾았고, 이 전 요소가 mid값과 다를 경우.
    const mid = Math.floor((start + end) / 2);
    if (numbers[mid] === target) {
      if ((mid >= 1 && numbers[mid - 1] !== target) || mid === 0) {
        return mid;
      } else {
        return left(numbers, target, start, mid - 1);
      }
    }

    if (numbers[mid] > target) {
      return left(numbers, target, start, mid - 1);
    } else {
      return left(numbers, target, mid + 1, end);
    }
  }

  function right(numbers, target, start, end) {
    if (start > end) return;
    const mid = Math.floor((start + end) / 2);
    if (numbers[mid] === target) {
      if ((mid < numbers.length - 1 && numbers[mid + 1] !== target) || mid === numbers.length - 1) {
        return mid;
      } else {
        return right(numbers, target, mid + 1, end);
      }
    }

    if (numbers[mid] > target) {
      return right(numbers, target, start, mid - 1);
    } else {
      return right(numbers, target, mid + 1, end);
    }

    //위의 코드 if, elseif, else를 사용해서 코드를 줄일 수 있음. 하지만 덜 직관적임.
  }

  const l = left(numbers, x, 0, N - 1);
  const r = right(numbers, x, 0, N - 1);

  return r - l + 1;
}

const r2 = solution2(N, x, numbers);
console.log({ r2 });
