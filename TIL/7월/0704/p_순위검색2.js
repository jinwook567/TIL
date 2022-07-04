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

//점수가 아니고 문자열이니까 저걸로 가지고 있는지..

//파라메트릭 서치, 이상 찾아야함.
function binarySearch(data, i, target, start, end) {
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (target <= data[mid][i]) {
      //무조건 이상만 뱉음.
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return start;
}

function solution(info, query) {
  //걍 query 만들어줌.
  const condition = [
    ["cpp", "java", "python"],
    ["backend", "frontend"],
    ["junior", "senior"],
    ["chicken", "pizza"],
  ];

  info = info.map((v) => {
    const splited = v.split(" ");
    const score = splited.pop();
    return [splited.join(""), +score];
  });

  query = query.map((v) => {
    const splited = v.split(" and ");
    const pop = splited.pop();
    const [food, score] = pop.split(" ");
    return [...splited, food, +score];
  });

  info.sort((a, b) => a[1] - b[1]);

  const answer = query.map((v) => {
    let queries = [""];
    for (let i = 0; i < 4; i++) {
      if (v[i] === "-") {
        const arr = [];
        for (let k = 0; k < condition[i].length; k++) {
          const l = queries.map((el) => el + condition[i][k]);
          arr.push(...l);
        }
        queries = arr;
      } else {
        queries = queries.map((el) => el + v[i]);
      }
    }

    const index = binarySearch(info, 1, v[4], 0, info.length - 1);
    const newInfo = info.slice(index);

    const getNumbyString = (str, info) => {
      return info.filter((v) => v[0] === str).length;
    };

    return queries.reduce((acc, cur) => acc + getNumbyString(cur, newInfo), 0);
  });

  return answer;
}

const r = solution(info, query);
console.log({ r });
