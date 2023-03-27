function solution(n, left, right) {
  //시작과 끝을 모두 포함할 수 있는 로직으로 만들어야지.
  //그냥 해당 층부터 만들어서 앞, 뒤로 자르는 로직은 어떠한가?
  //자르기 해도 괜찮다. 앞에 자르기가 O(n)의 시간이 소모되지만 한번밖에 안되는 거니까.

  const answer = [];

  let floor = Math.floor(left / n) + 1;
  const lastFloor = Math.floor(right / n) + 1;
  //floor를 기준으로 처리해주는게 낫다

  while (floor <= lastFloor) {
    for (let j = 1; j <= n; j++) {
      if (j <= floor) answer.push(floor);
      else answer.push(j);
    }
    floor++;
  }

  return answer.slice(left % n, answer.length - (n - (right % n)) + 1);
}

[
  [1, 2, 3, 4],
  [2, 2, 3, 4],
  [3, 3, 3, 4],
  [4, 4, 4, 4],
];

const n = 4;
const left = 3;
const right = 10;
const r = solution(n, left, right);
console.log(r);
