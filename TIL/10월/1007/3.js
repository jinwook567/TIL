//알렉스는 힘이 가장 센 애들만 팼다.
//이제 찰리의 순서인데, 플레이어가 패지면, 찰리의 체력은 준다. 그 유저의 힘만큼.
//그래서 찰리의 초기 체력은 게임에서 모두 때린 사람의 합보다 크거나 같아야한다.
//찰리는 지고싶지 안항서, 모든 레벨의 가장 힘이 가장 높은 플레이어를 패기로 했다.
//찰리가 필요한 가장 적은 체력은 얼마일까?

//힘이 가장 센놈은 알렉스가 패버려서, n번쨰로 큰 놈을 패야한다.

//sort -> nlogn

//10000 * 10000 log N

function getMinimumHealth(initial_players, new_players, rank) {
  let answer = 0;
  const players = initial_players.sort((a, b) => b - a).slice(0, rank);
  let rank_str = players[players.length - 1];
  answer += rank_str;
  //이전꺼랑 현재것만..

  for (let i = 0; i < new_players.length; i++) {
    if (new_players[i] <= rank_str) {
      answer += rank_str;
    } else {
      players.push(new_players[i]);
      players.sort((a, b) => b - a);
      rank_str = players[rank - 1];
      answer += rank_str;
    }
  }
  return answer;
}

function getMinimumHealth(initial_players, new_players, rank) {
  let answer = 0;
  const d = Array(100001).fill(0);
  initial_players.forEach((v) => {
    d[v] += 1;
  });

  let rank_count = 0;
  let index = 100001;

  for (let i = 100000; i > 0; i--) {
    if (d[i] !== 0) {
      let num = d[i];
      while (num > 0 && rank_count < rank) {
        num--;
        rank_count++;
      }
      if (rank_count === rank) {
        index = i;
        break;
      }
    }

    // if (d[i] !== 0) {
    //   rank_count++;
    //   if (rank_count === rank) {
    //     index = i;
    //     break;
    //   }
    // }
  }

  answer += index;

  for (let i = 0; i < new_players.length; i++) {
    if (index >= new_players[i]) {
      answer += index;
    } else {
      d[new_players[i]] += 1;
      for (let i = index + 1; i <= 100000; i++) {
        if (d[i] !== 0) {
          index = i;
          break;
        }
      }

      answer += index;
    }
  }
  return answer;
}

const initial_players = [1, 1, 3];
const new_players = [2, 2, 4];
const rank = 2;
const r = getMinimumHealth(initial_players, new_players, rank);
console.log({ r });
