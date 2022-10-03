const isNumber = (str) => !isNaN(Number(str));

function solution(compressed) {
  function decompress(compressed) {
    let decompressed = "";
    const regex = new RegExp(/[\(\)]/g);
    if (!regex.test(compressed)) return compressed;

    let numbers = [];
    let flag = false;
    let tagCnt = 0;
    for (let i = 0; i < compressed.length; i++) {
      if (isNumber(compressed[i])) {
        numbers.push(compressed[i]);
        continue;
      }

      if (compressed[i] === "(") {
        tagCnt++;
        flag = true;
      }

      if (flag) {
        for (let j = i + 1; j < compressed.length; j++) {
          if (compressed[j] === "(") tagCnt++;
          if (compressed[j] === ")") tagCnt--;

          if (tagCnt === 0) {
            const number = Number(numbers.join(""));
            decompressed += decompress(compressed.slice(i + 1, j)).repeat(number);
            i = j;
            flag = false;
            numbers = [];
            break;
          }
        }
      } else {
        decompressed += compressed[i];
      }
    }
    return decompressed;
  }
  return decompress(compressed);
}

const compressed = "2(2(hi)2(co))x2(bo)";
const compressed3 = "x2(hi)";
const compressed4 = "10(p)";
const r = solution(compressed4);
console.log({ r });
