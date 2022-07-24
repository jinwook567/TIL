function compareBeat(a, b) {
  a = a.toString(2);
  b = b.toString(2);
  if (a.length !== b.length) {
    const head = "0".repeat(Math.abs(a.length - b.length));
    if (a.length > b.length) b = head + b;
    else a = head + a;
  }

  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    if (a.charAt(i) !== b.charAt(i)) sum++;
    if (sum > 2) break;
  }
  return sum;
}

function change(arr, i) {
  if (arr[i] === 0) arr[i] = 1;
  else arr[i] = 0;
}

function find(num) {
  let bit = num.toString(2);
  bit = "00" + bit;
  bit = [...bit].map(Number);
  let min = Infinity;

  for (let i = 0; i < bit.length; i++) {
    change(bit, i);
    const cn = parseInt(bit.join(""), 2);
    if (cn > num) min = Math.min(min, cn);

    change(bit, i);
  }

  for (let i = 0; i < bit.length; i++) {
    change(bit, i);
    for (let j = i + 1; j < bit.length; j++) {
      change(bit, j);
      const cn = parseInt(bit.join(""), 2);
      if (cn > num) min = Math.min(min, cn);
      change(bit, j);
    }
    change(bit, i);
  }

  return min;
}

function convert(num) {
  let bit = num.toString(2);
  bit = [...bit].map(Number);
  for (let i = bit.length - 1; i >= 0; i--) {
    if (bit[i] === 0) {
      bit[i] = 1;
      //뒤에 자리 0으로 만들어야한다.
      if (i !== bit.length - 1) bit[i + 1] = 0;
      break;
    }

    if (i === 0) {
      bit[i] = 0;
      bit.unshift(1);
    }
  }

  return parseInt(bit.join(""), 2);
}

console.log(find(5));

console.log(convert(5));

function solution(numbers) {
  return numbers.map((num) => convert(num));
}

const numbers = [2, 7];
const r = solution(numbers);
console.log(r);
