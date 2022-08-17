function getPermutation(arr, n) {
  const result = [];
  const permutation = (arr, n, pick) => {
    if (n === 1) {
      arr.forEach((v) => result.push([...pick, v]));
      return;
    }

    arr.forEach((v, i) => {
      const rest = arr.filter((_, index) => index !== i);
      permutation(rest, n - 1, [...pick, v]);
    });
  };

  permutation(arr, n, []);
  return result;
}

function getFilter(arr, index, distance) {
  //index에서 시작해서 거리만큼
  return arr.filter((v, i) => i < index || v > arr[index] + distance);
}

function solution(n, weak, dist) {
  const len = weak.length;
  const newWeak = [...weak];

  const distLen = dist.length;
  newWeak.forEach((v) => newWeak.push(v + n));
  const newWeakLen = newWeak.length;

  //dist만큼의 개수가 필요해. 이럴바에 재귀로 구현하는게 낫지 않냐고 말한거임.

  //function으로 또 받아서
  const results = [];

  function checkCircular(weaks, dist) {
    if (newWeakLen - weaks.length === len) {
      results.push(distLen - dist.length);
      return;
    }
    if (dist.length === 0) {
      return;
    }
    const newDist = [...dist];
    const distance = newDist.pop();

    for (let j = 0; j < weaks.length; j++) {
      const filtered = getFilter(weaks, j, distance);
      checkCircular(filtered, newDist);
    }
  }

  const dists = getPermutation(dist, dist.length);

  for (let d of dists) {
    checkCircular([...newWeak], d);
  }

  return results.length === 0 ? -1 : Math.min(...results);
}

const r = solution(12, [1, 3, 4, 9, 10], [3, 5, 7]);
console.log(r);
