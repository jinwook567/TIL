let acc = "";
function solution(str) {
  if (str === undefined) return acc.length !== 0 ? acc.slice(0, acc.length - 1) : "";

  acc += `${str} `;
  return solution;
}

const r = solution("hello")("world")();
console.log({ r });
