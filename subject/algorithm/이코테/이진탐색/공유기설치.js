function solution(N, C, arr) {
  arr.sort((x, y) => x - y);

  if (C === 2) {
    return arr[N - 1] - arr[0];
  }

  let count = 2;
  let i = 0;
  while (count < C) {
    const index = findMidValue(arr);
    arr = arr.slice(0, index + 1);
    count += i === 0 ? 1 : 2 * i;
    i++;
  }
  return arr[arr.length - 1] - arr[0];
}

function findMidValue(arr) {
  const mid = (arr[0] + arr[arr.length - 1]) / 2;

  let min = Infinity;
  let index = 0;
  for (let i = 0; i < arr.length; i++) {
    if (Math.abs(arr[i] - mid) < min) {
      min = Math.abs(arr[i] - mid);
      index = i;
    }
  }

  return index;
  //return index
}

const r = solution(5, 3, [1, 2, 8, 4, 9]);
console.log(r);
