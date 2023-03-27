function diffCount(str1, str2) {
  let cnt = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1.charAt(i) !== str2.charAt(i)) cnt++;
  }
  return cnt;
}

function solution(begin, target, words) {
  let answer = Infinity;
  function dfs(begin, target, words, cnt) {
    if (words.length === 0) return;
    if (begin === target) {
      if (cnt === 2) console.log(begin, words, target);
      answer = Math.min(answer, cnt);
      return;
    }
    words.forEach((wd, index) => {
      const count = diffCount(begin, wd);

      if (count === 1) {
        dfs(
          wd,
          target,
          words.filter((_, i) => i !== index),
          cnt + 1
        );
      }
    });
  }
  dfs(begin, target, words, 0);
  return answer === Infinity ? 0 : answer;
}

const begin = "hit";
const target = "cog";
const words = ["hot", "dot", "dog", "lot", "log", "cog"];
const r = solution(begin, target, words);
console.log(r);
