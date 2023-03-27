//맨 앞이 0이라면 예외처리 해주어야함.
//배열 내 원소를 모두 비교하는 방식으로는, 시간 복잡도를 통과할 수 없음.

function solution(arr) {
  const sorted = arr.map((v) =>
    `${v}`
      .split("")
      .sort((a, b) => a - b)
      .join("")
  );
  return new Set(sorted).size;
}

const arr = [112, 1814, 121, 1481, 1184];
const r = solution(arr);
console.log(r);
