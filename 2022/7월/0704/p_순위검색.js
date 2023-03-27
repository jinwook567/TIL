const info = [
  "java backend junior pizza 150",
  "python frontend senior chicken 210",
  "python frontend senior chicken 150",
  "cpp backend senior pizza 260",
  "java backend junior chicken 80",
  "python backend senior chicken 50",
];
const query = [
  "java and backend and junior and pizza 100",
  "python and frontend and senior and chicken 200",
  "cpp and - and senior and pizza 250",
  "- and backend and senior and - 150",
  "- and - and - and chicken 100",
  "- and - and - and - 150",
];

//점수가 아니고 문자열이니까 저걸로 가지고 있는지..
//

//파라메트릭 서치, 이상 찾아야함.
function binarySearch(data, i, target, start, end) {
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (target <= data[mid][i]) {
      //무조건 이상만 뱉음.
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return start;
}

function binarySearch3(numbers, target, start, end) {
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (target <= numbers[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return start;
}

// const r = binarySearch3([1, 2, 3, 7, 9, 11, 13], 8, 0, 6);
// console.log(r);

//이진 탐색, maxHeap 제외하고는 없지 않나..?

//길게 봤을 때,

function left(data, i, target, start, end) {
  if (start > end) return;
  //mid값을 찾았고, 이 전 요소가 mid값과 다를 경우.
  const mid = Math.floor((start + end) / 2);

  if (data[mid][i] === target) {
    if (mid === 0 || (mid >= 1 && data[mid - 1][i] !== target)) return mid;
    //우측도 검사하나..?
    return left(data, i, target, start, mid - 1);
  }

  if (data[mid][i] > target) {
    return left(data, i, target, start, mid - 1);
  } else {
    return left(data, i, target, mid + 1, end);
  }
}

//해당 점수 이상으로 최대한 가까워 지도록.. 카카오는 진짜 문제가 좋다..

function right(data, i, target, start, end) {
  if (start > end) return;
  const mid = Math.floor((start + end) / 2);
  const len = data.length;

  if (data[mid][i] === target) {
    if (mid === len - 1 || data[mid + 1][i] !== target) return mid;
    return right(data, i, target, mid + 1, end);
  }

  if (data[mid][i] > target) {
    return right(data, i, target, start, mid - 1);
  } else {
    return right(data, i, target, mid + 1, end);
  }
}

function solution(info, query) {
  info = info.map((v) => {
    const splited = v.split(" ");
    const score = splited.pop();
    return [...splited, +score];
  });

  query = query.map((v) => {
    const splited = v.split(" and ");
    const pop = splited.pop();
    const [food, score] = pop.split(" ");
    return [...splited, food, +score];
  });
  const result = [];

  query.forEach((q, Index) => {
    let copy = JSON.parse(JSON.stringify(info));
    for (let i = 4; i >= 0; i--) {
      //정렬.
      copy.sort((a, b) => (i === 4 ? a[4] - b[4] : (a[i] > b[i]) - (a[i] < b[i])));

      //i가 4면 숫자 오름차순, 아니라면 문자 오름차순.

      if (i === 4) {
        const atLeastIndex = binarySearch(copy, i, q[i], 0, copy.length - 1);
        copy = copy.slice(atLeastIndex);
        continue;
      }

      if (q[i] === "-") continue;

      //이진탐색 왼쪽 찾기.
      //이진탐색 오른쪽 찾기.
      const leftIndex = left(copy, i, q[i], 0, copy.length - 1);
      const rightIndex = right(copy, i, q[i], 0, copy.length - 1);

      copy = copy.slice(leftIndex, rightIndex + 1);

      //배열 slice해서 copy 업데이트 해주기.
    }
    result.push(copy.length);
    //i===0 일 때 남은 info 길이 넣어주기. (반복문이 끝나거나.)
  });
  return result;
}

const r = solution(info, query);
console.log({ r });
