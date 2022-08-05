//hash 자료구조로 만들어서,
//key를 몇개 뽑을 때, 접근해서 뽑힌거 전부 곱하기.
function solution(clothes) {
  const map = {};
  let answer = 1;
  clothes.forEach(([name, kind]) => {
    if (map[kind]) map[kind].push(name);
    else {
      map[kind] = [name];
    }
  });

  for (let key in map) {
    answer *= map[key].length + 1;
  }

  return answer - 1;
}

const clothes = [
  ["yellow_hat", "headgear"],
  ["blue_sunglasses", "eyewear"],
  ["green_turban", "headgear2"],
  ["green_turban", "headgear3"],
  ["green_turban", "headgear4"],
  ["green_turban", "headgear5"],
  ["green_turban", "headgear6"],
  ["green_turban", "headgear7"],
  ["green_turban", "headgear8"],
  ["green_turban", "headgear9"],
  ["green_turban", "headgear10"],
  ["green_turban", "headgear11"],
  ["green_turban", "headgear12313123"],
  ["green_turban", "headgear12312312"],
  ["green_turban", "headgear12313"],
  ["green_turban", "headgear15152"],
  ["green_turban", "headgear1234234"],
  ["green_turban", "headgear2234234"],
  ["green_turban", "headgear33414"],
  ["green_turban", "headgear11112"],
  ["green_turban", "headgear12312"],
  ["green_turban", "headgear22131"],
  ["green_turban", "headgear123"],
  ["green_turban", "headgear133"],
  ["green_turban", "headgear20"],
];
const r = solution(clothes);
console.log(r);
