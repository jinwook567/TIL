const numbers = [1, 2, 3, 5, 10, 6, 3, 12, 13];

const numbers2 = [100, 101, 102, 1, 2];

//1,2,3,5,6,12,13
function LIS(numbers) {
  const len = numbers.length;
  const d = Array(len).fill(1);
  //본인만 놓을 경우에 최소 1이므로.

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (numbers[j] < numbers[i]) {
        d[i] = Math.max(d[i], d[j] + 1);
      }
    }
  }
  console.log(d);
  return Math.max(...d);
}

const r = LIS(numbers2);
console.log(r);

//최장 증가 부분수열.. [101, 101,102]니까 3개여야 하는데..? d에서 가장 큰 수를 리턴해야함.
