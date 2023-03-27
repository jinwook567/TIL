//permutation을 구한 다음에, 1~numbers의 숫자만큼 뽑아본다.
//그리고 동일한 값이 있을 수 있기 때문에, 중복을 제거해주어야한다.
//set으로 그냥 한번에 제거해주도록 하겠다.
//그 다음에 소수를 판별하는 알고리즘을 작성하여 마무리하면 된다.
function getPermutation(arr, n) {
  const result = [];
  if (n === 1) return arr.map((el) => [el]);

  arr.forEach((v, i) => {
    const rest = arr.filter((_, index) => index !== i);
    const permutation = getPermutation(rest, n - 1);
    const attached = permutation.map((el) => [v, ...el]);
    result.push(...attached);
  });
  return result;
}

function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function solution(numbers) {
  numbers = numbers.split("");
  let arr = [];
  for (let i = 1; i <= numbers.length; i++) {
    const permutation = getPermutation(numbers, i);
    arr.push(...permutation);
  }

  const arr2 = arr.map((v) => v.join("")).map(Number);
  const set = new Set(arr2);

  return [...set].map(Number).reduce((acc, cur) => (isPrime(cur) ? ++acc : acc), 0);
}

const numbers = "011";
const r = solution(numbers);
console.log(r);
