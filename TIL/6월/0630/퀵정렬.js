const numbers = [1, 10, 5, 3, 2, 2, 9, 8];

function sort(numbers) {
  function recursion(numbers) {
    if (numbers.length <= 1) return numbers;
    const pivot = numbers[0];
    const rest = numbers.slice(1);
    const left = rest.filter((v) => v <= pivot);
    const right = rest.filter((v) => v > pivot);
    return [...recursion(left), pivot, ...recursion(right)];
  }
  return recursion(numbers);
}
const r = sort(numbers);
console.log(r);

function sort2(numbers) {
  function recursion(numbers, start, end) {
    if (start >= end) return;

    let pivot = start;
    let left = start + 1;
    let right = end;

    while (left <= right) {
      console.log(right);
      //피벗보다 큰 것을 찾고 왼쪽서부터, 피벗보다 작은 것을 오른쪽에서부터 찾는다.
      //left를 찾을 때 까지 수행
      while (left <= end && numbers[left] <= numbers[pivot]) {
        left++;
      }

      while (right > start && numbers[right] >= numbers[pivot]) {
        right--;
      }

      if (left > right) {
        [numbers[pivot], numbers[right]] = [numbers[right], numbers[pivot]];
      } else {
        [numbers[left], numbers[right]] = [numbers[right], numbers[left]];
      }
    }
    recursion(numbers, start, right - 1); //right와 pivot을 바꿨으니까.
    recursion(numbers, right + 1, end);
  }
  recursion(numbers, 0, numbers.length - 1);
  return numbers;
}
const r2 = sort2(numbers);
console.log({ r2 });
