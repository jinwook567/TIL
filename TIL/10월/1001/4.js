//프로, 프로라면 스페셜 매치 플러스 해주고 아무나 죽이면 됨.
//아마추어 대 프로라면 아마추어를 죽여야함.
//아마추어 대 아마추어라면 아무나 죽이면 됨.

function solution(players) {
  function getCount(players) {
    const table = Array(players.length).fill(true);
    let matchUp = [];
    let cnt = 0;
    const amature = Array(players.length).fill(0);
    const hash = {};

    while (table.reduce((acc, cur) => (cur ? acc + 1 : acc), 0) !== 1) {
      for (let i = 0; i < players.length; i++) {
        if (table[i]) {
          matchUp.push(i);
          if (matchUp.length === 2) {
            const d = matchUp
              .map((v) => ({ index: v, class: players[v] }))
              .sort((a, b) => b.class - a.class);

            if (d[0].class === 1 && d[1].class === 1) {
              cnt++;
              table[d[0].index] = false;
            }
            if (d[0].class === 1 && d[1].class === 0) {
              cnt++;
              table[d[1].index] = false;
            }
            if (d[0].class === 0 && d[1].class === 0) {
              amature[d[0].index] += 1;
              amature[d[1].index] += 1;
              table[d[0].index] = false;
              if (!hash[d[0].index]) {
                hash[d[0].index] = 1;
              } else {
                hash[d[0].index] += 1;
              }

              if (!hash[d[1].index]) {
                hash[d[1].index] = 1;
              } else {
                hash[d[1].index] += 1;
              }
            }
            matchUp = [];
          }
        }
      }
    }

    let max = 0;
    // for (let key in hash) {
    //   max = Math.max(hash[key]);
    // }
    for (let value of amature) {
      max = Math.max(max, value);
    }
    return cnt + max;
  }

  let answer = getCount(players);
  return answer;
}

const players = [1, 0, 0, 1, 0, 0, 1, 0];
const r = solution(players);
console.log(r);
