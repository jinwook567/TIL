function solution(num) {
  let sum = 0;
  //왼쪽으로 갈 때는 더하고, 오른쪽으로 갈 때는 빼고

  const numbers = [...num].map((v) => Number(v));
  for (let i = 0; i < numbers.length; i++) {
    if (i < numbers.length / 2) {
      sum += numbers[i];
    } else {
      sum -= numbers[i];
    }
  }

  return sum === 0 ? "LUCKY" : "READY";
}

console.log(solution("1111"));
