function getCombination(arr, n) {
  const result = [];
  if (n === 1) return arr.map((el) => [el]);

  arr.forEach((v, i) => {
    const rest = arr.slice(i + 1);
    const combination = getCombination(rest, n - 1);
    const attached = combination.map((el) => [v, ...el]);
    result.push(...attached);
  });
  return result;
}

function solution(relation) {
  //every 함수로 간결하게.
  const column = relation[0].length;
  const row = relation.length;

  const unique = [];

  for (let i = 0; i < column; i++) {
    const extract = relation.map((v) => v[i]);
    const isUnique = extract.every((v) => extract.filter((el) => el === v).length === 1);
    if (isUnique) unique.push(i);
  }

  const notUnique = [];
  const result = [];
  for (let i = 0; i < column; i++) {
    const isExist = unique.find((v) => v === i);
    if (isExist === undefined) notUnique.push(i);
  }

  const combination = [];

  for (let i = 2; i <= notUnique.length; i++) {
    combination.push(...getCombination(notUnique, i));
  }

  for (let i = 0; i < combination.length; i++) {
    //모든 result가 현재 combination[i]에 대해서 확인한다.
    let flag = false;
    for (let j = 0; j < result.length; j++) {
      const isExist = result[j].every((v) => combination[i].find((el) => el === v) !== undefined);
      if (isExist) {
        flag = true;
        break;
      }
    }
    if (flag) continue;

    const keys = [];
    for (let j = 0; j < row; j++) {
      let str = "";
      for (let col of combination[i]) {
        str += relation[j][col];
      }
      keys.push(str);
    }

    const isUnique = keys.every((v) => keys.filter((el) => el === v).length === 1);
    if (isUnique) result.push(combination[i]);
  }
  return result.length + unique.length;

  //dfs backtracking으로 구현하자.

  function dfs(arr, i) {
    //result가 arr에 전부 속하는지 확인해야함.
    console.log(arr);
    for (let i = 0; i < result.length; i++) {
      const isExist = result[i].every((v) => arr.find((el) => el === v) !== undefined);
      if (isExist) return;
    }

    if (i === notUnique.length) return;
    //종료 조건2 만들어본 키가 unique 한지..
    const keys = [];
    for (let j = 0; j < row; j++) {
      let str = "";
      for (let col of arr) {
        str += relation[j][col];
      }
      keys.push(str);
    }

    const isUnique = keys.every((v) => keys.filter((el) => el === v).length === 1);

    if (isUnique) {
      result.push(arr);
      return;
    }

    //지금 재귀로 조합 만들기가 안되고 있음.

    for (let el of rest) {
      dfs([...arr, el], i + 1);
      //이게 아니네..
    }
    //arr 내부에 있는 모든 조합들의 column에 대해서 키를 만들어본다. 그리고 unique한지 파악한다. unique 하다면 다음 dfs는 수행하지 않는다.
  }
  dfs(notUnique, 0);
  //중복이 들어갈 수 있다.
  return unique.length + result.length;
}

const r = solution([
  ["100", "ryan", "music", "2"],
  ["200", "apeach", "math", "2"],
  ["300", "tube", "computer", "3"],
  ["400", "con", "computer", "4"],
  ["500", "muzi", "music", "3"],
  ["600", "apeach", "music", "2"],
]);

console.log(r);
