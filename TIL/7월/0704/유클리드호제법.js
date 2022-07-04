function getGCD(a, b) {
  if (b === 0) return a;
  let big = a > b ? a : b;
  let small = a > b ? b : a;

  const r = big % small;
  big = small;
  small = r;
  return getGCD(big, small);
}

function getLCM(a, b) {
  return (a * b) / getGCD(a, b);
}

const r = getGCD(16, 24);
const r2 = getLCM(16, 24);
console.log(r2);
