function solution(arr, x) {
  //이 문제는 이진 탐색이다. 그 이유는 logN 시간 복잡도로 짜지 않으면 문제가 발생한다고 나와있기도 하지만,
  //이진 탐색을 이용하면 같은 값 중에 작은 거라면 가장 오른쪽, 큰 값 중에서는 가장 왼쪽의 값을 얻을 수 있다.
  function binarySearch(arr, value) {
    let start = 0;
    let end = arr.length;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      if (arr[mid] === value) return mid;

      if (arr[mid] < value) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
    return -1;
  }

  let start = binarySearch(arr, x - 1);
  let end = binarySearch(arr, x + 1);

  const value = binarySearch(arr, x);
  if (value === -1) return -1;

  let i = 2;
  while (start === -1) {
    start = binarySearch(arr, x - i);
    i++;
  }

  let j = 2;
  while (end === -1) {
    end = binarySearch(arr, x + j);
    j++;
  }

  return end - start - 1;
}

//위 해결 방식은 이진 탐색으로 한번에 찾았을 때 중간값이 일치하면 바로 그 값이 나와버린다. 즉 x-1의 마지막 값, x+1의 첫 번째 값이라는 것을 100% 보장할 수 없다.

function solution2(arr, x) {
  const len = arr.length - 1;

  function binarySearch2(arr, target, direction) {
    let start = 0;
    let end = len;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      if (arr[mid] === target && arr[mid + (direction === "L" ? -1 : 1)] !== target) {
        return mid;
      }
      if (arr[mid] === target && arr[mid + (direction === "L" ? -1 : 1)] === target) {
        if (direction === "L") {
          end = mid - 1;
        } else {
          start = mid + 1;
        }
        continue;
      }

      if (arr[mid] < target) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }

    return -1;
  }
  const start = binarySearch2(arr, x, "L");
  const end = binarySearch2(arr, x, "R");
  console.log({ start, end });
  if (start === -1) return -1;
  return end - start + 1;
}

console.log(solution2([1, 1, 2, 2, 2, 2, 3], 2));
