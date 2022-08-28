const isPalindrome = (s, d, i, j) => {
  //i+1, j-1 부분을 재귀적으로 순차적으로 검증해나가면 된다. 만일 다르다면 바로 마무리 하면 되고,
  //i+1, j-1 부분이 true이고, 맨 바깥쪽도 일치한다면 멈춰도 좋다.
  if (d[i][j]) return true;
  while (i <= j) {
    if (s.charAt(i) !== s.charAt(j)) return false;
    if (d[++i][--j]) break;
  }
  return true;
};

function solution(s) {
  let answer = 0;
  const len = s.length;
  const d = Array(len)
    .fill()
    .map((_) => Array(len).fill(false));

  for (let i = 0; i < len; i++) {
    d[i][i] = true;
  }

  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      if (j - i + 1 < answer) continue;
      if (isPalindrome(s, d, i, j)) {
        answer = Math.max(answer, j - i + 1);
        d[i][j] = true;
      }
    }
  }
  return answer;
}

const s = "ABCCBA";
const r = solution(s);
console.log(r);
