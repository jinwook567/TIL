function solution(n, works) {
  function recursive(n, works) {
    if (n === 0) return works.reduce((acc, cur) => acc + cur * cur, 0);

    works.sort((a, b) => b - a);
    if (works[0] === 0) return 0;

    works[0] -= 1;
    return recursive(n - 1, works);
  }
  return recursive(n, works);
}

const r = solution(n, works);
console.log(r);
