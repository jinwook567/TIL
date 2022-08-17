function solution(s) {
  const loopTimes = Math.floor(s.length / 2);
  if (s.length <= 1) return 1;

  function pressString(i) {
    let sameCount = 0;
    let pressed = "";
    let previous;
    let now;
    for (let j = i; j < s.length; j += i) {
      previous = s.slice(j - i, j);
      now = s.slice(j, j + i);
      if (previous === now) {
        sameCount++;
      } else {
        pressed += `${sameCount !== 0 ? sameCount + 1 : ""}${previous}`;
        sameCount = 0;
      }
    }
    //맨 마지막 요소 더해줌.
    pressed += `${sameCount !== 0 ? sameCount + 1 : ""}${now}`;
    return pressed.length;
  }

  //이전의 것과 비교하고 싶다.
  let min = Infinity;
  for (let i = 1; i <= loopTimes; i++) {
    const pressedLength = pressString(i);
    if (min > pressedLength) min = pressedLength;
  }

  return min;
}

function solution2(s) {
  //문자의 절반 이상의 숫자는 반복될 수 없음.
  //절반까지 dfs탐색을 한 후, 길이 배열을 리턴하고, min값을 보내줘야한다.
  let answer = s.length;
  const results = [];
  if (s.length === 1) return 1;
  //모든 조합을 만들어봐야함.
  //문자열 길이의 1/2 이상은 의미가 없음. 축약이 불가능하기 때문에.
  function dfs(s, num) {
    if (num > s.length / 2) return;
    //축약된 string을 만들 필요는 없다. 길이만 알면 된다.
    let length = 0;
    let str = "";
    let sameCount = 0;
    let same = false;
    for (let i = 1; i <= Math.floor(s.length / num) + 1; i++) {
      //첫 번째는 비교대상 없음, 마지막 배열도 넣어주기 위해서 s.length도 루프 돌도록 하였음.
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

console.log(solution("aabbaccc"));
