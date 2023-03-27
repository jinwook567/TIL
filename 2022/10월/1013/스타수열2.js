function solution(a) {
  const obj = {};
  a.forEach((v) => {
    if (!obj[v]) obj[v] = 1;
    else obj[v] += 1;
  });

  //전부 순서대로 검증해봐야함.
  const sameNumberCounts = Object.entries(obj).sort((a, b) => b[1] - a[1]);
  let answer = 0;

  for (let [number, cnt] of sameNumberCounts) {
    number = Number(number);
    if (answer > cnt) break;

    let len = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i + 1] === undefined) continue;

      if (a[i] === number && a[i + 1] !== number) {
        len += 2;
        i++;
        continue;
      }

      if (a[i] !== number && a[i + 1] === number) {
        len += 2;
        i++;
        continue;
      }
    }
    answer = Math.max(answer, len);
  }
  return answer;
}

const a = [5, 2, 3, 3, 5, 3];
const r = solution(a);
console.log({ r });
