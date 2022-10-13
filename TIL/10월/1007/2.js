//일단 배열은 순서대로 있다. 만약 n이 3이라먄 [1,2,3] 형태이다.
//부분 연속이라는 것은, 위치를 바꾸어서는 안된다. 위치가 안바뀌꼬 안에 있다면 부분 연속이다.

function getMaximumRemovals(order, source, target) {
  const s = [...source];
  const t = [...target];

  const check = (s, t) => {
    for (let i = 0, j = 0; i < s.length; i++) {
      if (s[i] === t[j]) j++;
      if (j === t.length) return true;
    }
    return false;
  };

  let answer = 0;

  for (let i = 0; i < order.length; i++) {
    s[order[i] - 1] = "-";
    if (check(s, t)) {
      answer++;
    } else {
      break;
    }
  }
  return answer;
}

const c = check(["s"], ["d"]);
console.log(c);

const order = [1, 4, 2, 3, 5];
const source = "hkbdi";
const target = "kd";

const r = getMaximumRemovals(order, source, target);
console.log(r);
