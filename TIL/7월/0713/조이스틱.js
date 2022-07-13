//앞으로 가면서 체크
//뒤로 가면서 체크
//2의 20승이네 완전 탐색으로도 찾을 수 있었네..
function check_toward(name, target, i) {
  let cnt = 0;
  while (true) {
    if (name[i] !== target[i]) break;

    cnt++;
    i === name.length - 1 ? (i = 0) : i++;
  }
  return { cnt, i };
}

function check_back(name, target, i) {
  let cnt = 0;
  while (true) {
    if (name[i] !== target[i]) break;
    i === 0 ? (i = name.length - 1) : i--;
    cnt++;
  }
  return { cnt, i };
}

function change(str1, str2, i) {
  const index1 = str1.charCodeAt(i) - 65;
  const index2 = str2.charCodeAt(i) - 65;
  const totalNum = 90 - 65 + 1;

  const a = Math.abs(index2 - index1);
  const b = totalNum - a;

  return Math.min(a, b);
}

function solution(name) {
  let target = Array(name.length).fill("A").join("");
  let i = 0;
  let count = 0;

  while (target !== name) {
    const { cnt: cnt_back, i: i_back } = check_back(name, target, i);
    const { cnt: cnt_toward, i: i_toward } = check_toward(name, target, i);

    if (cnt_toward <= cnt_back) {
      count += cnt_toward;
      const updown = change(target, name, i_toward);
      count += updown;
      const target_arr = [...target];
      target_arr[i_toward] = name.charAt(i_toward);
      target = target_arr.join("");
      i = i_toward;
      console.log("to", i);
    } else {
      count += cnt_back;
      count += change(target, name, i_back);
      const target_arr = [...target];
      target_arr[i_back] = name.charAt(i_back);
      target = target_arr.join("");
      i = i_back;
      console.log("ba", i);
    }
  }
  return count;
}

const r = solution("ABABAAAAABA");

console.log(r);
