function binarySearch(arr, start, end, target) {
  if (start >= end) return start >= arr.length ? start : start + 1;
  const mid = Math.floor((start + end) / 2);

  if (+arr[mid][4] >= target) {
    return binarySearch(arr, start, mid - 1, target);
  } else {
    return binarySearch(arr, mid + 1, end, target);
  }
}

function getCombination(arr) {
  const set = new Set();
  set.add(JSON.stringify(arr));
  function dfs(arr, depth) {
    if (depth === 4) {
      set.add(JSON.stringify(arr));
      return;
    }

    dfs(["-", arr[1], arr[2], arr[3]], depth + 1);
    dfs([arr[0], "-", arr[2], arr[3]], depth + 1);
    dfs([arr[0], arr[1], "-", arr[3]], depth + 1);
    dfs([arr[0], arr[1], arr[2], "-"], depth + 1);
  }
  dfs(arr, 0);
  return [...set].map((v) => JSON.parse(v));
}

//그런 방식으로 풀게되면 점수 한번 이분탐색, NlogN ho..

function solution(info, query) {
  info = info.map((v) => v.split(" "));
  info.sort((a, b) => a[4] - b[4]);

  const answer = query.map((q) => {
    q = q.replace(/ and/g, "").split(" ");
    const index = binarySearch(info, 0, info.length - 1, +q[4]);
    console.log({ index });
    const map = new Map();

    for (let i = index; i < info.length; i++) {
      const array = info[i].slice(0, 4);
      let key = array.join("");
      const combination = getCombination(array);

      for (let change of combination) {
        const key = change.join("");
        map.set(key, map.has(key) ? map.get(key) + 1 : 1);
      }
    }

    const queryKey = q.slice(0, 4).join("");
    return map.has(queryKey) ? map.get(queryKey) : 0;
  });
  return answer;
  //이진 탐색으로 info에 대해서 filter를 해주고, filter된 info를 hash map을 만들어준다.
}

//주어진 query

const info = [
  "java backend junior pizza 150",
  "python frontend senior chicken 210",
  "python frontend senior chicken 150",
  "cpp backend senior pizza 260",
  "java backend junior chicken 80",
  "python backend senior chicken 50",
];

const query = ["cpp and - and senior and pizza 250"];

// "python and frontend and senior and chicken 200",

//   "- and backend and senior and - 150",
//   "- and - and - and chicken 100",
//   "- and - and - and - 150",

const r = solution(info, query);
console.log(r);

// upper.forEach((arr) => {
//   const criterion = arr.slice(0, 4);
//   const all = criterion.join("");
//   map.set(all, map.has(all) ? map.get(all) + 1 : 1);
//   for (let i = 1; i <= 4; i++) {
//     const combination = getCombination(criterion, i);
//     //combination이 없는 경우

//     combination.forEach((el) => {
//       let key = criterion.join("");
//       el.forEach((v) => {
//         key = key.replace(v, "-");
//       });
//       //el안에 있는 모든 text에 대해서 변경한 후에 key값을 삽입.
//       map.set(key, map.has(key) ? map.get(key) + 1 : 1);
//     });
//   }
// });
