function getTime(time) {
  let sum = 0;
  const [hour, minute] = time.split(":");
  sum += +hour * 60;
  sum += +minute;
  return sum;
}

function solution(n, t, m, timetable) {
  const firstTime = getTime("09:00");
  timetable = timetable.map((v) => getTime(v)).sort((a, b) => a - b);

  let currentTime = firstTime;

  //n*m보다 맨 앞에 있는 놈의 길이가 크다면, 맨 앞에놈 -1 리턴.

  while (true) {
    currentTime += t - 1;
    n--;
  }
  console.log({ timetable });
}

const n = 2;
const t = 1;
const m = 2;
const timetable = ["09:00", "09:00", "09:00", "09:00"];
const r = solution(n, t, m, timetable);
console.log(r);

//splice 써도 관계없음.
