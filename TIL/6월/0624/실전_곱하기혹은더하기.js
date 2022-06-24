function solution(example) {
  const numbers = [...example].map(Number);

  let answer = numbers[0];

  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i + 1] === 0 || numbers[i + 1] === 1 || numbers[i] === 0 || numbers[i] === 1) {
      answer += numbers[i + 1];
    } else {
      answer *= numbers[i + 1];
    }
  }
  console.log(answer);
}

const example = "02984";
solution("123");
solution("321");
//아 숫자의 위치를 바꿀 수 없구나..ㅎㅎ
