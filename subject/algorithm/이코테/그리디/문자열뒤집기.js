function solution(num) {
  const arr = [...num];
  let count0 = 0;
  let count1 = 0;
  let before = "";

  for (let i = 0; i < arr.length; i++) {
    if (before !== arr[i]) {
      arr[i] === "0" ? count0++ : count1++;
    }
    before = arr[i];
  }
  return Math.min(count0, count1);
}

console.log(solution("1001101"));
