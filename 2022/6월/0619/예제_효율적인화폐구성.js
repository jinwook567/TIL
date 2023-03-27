function solution(N, M, arr) {
  //그 1로 나누기랑 비슷한 문제인 것 같다. 바텀업 방식으로 만들어나가보자.
  //재귀로 풀어도 되지만, 바텀업 방식으로..
  const d = Array(M + 1).fill(-1);
  d[0] = 0;
  for (let i = 0; i <= M; i++) {
    //불가능이면 -1 넣기.
    arr.forEach((v) => {
      if (d[i] === -1) return;
      if (d[i + v] > d[i] + 1 || d[i + v] === -1) {
        d[i + v] = d[i] + 1;
      }
    });
  }
  console.log(d);
  return d[M];
}

const r = solution(3, 4, [3, 5, 7]);
console.log(r);
