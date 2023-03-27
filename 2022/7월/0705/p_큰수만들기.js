function solution(number, k) {
  //큰 게 나오면 앞에꺼를 제거해나가면 됨.
  //맨 아래 깔린게 가장 큰 값이기 때문에.
  const stack = [];
  const numbers = [...number].map(Number);

  for (let i = 0; i < number.length; i++) {
    if (k === 0) {
      stack.push(numbers[i]);
      continue;
    }

    while (stack[stack.length - 1] < numbers[i] && k > 0) {
      stack.pop();
      k--;
    }

    stack.push(numbers[i]);
  }
  return stack.slice(0, stack.length - k).join("");
}
