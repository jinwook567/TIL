const numbers = [1, 2, 3, 8, 4, 5, 10, 11];
function LIS(numbers) {
  const d = Array(numbers.length + 1).fill(0);
  for (let i = 1; i < numbers.length; i++) {
    d[i] = 1;
    for (let j = 0; j < i; j++) {
      if (numbers[j] < numbers[i]) {
        d[i] = Math.max(d[j] + 1, d[i]);
      }
    }
  }
  return Math.max(...d);
}

console.log(LIS(numbers));
