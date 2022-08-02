function solution(arr) {
  const d = Array(arr.length).fill(1);
  //각 d는 각 자리수가 만족하는 최대 길이
  for (let i = 0; i < d.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[i]) d[i] = Math.max(d[i], d[j] + 1);
    }
  }
  return arr.length - Math.max(...d);
}

const arr = [15, 11, 4, 8, 5, 2, 4];
const r = solution(arr);
console.log(r);
