function solution(example) {
  const str = [];
  const num = [];

  for (let i = 0; i < example.length; i++) {
    if (!Number(example.charAt(i))) {
      str.push(example.charAt(i));
    } else {
      num.push(Number(example.charAt(i)));
    }
  }

  str.sort((a, b) => (a > b) - (a < b));
  const sumStr = str.reduce((acc, cur) => acc + cur, "");
  let sumNum = num.reduce((acc, cur) => acc + cur, 0);
  sumNum === 0 ? (sumNum = "") : sumNum;
  //숫자가 없는 경우 0이 들어가는데 이러면 안됨.
  return `${sumStr}${sumNum}`;
}

const r = solution("KKACB");
console.log(r);
