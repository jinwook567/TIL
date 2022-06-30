const N = 5;
const stages = [2, 1, 2, 6, 2, 4, 3, 3];

function solution(N, stages) {
  //실패율이란, 현재 스테이지에 도달했으나 아직 클리어하지 못한 플레이어 수
  //스테이지에 도달한 플레이의 수는 해당 stage보다 크거나 같은 정보를 가질 경우.
  //실패율이 아닌, 라운드 정보를 리턴하는 것이므로.
  const data = [];
  for (let i = 1; i <= N; i++) {
    const total = stages.filter((v) => v >= i).length;
    const now = stages.filter((v) => v === i).length;
    data.push({ round: i, fail: now / total });
  }
  return data.sort((a, b) => b.fail - a.fail).map((v) => v.round);
}

const r = solution(N, stages);
console.log(r);
