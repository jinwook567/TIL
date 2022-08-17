function solution(p) {
  function revision(s) {
    let cnt = "";
    let leftCount = 0;
    let rightCount = 0;
    if (s === "") {
      return "";
    }

    for (let i = 0; i < s.length; i++) {
      if (s[i] === "(") {
        leftCount++;
      } else {
        rightCount++;
      }

      if (leftCount === rightCount) {
        //어차피 새로운 함수가 실행되니 count를 초기화 할 필요없음.

        const u = s.slice(0, i + 1);
        const v = s.slice(i + 1);

        if (checkIsRightString(u)) {
          cnt += u + revision(v);
        } else {
          cnt += "(";
          cnt += revision(v);
          cnt += ")";
          for (str of u.slice(1, u.length - 1)) {
            cnt += str === "(" ? ")" : "(";
          }
        }
        return cnt;
      }
    }
  }
  const answer = revision(p);
  return answer;
}

function makeCorrectString(s) {
  let sliced = s.slice(1, s.length - 1);
  let result = "";
  for (string of sliced) {
    if (string === "(") {
      result += ")";
    } else {
      result += "(";
    }
  }
  return "(" + result + ")";
}

const checkIsRightString = (str) => {
  if (str[0] === ")") return false;
  let stack = 0;
  for (let i = 0; i < str.length; i++) {
    stack = str[i] === "(" ? stack + 1 : stack - 1;
    if (stack < 0) return false;
  }
  return stack === 0;
};

//2번째 풀이.
function refactoring(p) {
  let balance = 0;
  let pivot = 0;
  //do while로 하면 무조건 do가 한번은 실행한다.
  do {
    p[pivot] === "(" ? balance++ : balance--;
    pivot++;
  } while (count !== 0);

  const u = p.slice(0, i + 1);
  const v = refactoring(p.slice(i + 1));

  //만족하는지..
  if (checkIsRightString(u)) {
    return u + v;
  } else {
    return "(" + v + ")" + reverse(u);
  }
}

function reverse(str) {
  const sliced = str.slice(1, str.length - 1);
  return sliced.map((c) => (c === "(" ? ")" : "("));
}
