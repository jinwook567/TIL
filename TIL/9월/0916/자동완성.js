function compareStr(standardStr, comparedStr) {
  for (let i = 0; i < standardStr.length; i++) {
    if (standardStr.charAt(i) !== comparedStr.charAt(i)) return false;
  }
  return true;
}

//g에 대해서, 단어들에 대해서 검증한다.
function getIsOverOne(str, words) {
  let cnt = 0;
  for (let i = 0; i < words.length; i++) {
    if (compareStr(str, words[i])) cnt++;
    if (cnt > 1) return false;
  }
  return true;
}

function solution(words) {
  const set = new Set();
  let answer = 0;

  words.forEach((word) => {
    let accStr = "";
    for (let i = 0; i < word.length; i++) {
      accStr += word.charAt(i);
      if (set.has(accStr)) continue;

      set.add(accStr);
      if (getIsOverOne(accStr, words)) break;
    }
    answer += accStr.length;
  });
  return answer;
}

const words = ["word", "war", "warrior", "world"];
const r = solution(words);
console.log(r);
