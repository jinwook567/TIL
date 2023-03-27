const data = [
  [3, 10],
  [5, 20],
  [1, 10],
  [1, 20],
  [2, 15],
  [4, 40],
  [2, 200],
];

const data2 = [
  [5, 50],
  [4, 40],
  [3, 30],
  [2, 20],
  [1, 10],
  [1, 10],
  [2, 20],
  [3, 30],
  [4, 40],
  [5, 50],
];

//완전탐색
function solution(N, data) {
  const results = [];
  function recursion(acc, arr) {
    const len = arr.length;
    arr.forEach((v, i) => {
      const [T, P] = v;
      if (T + i >= len) {
        results.push(acc + (T + i === len ? P : 0));
        return;
      }

      const rest = arr.slice(i + T);
      recursion(P + acc, rest);
    });
  }
  recursion(0, data);
  return Math.max(...results);
}

const r = solution(10, data2);
console.log(r);

//다이나믹 프로그래밍
function solution2(N, data) {
  const d = Array(N + 1).fill(0);
  for (let i = 0; i < N; i++) {
    const [T, P] = data[i];
    if (i + T > N) continue;
    d[i + T] = Math.max(d[i + T], P + d[i]);
    d[i + 1] = Math.max(d[i + 1], d[i]);
  }
  console.log(d);
  return Math.max(...d);
}

const r2 = solution2(10, data2);
console.log({ r2 });

//재귀 완전탐색으로는 풀 수 있을 것 같아. 남은 arr를 slice해서 보내주면서.
//완탐 풀이, 다프 풀이 1개씩
//이것을 다이나믹 프로그래밍으로 생각한다면..
