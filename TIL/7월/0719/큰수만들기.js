function solution(number, k) {
  const stack = [];
  //쌓아둔 형태가 그대로 유지되기 때문에.

  number = number.split("").map(Number);
  const len = number.length - k;

  let i = 0;

  while (i < number.length) {
    while (k > 0 && stack.length !== 0 && stack[stack.length - 1] < number[i]) {
      stack.pop();
      k--;
    }

    stack.push(number[i]);
    i++;
  }

  return stack.length === len ? stack.join("") : stack.slice(0, len).join("");
}

const number = "1924";
const k = 2;

const r = solution(number, k);
console.log({ r });
