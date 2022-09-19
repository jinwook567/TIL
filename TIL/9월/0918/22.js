function getNewOrder(orders, excludedPerson) {
  return orders.map((arr) => arr.filter((v) => v !== excludedPerson));
}

function solution(orders) {
  const answer = [];
  const targetCnt = orders[0].length % 2 === 0 ? orders[0].length / 2 : (orders[0].length + 1) / 2;

  function recursive(orders, times) {
    times++;

    const obj = {};
    orders.forEach((preference) => {
      const vote = preference[0];
      if (obj[vote]) obj[vote] += 1;
      else obj[vote] = 1;
    });

    const arr = Object.entries(obj).map((v) => [+v[0], v[1]]);

    const overTargetCnt = arr.filter((v) => v[1] >= targetCnt);
    if (overTargetCnt.length > 0) {
      answer[1] = overTargetCnt.sort((a, b) => b[0] - a[0])[0][0];
      answer[0] = times;
      return;
    }

    const min = Math.min(...arr.map((v) => v[1]));
    const excluded = arr.filter((v) => v[1] === min).sort((a, b) => a[0] - b[0])[0];

    const n_orders = getNewOrder(orders, excluded[0]);
    recursive(n_orders, times);
  }
  recursive(orders, 0);
  return answer;
}

const orders = [
  [2, 3, 4, 0, 1],
  [1, 4, 3, 2, 0],
  [4, 1, 0, 2, 3],
  [3, 2, 1, 4, 0],
  [0, 3, 2, 1, 4],
];
const r = solution(orders);
console.log(r);
