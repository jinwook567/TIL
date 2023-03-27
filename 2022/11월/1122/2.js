function solution(S) {
  const s = [...S];
  let flag = false;
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] > s[i + 1]) {
      s[i] = null;
      flag = true;
      break;
    }
  }
  if (!flag) {
    s[s.length - 1] = null;
  }
  return s.filter((v) => v).join("");
}
