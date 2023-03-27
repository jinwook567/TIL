const getVotePerson = (preference, excluded) => {
  let index = 0;
  for (let i = 0; i < preference.length; i++) {
    if (!excluded.includes(preference[i])) {
      index = i;
      break;
    }
  }
  return preference[index];
};

function solution(orders) {
  const answer = [];
  const targetCnt = orders[0].length % 2 === 0 ? orders[0].length / 2 : (orders[0].length + 1) / 2;

  function dfs(orders, excluded, times) {
    const obj = {};
    orders.forEach((preference) => {
      const person = getVotePerson(preference, excluded);
      if (obj[person]) obj[person] += 1;
      else obj[person] = 1;
    });

    const arr = [];
    for (let key in obj) {
      arr.push({ cnt: obj[key], person: +key });
    }

    const overTargetCntPerson = arr.filter((v) => v.cnt >= targetCnt);
    if (overTargetCntPerson.length !== 0) {
      answer[0] = times;
      answer[1] = overTargetCntPerson.sort((a, b) => b.person - a.person)[0].person;
      return;
    }

    const min = Math.min(...arr.map((v) => v.cnt));
    const minCntPerson = arr
      .filter((v) => v.cnt === min)
      .sort((a, b) => a.person - b.person)[0].person;

    dfs(orders, [...excluded, minCntPerson], times + 1);
  }
  dfs(orders, [], 1);
  return answer;
}

const orders = [
  [2, 1, 0, 3],
  [3, 2, 0, 1],
  [3, 0, 2, 1],
  [2, 3, 0, 1],
];
const r = solution(orders);
console.log(r);
