function lowerBound(arr, target) {
  let start = 0;
  let end = arr.length;

  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] >= target) end = mid;
    else start = mid + 1;
  }
  return start;
}

function solution(gems) {
  const map = {};
  gems.forEach((v, i) => {
    if (map[v]) {
      map[v].push(i);
    } else {
      map[v] = [i];
    }
  });
  const result = [];

  for (let key in map) {
    map[key].sort((a, b) => a - b);
  }
  //이진 탐색을 위한 오름차순 배열.

  for (let key in map) {
    const targetKey = key;
    for (let i = 0; i < map[targetKey].length; i++) {
      const target = map[targetKey][i];
      let min = target;
      let max = target;
      for (let key in map) {
        if (key === targetKey) continue;
        let minValue = Infinity;
        let minDiff = Infinity;
        const index = lowerBound(map[key], target);
        const loop = [index];
        if (map[key][index + 1]) loop.push(index + 1);

        for (let i of loop) {
          minDiff = Math.min(minDiff, Math.abs(map[key][i] - target));
          if (minDiff === Math.abs(map[key][i] - target)) minValue = map[key][i];
        }

        min = Math.min(min, minValue);
        max = Math.max(max, minValue);
      }
      result.push({ cnt: max - min, arr: [min + 1, max + 1] });
    }
  }

  result.sort((a, b) => {
    if (a.cnt === b.cnt) {
      return a.arr[1] - b.arr[1];
    }
    return a.cnt - b.cnt;
  });
  return result[0].arr;

  //가장 가까운 것만 찾고 끝내면 logN으로 할 수 있다.
}

const gems = ["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"];

const r = solution(gems);
console.log(r);

// const leftIndex = left(map[key], target);
// const rightIndex = right(map[key], target);
// console.log(map[key], leftIndex, rightIndex, target);
// const a = Math.abs(map[key][leftIndex] - target);
// const b = Math.abs(map[key][rightIndex] - target);
// const c = Math.min(a, b);
// min = Math.min(min, c);
// max = Math.max(max, c);
