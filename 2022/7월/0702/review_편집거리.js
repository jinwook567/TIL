function solution(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;

  //y축을 str1, x축을 str2
  const d = Array(len1 + 1)
    .fill()
    .map(() => Array(len2 + 1).fill(0));

  for (let i = 1; i <= len1; i++) {
    d[i][0] = i;
  }

  for (let i = 1; i <= len2; i++) {
    d[0][i] = i;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
        d[i][j] = d[i - 1][j - 1];
      } else {
        d[i][j] = Math.min(d[i - 1][j - 1], d[i - 1][j], d[i][j - 1]) + 1;
      }
    }
  }
  console.log(d);
  return d[len1][len2];
}

const r = solution("MIC", "NC");
console.log(r);
