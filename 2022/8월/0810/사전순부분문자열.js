function solution(s) {
  const array = [...s];
  const stack = [];

  for (let i = 0; i < array.length; i++) {
    while (stack[stack.length - 1] < array[i] && stack.length !== 0) {
      stack.pop();
    }
    stack.push(array[i]);
  }

  return stack.join("");
}
const s = "yxyc";
const r = solution(s);
console.log(r);
