function solution(str) {
  //문자열을 반으로 압축하는게 최대의 경우

  //비교할 때는 문자열 slice해버리자.

  // slice(i, j) i번째부터 시작해서 j째까지 slice됨.
  const len = str.length;
  let result = 1001;

  if (len === 1) return len;
  //1개부터 비교하는데, str의 길이가 1개면 루프가 돌아가지 않음.
  for (let i = 1; i < Math.floor(len); i++) {
    //i는 비교 숫자
    let count = 0;
    let same = 1;
    for (let j = 0; j < len; j += i) {
      let now = str.slice(j, j + i);
      let next = str.slice(j + i, j + i * 2);

      if (now === next) {
        same++;
      } else {
        count += same === 1 ? now.length : `${same}`.length + now.length;
        same = 1;
      }
    }
    result = Math.min(result, count);
  }
  return result;
}

const r = solution("a");
console.log(r);
