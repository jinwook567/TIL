function solution(example) {
  const numbers = [...example].map(Number);

  let count0 = 0;
  let count1 = 0;

  numbers[0] === 0 ? count0++ : count1++;

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] !== numbers[i - 1]) {
      numbers[i] === 1 ? count1++ : count0++;
    }
  }

  return Math.min(count0, count1);
}

function solution2(example) {
  const numbers = [...example].map(Number);

  let b = 0;

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] !== numbers[i - 1]) {
      b++;
    }
  }

  let set = b + 1;
  return set % 2 === 0 ? set / 2 : Math.floor(set / 2);
}
