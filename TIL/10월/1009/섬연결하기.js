function solution(n, costs) {
  costs.sort((a, b) => a[2] - b[2]);

  const parent = Array(n + 1)
    .fill()
    .map((_, i) => i);

  const findParent = (parent, x) => {
    if (parent[x] !== x) {
      parent[x] = findParent(parent, parent[x]);
    }
    return parent[x];
  };

  const union = (parent, a, b) => {
    a = findParent(parent, a);
    b = findParent(parent, b);
    if (a === b) return true;
    //사이클이 발생한다면 수행하지 않음.
    if (a > b) {
      parent[a] = b;
    } else {
      parent[b] = a;
    }
    return false;
  };

  let sum = 0;
  costs.forEach(([st, end, cost]) => {
    const cycle = union(parent, st, end);
    if (!cycle) sum += cost;
  });
  return sum;
}

const r = solution(n, costs);
console.log(r);
