function getCount(str, target) {
  const code = str.charCodeAt(0);
  const targetCode = target.charCodeAt(0);

  return Math.min(90 - 65 - Math.abs(targetCode - code) + 1, Math.abs(targetCode - code));
}

function findNotA(str) {
  return [...str].reduce((acc, cur, i) => (cur !== "A" ? [...acc, i] : acc), []);
}

function solution(name) {
  let answer = Infinity;
  function dfs(str, acc, position) {
    if ([...str].every((v) => v === "A")) {
      answer = Math.min(answer, acc);
      return;
    }
    const indexs = findNotA(str);
    indexs.forEach((i) => {
      const arr = [...str];
      const count = getCount(arr[i], "A");
      const move = Math.min(str.length - 1 - i + position + 1, Math.abs(position - i));
      arr[i] = "A";
      dfs(arr.join(""), acc + count + move, i);
    });
  }
  dfs(name, 0, 0);
  return answer;
}

const name = "R";
const r = solution(name);
console.log(r);
