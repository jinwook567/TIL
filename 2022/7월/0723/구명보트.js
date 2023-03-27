function solution(people, limit) {
  let light = 0;
  let heavy = people.length - 1;
  let boat = 0;
  people.sort((a, b) => a - b);

  while (light <= heavy) {
    if (people[light] + people[heavy] > limit) {
      heavy--;
      boat++;
    } else {
      light++;
      heavy--;
      boat++;
    }
  }
  return boat;
}

const people = [50, 50, 70, 80];
const limit = 100;
const r = solution(people, limit);
console.log(r);
