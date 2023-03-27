function factorial(n) {
  if (n === 1) return n;
  return n * factorial(n - 1);
}

function solution(n, k) {
  const numbers = Array(n)
    .fill()
    .map((_, i) => i + 1);

  function recursion(arr, k) {
    //factorial 체크 후 숫자 만들어 나가기..

    if (arr.length === n) return arr;
    let i = 1;

    while (!(factorial(i + 1) > k && factorial(i) <= k)) {
      i++;
    }

    console.log(arr, k, i);
    const first = Math.floor(k / factorial(i)) + 1;

    k = k % factorial(i);
    return recursion([...arr, first], k);
  }
  recursion([], 5);
}

solution(3, 5);
