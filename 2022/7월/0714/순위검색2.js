//만일 arr가 없다면
const binarySearch = (arr, target) => {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] >= target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return end + 1;
};

const index = binarySearch([1, 3, 4, 5, 5], 4);
console.log({ index });

function getCombination(arr, score, map) {
  function recursion(arr, start) {
    const key = arr.join("");
    if (map[key]) map[key].push(score);
    else map[key] = [score];

    for (let i = start; i < arr.length; i++) {
      const copy = [...arr];
      copy[i] = "-";
      recursion(copy, i + 1);
    }
  }
  recursion(arr, 0, 0);
  return map;
}

function solution(info, query) {
  info = info.map((v) => v.split(" "));

  const map = {};
  info.forEach((v) => getCombination(v.slice(0, 4), Number(v[4]), map));

  return query.map((q) => {
    q = q.replace(/ and/g, "").split(" ");
    const queryKey = q.slice(0, 4).join("");
    if (map[queryKey]) {
      const scores = map[queryKey];
      scores.sort((a, b) => a - b);
      const index = binarySearch(scores, +q[4]);
      return scores.length - index;
    } else {
      return 0;
    }
  });
}

const info = [
  "java backend junior pizza 150",
  "python frontend senior chicken 210",
  "python frontend senior chicken 150",
  "cpp backend senior pizza 260",
  "java backend junior chicken 80",
  "python backend senior chicken 50",
];

const query = [
  "java and backend and junior and pizza 100",
  "python and frontend and senior and chicken 200",
  "cpp and - and senior and pizza 250",
  "- and backend and senior and - 150",
  "- and - and - and chicken 100",
  "- and - and - and - 150",
];

const r = solution(info, query);
console.log(r);
