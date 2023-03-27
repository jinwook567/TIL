const arr = [5, 2, 3];
const k = 2;

let sum = 0;

for (let i = 0; i < k; i++) {
  sum += arr[arr.length - 1 - i];
}

let max = sum;
let index = arr.length - k;
for (let i = arr.length - 1 - k; i >= 0; i--) {
  sum += arr[i];
  sum -= arr[i + k];
  max = Math.max(max, sum);
  if (max === sum) index = i;
}
console.log({ max, index });

const arr2 = [];
