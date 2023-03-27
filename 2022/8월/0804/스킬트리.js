const check = (standard, target) => {
  let index = 0;

  for (let i = 0; i < target.length; i++) {
    if (standard.match(target.charAt(i))) {
      if (target.charAt(i) !== standard.charAt(index)) return false;
      index++;
    }
  }
  return true;
  //루프를 돌면서 만약 알파벳이 standard에 속한다면, i를 더해준다. 그리고 만약 현재랑, i값이 다르다면 false
};

function solution(skill, skill_trees) {
  return skill_trees.reduce((acc, cur) => (check(skill, cur) ? ++acc : acc), 0);
}

const skill = "CBD";
const skill_trees = ["BACDE", "CBADF", "AECB", "BDA"];
const r = solution(skill, skill_trees);
console.log(r);
