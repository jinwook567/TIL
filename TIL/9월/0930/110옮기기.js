//아래 알고리즘은 틀렸음. 문자열 사이 아무데나 넣을 수 있어야함.
function solution(s) {
  return s.map((v) => {
    const arr = v.split("110");
    const cnt = arr.length - 1;

    const example = ["0", "01", "001", "011", "100", "101", "10"];
    let sum = "";
    let flag = false;

    for (let element of arr) {
      if (flag) {
        sum += element;
      } else {
        if (example.includes(element.slice(0, 3))) {
          sum += element;
        } else {
          sum += "110".repeat(cnt);
          flag = true;
          sum += element;
        }
      }
    }
    return sum;
  });
}

const s = ["1110", "100111100", "0111111010"];
const r = solution(s);
console.log(r);
