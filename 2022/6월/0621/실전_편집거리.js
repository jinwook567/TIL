function solution(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;

  const d = Array(len1 + 1)
    .fill()
    .map(() => Array(len2 + 1).fill(0));

  //초기값
  for (let i = 0; i <= len1; i++) {
    d[i][0] = i;
  }

  for (let i = 0; i <= len2; i++) {
    d[0][i] = i;
  }

  //루프
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i] === str2[j]) {
        d[i][j] = d[i - 1][j - 1];
      } else {
        d[i][j] = Math.min(d[i - 1][j - 1], d[i][j - 1], d[i - 1][j]) + 1;
      }
    }
  }

  //리턴
  return d[len1][len2];
}

const r = solution("sunday", "saturday");
console.log(r);
//5000보다 작거나 같기 때문에 사실 재귀로 풀기는 쉽지 않아..
