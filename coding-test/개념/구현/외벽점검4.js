function getFilter(arr, index, distance) {
  //index에서 시작해서 거리만큼
  return arr.filter((v, i) => i < index || v > arr[index] + distance);
}

function getPermutation(arr, n) {
  const results = [];
  const permutation = (array, n, pick) => {
    if (n === 1) {
      array.forEach((v) => results.push([...pick, v]));
      return;
    }

    array.forEach((v, i) => {
      permutation(
        array.filter((_, index) => index !== i),
        n - 1,
        [...pick, v]
      );
    });
  };
  permutation(arr, n, []);
  return results;
}

function solution(n, weak, dist) {
  //원본 배열 건드리지 않게끔 해야함!!
  const circularWeak = [...weak];
  circularWeak.forEach((v) => circularWeak.push(v + n));
  const circularWeakLen = circularWeak.length;
  const len = weak.length;

  const permutations = getPermutation(dist, dist.length);
  let results = Array(circularWeakLen).fill([...circularWeak]);
  //근데 또 dfs로 풀면 씨발 시간초과 쳐 나오고.

  for (let permu of permutations) {
    //여기서 또 permu를 돌아야해.
    let count = 1;
    while (permu.length !== 0) {
      const temp = [];
      const d = permu.pop();
      for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < results[i].length; j++) {
          const newArr = getFilter(results[i], j, d);
          if (circularWeakLen - newArr.length === len) {
            return count;
          }
          temp.push(newArr);
        }
      }
      console.log(temp);
      results = temp;

      count++;
    }
  }
  return -1;
}

const r = solution(12, [1, 5, 6, 10], [1, 2, 3, 4]);
const r2 = solution(12, [1, 3, 4, 9, 10], [3, 5, 7]);
const r3 = solution(12, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [5]);
console.log(r);
console.log(r2);
console.log(r3);
