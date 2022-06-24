function solution(money) {
  const coins = [500, 100, 50, 10];
  let count = 0;
  let left = money;

  for (let i = 0; i < coins.length; i++) {
    const can = Math.floor(left / coins[i]);
    count += can;
    left -= can * coins[i];
  }
  return count;
}

const r = solution(1260);
console.log(r);
