//실패율
function solution(N, stages) {
  const arr = [];

  for (let i = 1; i <= N; i++) {
    const rate = stages.filter((v) => v === i).length / stages.filter((v) => v >= i).length;
    arr.push({ rate, round: i });
  }

  return arr
    .sort((a, b) => {
      if (a.rate === b.rate) {
        return a.round - b.round;
      } else {
        return b.rate - a.rate;
      }
    })
    .map((v) => v.round);
}

//카드 정렬하기
function solution(N, cards) {
  if (cards.length < 2) return cards[0];

  let acc = cards[0] + cards[1];
  let answer = acc;
  cards.sort((a, b) => a - b);
  for (let i = 2; i < N; i++) {
    answer += acc + cards[i];
    acc += cards[i];
  }
  return answer;
}
const r = solution(4, [10, 20, 40, 50]);
