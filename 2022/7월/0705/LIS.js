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

function gcd(a, b) {
  [a, b] = [a > b ? a : b, a > b ? b : a];

  if (b === 0) return a;

  return gcd(b, a % b);
}
console.log(gcd(12, 18));
//12와 18의 최대 공약수는..
