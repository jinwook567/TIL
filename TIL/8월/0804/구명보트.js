function solution(people, limit) {
  let start = 0;
  let end = people.length - 1;
  let cnt = 0;
  people.sort((a, b) => a - b);

  while (start <= end) {
    let sum = 0;

    sum += people[end];
    end--;

    while (sum + people[start] <= limit) {
      sum += people[start];
      start++;
    }
    cnt++;
  }

  return cnt;
}

const people = [50, 50, 70, 80];
const limit = 100;
const r = solution(people, limit);
console.log({ r });
