const d = Array(100).fill(0);

//top down
function pibo(x) {
  if (x === 1 || x === 2) return 1;
  if (d[x] !== 0) return d[x];
  d[x] = pibo(x - 1) + pibo(x - 2);
  return d[x];
}

//bottom up
function pibo2(x) {
  if (x === 1 || x === 2) return 1;
  d[1] = 1;
  d[2] = 1;
  for (let i = 3; i <= x; i++) {
    d[i] = d[i - 1] + d[i - 2];
  }
  return d[x];
}
const r2 = pibo2(5);
console.log(r2);
