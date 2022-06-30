const numbers = [1, 10, 5, 3, 2, 2, 9, 8];
function sort(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    let min = Infinity;
    let index;
    for (let j = i; j < numbers.length; j++) {
      if (min > numbers[j]) {
        min = numbers[j];
        index = j;
      }
    }
    [numbers[i], numbers[index]] = [numbers[index], numbers[i]];
  }
  return numbers;
}

const r = sort(numbers);
console.log(r);
