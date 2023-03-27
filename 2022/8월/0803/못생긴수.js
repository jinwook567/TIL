const arr = [1];
const n = 11;

let [t2, t3, t5] = [0, 0, 0];

while (arr.length < n) {
  let a2 = 2 * arr[t2];
  let a3 = 3 * arr[t3];
  let a5 = 5 * arr[t5];

  const number = Math.min(a2, a3, a5);
  if (number === a2) {
    t2++;
  }

  if (number === a3) {
    t3++;
  }

  if (number === a5) {
    t5++;
  }
  arr.push(number);
}

console.log(arr[n - 1]);
