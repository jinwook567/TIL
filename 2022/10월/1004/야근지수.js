function solution(n, works) {
  if (works.reduce((acc, cur) => acc + cur, 0) <= n) return 0;

  const findNext = (num, arr) => {
    arr.sort((a, b) => b - a);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < num) return arr[i];
    }
    return null;
  };
  //null이라면 배열 내 원소가 모두 같은 크기라는 것임.

  //가장 큰 수를, 다음 큰 수 만큼 줄여나가면 된다.
  works.sort((a, b) => b - a);
  while (n > 0) {
    const targetNum = findNext(works[0], works);
    if (!targetNum) {
      //전부 같은 크기로 빼준다.
      works = works.map((v) => v - Math.floor(n / works.length));
      for (let i = 0; i < n % works.length; i++) {
        works[i] -= 1;
      }
      break;
    } else {
      const diff = works[0] - targetNum;
      const diff2 = n > diff ? diff : n;
      n -= diff2;
      works[0] -= diff2;
    }
  }
  return works.reduce((acc, cur) => acc + cur * cur, 0);
}

const works = [2, 1, 2];
const n = 1;
const r = solution(n, works);
console.log(r);
