const getTime = (time) => {
  const [hour, minute, secondsAndMs] = time.split(":");
  const [seconds, ms] = secondsAndMs.split(".");
  return +hour * 60 * 60 * 1000 + +minute * 60 * 1000 + +seconds * 1000 + +ms;
};

function solution(lines) {
  //const table = Array(getTime("24:00:00.000")).fill(0);
  const list = [];

  lines.forEach((line) => {
    let [date, time, cost] = line.split(" ");
    cost = +cost.slice(0, cost.length - 1) * 1000;

    const endTime = getTime(time);
    const startTime = endTime - cost + 1;
    list.push({ time: startTime, type: "start" });
    list.push({ time: endTime + 999, type: "end" });
  });

  list.sort((a, b) => {
    if (a.time === b.time) {
      return (b.type > a.type) - (b.type < a.type);
    }
    return a.time - b.time;
  });

  let answer = 0;
  let acc = 0;
  list.forEach((v) => {
    if (v.type === "start") acc++;
    else acc--;
    answer = Math.max(answer, acc);
  });

  return answer;
}

const lines = [
  "2016-09-15 20:59:57.421 0.351s",
  "2016-09-15 20:59:58.233 1.181s",
  "2016-09-15 20:59:58.299 0.8s",
  "2016-09-15 20:59:58.688 1.041s",
  "2016-09-15 20:59:59.591 1.412s",
  "2016-09-15 21:00:00.464 1.466s",
  "2016-09-15 21:00:00.741 1.581s",
  "2016-09-15 21:00:00.748 2.31s",
  "2016-09-15 21:00:00.966 0.381s",
  "2016-09-15 21:00:02.066 2.62s",
];
const r = solution(lines);
console.log(r);
