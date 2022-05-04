function solution(s) {
  //문자열 길이의 1/2 이상은 의미가 없음. 축약이 불가능하기 때문에.
  //절반까지 재귀함수로 탐색한다.
  //재귀함수의 예외케이스로는, num이 1일 때 작동을 안한다는 것이다. 해당 부분은 처리를 해줘야한다.
  const results = [];
  if (s.length === 1) return 1;
  function dfs(s, num) {
    if (num > s.length / 2) return;
    let str = "";
    let sameCount = 0;
    let same = false;
    for (let i = 1; i <= Math.floor(s.length / num) + 1; i++) {
      const compareA = s.slice((i - 1) * num, i * num);
      const compareB = s.slice(i * num, (i + 1) * num);

      if (compareA === compareB) {
        same = true;
        sameCount++;
      } else {
        if (same) {
          str += sameCount !== 0 ? `${sameCount + 1}${compareA}` : compareA;
          sameCount = 0;
        } else {
          str += compareA;
        }
      }
    }
    results.push(str.length);
    dfs(s, num + 1);
  }
  dfs(s, 1);
  return Math.min(...results);
}

function refactoring(s) {
  //리팩토링 없음.
}
