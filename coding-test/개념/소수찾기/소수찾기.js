//n까지의 소수를 찾아라.
function solution(n) {
  function isPrime(num) {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) return false;
    }
    return true;
  }

  function improvedIsPrime(num) {
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
  //개선된 isPrime 함수 루트 num 이하만 검사한다.

  const primeNums = [];

  for (let i = 2; i < n; i++) {
    if (improvedIsPrime(i)) primeNums.push(i);
  }
}

//에라토스 테네스의 체
function solution2(n) {
  const nums = [false, false, ...Array(n - 1).fill(true)];
  //0,1 false

  for (let i = 2; i * i <= n; i++) {
    if (nums[i]) {
      for (let j = i * 2; j <= n; j += i) {
        nums[j] = false;
      }
    }
  }

  const results = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) results.push(i);
  }

  return results;
}

console.log(solution2(10));
