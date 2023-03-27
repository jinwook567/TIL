function check_foward(name, target, i) {
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
  let min = Infinity;
  let target = Array(name.length).fill("A").join("");
  //왼쪽으로 존나 가는 재귀, 오른쪽으로 존나 가는 재귀..

  function dfs(acc, i, target) {
    if (target[i] !== name[i]) {
      const upDownCount = change(target, name, i);
      acc += upDownCount;
      const target_arr = [...target];
      target_arr[i] = name.charAt(i);
      target = target_arr.join("");
    }

    if (target === name) {
      min = Math.min(acc, min);
      return;
    }
    const { cnt: cnt_back, i: i_back } = check_back(name, target, i);
    const { cnt: cnt_foward, i: i_foward } = check_foward(name, target, i);

    dfs(acc + cnt_back, i_back, target);
    dfs(acc + cnt_foward, i_foward, target);
  }
  dfs(0, 0, target);
  return min;
}

const r = solution("JEROEN");
// const r2 = solution("B");
console.log(r);
