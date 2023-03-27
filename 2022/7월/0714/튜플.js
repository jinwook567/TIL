function solution(s) {
  //{{}}을 []로 바꾼다면 array로 인식할 수 있는가?
  s = s.substring(1, s.length - 1);

  const str = [...s];
  const num = str.reduce((acc, cur) => (cur === "{" ? ++acc : acc), 0);

  const arr = Array(num)
    .fill()
    .map((_) => []);

  let i = 0;
  let k = 0;
  let number = "";
  while (k < s.length) {
    if (str[k] !== "{" && str[k] !== "}" && str[k] !== ",") {
      if (Number.isInteger(+str[k + 1])) {
        number += str[k];
      } else {
        arr[i].push(Number(number + str[k]));
        number = "";
      }
    }
    if (str[k] === "}") i++;
    k++;
  }
  console.log(arr);

  const result = new Set();

  for (let i = 1; i <= num; i++) {
    const numbers = arr.find((v) => v.length === i);
    numbers.forEach((num) => {
      result.add(num);
    });
  }
  return [...result];
}

const s = "{{2},{2,1},{2,1,3},{2,1,3,4}}";
const s2 = "{{4,2,3},{3},{2,3,4,1},{2,3}}";
const s3 = "{{123}}";

const r = solution(s);

console.log(r);

function solution2(s) {
  const arr = JSON.parse(s.replace(/{/g, "[").replace(/}/g, "]"));
  const set = new Set();

  for (let i = 1; i <= arr.length; i++) {
    const array = arr.find((v) => v.length === i);
    array.forEach((v) => set.add(v));
  }
  return [...set];
}

solution2(s);
