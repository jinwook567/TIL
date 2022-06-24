function solution(food_times, k) {
  //뛰어넘는 것은 신경을 안써도 되는게, 나의 라운드가 무엇인지 나와있으면 되니까.

  const data = food_times.map((v, i) => ({ time: v, number: i + 1 }));

  data.sort((a, b) => b.time - a.time);
  //다시 원래 순서대로 돌려야하는데?
  let count = 0;

  while (data.length !== 0) {
    const len = data.length;
    const value = data.pop();
    if ((value.time - count) * len > k) {
      data.push(value);
      data.sort((a, b) => a.number - b.number);
      //원래 순서대로 돌린 다음에,
      return data[k % len].number;
    }

    k -= len * (value.time - count);
    count = value.time;
  }
  return -1;
}

const food_times = [3, 1, 2];
const k = 5;
const r = solution(food_times, k);
console.log({ r });
