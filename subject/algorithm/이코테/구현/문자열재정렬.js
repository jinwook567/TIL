function solution(str) {
  const strings = str.match(/[A-Z]/g) ?? [];
  const numbers = str.match(/[0-9]/g);

  const sum = numbers ? numbers.reduce((acc, cur) => acc + Number(cur), 0) : "";
  strings.sort((a, b) => (a > b) - (a < b));
  //true(1) - false(0)
  return `${strings.join("")}${sum}`;
}

console.log(solution("AB"));
