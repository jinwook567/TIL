const numbers = [1, 10, 5, 3, 2, 2, 9, 8];
function sort(numbers) {
  //첫 번쨰는 이미 정렬되었다고 가정.
  for (let i = 1; i < numbers.length; i++) {
    //i를 올바른 위치에 삽입 하기.
    for (let k = i; k > 0; k--) {
      if (numbers[k] < numbers[k - 1]) {
        [numbers[k], numbers[k - 1]] = [numbers[k - 1], numbers[k]];
      } else {
        break;
      }
    }
  }
  return numbers;
}

const r = sort(numbers);
console.log(r);
