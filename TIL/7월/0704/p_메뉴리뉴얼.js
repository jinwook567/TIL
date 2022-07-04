const orders = ["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"];
const course = [2, 3, 4];

function getCombination(arr, n) {
  const result = [];
  if (n === 1) return arr.map((v) => [v]);
  arr.forEach((v, i) => {
    const rest = arr.slice(i + 1);
    const combination = getCombination(rest, n - 1);
    const attached = combination.map((el) => [v, ...el]);
    result.push(...attached);
  });

  return result;
}

function solution(orders, course) {
  //최소 2개의 단품 메뉴 조합, 최소 2명 이상의 손님들에게 주문을 받아야함.
  const result = [];
  orders = orders.map((el) => [...el].sort((a, b) => (a > b) - (a < b)).join(""));

  course.forEach((count) => {
    const combination = [];
    orders.forEach((order) => {
      if (order.length < count) return;
      combination.push(...getCombination([...order], count).map((v) => v.join("")));
    });

    //combination을 돌면서 같은 것들이 있는지 찾기.
    const map = new Map();
    let max = 0;
    combination.forEach((el) => {
      const c = map.get(el) ? map.get(el) : 0;
      map.set(el, c + 1);
      max = Math.max(max, c + 1);
    });

    for (let [menu, count] of map) {
      if (count === max && max >= 2) result.push(menu);
    }
  });

  return result.sort((a, b) => (a > b) - (a < b));
}
//가장 많이..

solution(orders, course);
