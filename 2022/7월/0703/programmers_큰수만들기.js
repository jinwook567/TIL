// https://programmers.co.kr/learn/courses/30/lessons/42883?language=javascript

// 맞왜틀..
// stack을 이용하면 풀 수 있다..?
function solution(number, k) {
  const numbers = [...number].map(Number);
  const max = Math.max(...numbers);

  //max값을 찾을 때 까지 계속 짜르면서 나아간다.

  const maxIndex = numbers.findIndex((v) => v === max);

  //maxIndex 뒤에서 부터는 앞에서부터 i-1이 i보다 작으면 자르면 된다.
  function getAnswer(numbers, maxIndex, k) {
    const rest = numbers.slice(maxIndex, numbers.length);
    let left = k - maxIndex;
    let i = 0;
    while (left > 0) {
      if (rest[i] < rest[i + 1]) {
        left--;
        delete rest[i];
      }
      i++;
    }
    return rest.map((v) => v).join("");
  }

  if (k >= maxIndex) {
    return getAnswer(numbers, maxIndex, k);
  } else {
    //k까지 최댓값을 찾아야해.
    const beforeK = numbers.slice(0, k + 1);
    const m = Math.max(...beforeK);
    const mIndex = beforeK.findIndex((v) => v === m);
    return getAnswer(numbers, mIndex, k);
  }
}
