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

  let preferenceByPerson = orders.map((v) => v[0]);

  function dfs(orders, excluded, times) {
    const obj = {};
    preferenceByPerson.forEach((person) => {
      if (obj[person]) obj[person] += 1;
      else obj[person] = 1;
    });

    const arr = [];
    for (let key in obj) {
      arr.push({ cnt: obj[key], person: Number(key) });
    }

    const overTargetCntPerson = arr.filter((v) => v.cnt >= targetCnt);
    if (overTargetCntPerson.length !== 0) {
      overTargetCntPerson.sort((a, b) => b.person - a.person);
      answer[0] = times;
      answer[1] = overTargetCntPerson[0].person;
      return;
    }

    const min = Math.min(...arr.map((v) => v.cnt));
    const minCntPerson = arr
      .filter((v) => v.cnt === min)
      .sort((a, b) => a.person - b.person)[0].person;
    const n_excluded = [...excluded, minCntPerson];

    preferenceByPerson = preferenceByPerson.map((person, i) => {
      if (person !== minCntPerson) return person;
      return getVotePerson(orders[i], n_excluded);
    });
    dfs(orders, n_excluded, times + 1);
  }
  dfs(orders, [], 1);
  return answer;
}

const orders = [
  [2, 3, 4, 0, 1],
  [1, 4, 3, 2, 0],
  [4, 1, 0, 2, 3],
  [3, 2, 1, 4, 0],
  [0, 3, 2, 1, 4],
];
const r = solution(orders);
console.log(r);
