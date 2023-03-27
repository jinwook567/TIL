function check(s) {
  const match = {
    "]": "[",
    "}": "{",
    ")": "(",
  };
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const str = s.charAt(i);
    if (str === "[" || str === "{" || str === "(") {
      stack.push(str);
    } else {
      const out = stack.pop();
      if (match[str] !== out) return false;
    }
  }
  return stack.length === 0 ? true : false;
}

function rotate(str) {
  const s = [...str];
  const f = s[0];
  for (let i = 0; i < s.length - 1; i++) {
    s[i] = s[i + 1];
  }
  s[s.length - 1] = f;
  return s.join("");
}

function solution(s) {
  const len = s.length - 1;
  let cnt = 0;

  for (let i = 0; i < len; i++) {
    if (check(s)) cnt++;
    s = rotate(s);
  }
  return cnt;
}

const r = solution("[](){}");
console.log(rotate("{}"));
console.log(r);
