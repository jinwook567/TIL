function solution(coins) {
  //i를 증가시켜 나가면서 검증하는 것이다. 배열을 오름차순으로 정렬하고, 배열을 작은 집합으로 쪼개서, 하나씩 증가하면서 알아보는 전략이다.
  coins.sort((a, b) => a - b);
  let target = 1;

  for (let i = 0; i < coins.length; i++) {
    if (target < coins[i]) break;
    target += coins[i];
  }
  return target;
}

const coins = [3, 2, 1, 1, 9];
const r = solution(coins);
console.log(r);
