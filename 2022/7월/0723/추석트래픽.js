function getMs(start) {
  let result = 0;
  const [hour, minute, seconds] = start.split(":");
  const [s, ms] = seconds.split(".");

  result += +hour * 60 * 60 * 1000;
  result += +minute * 60 * 1000;
  result += +s * 1000;
  result += +ms;
  return result;
}

function solution(lines) {
  let history = [];

  lines.forEach((line) => {
    let [_, endTime, processTime] = line.split(" ");
    processTime = processTime.substring(0, processTime.length - 1);
    processTime = processTime * 1000;
    endTime = getMs(endTime);

    const startTime = endTime - processTime - 1;

    history.push({ time: startTime, kind: "start" });
    history.push({ time: endTime, kind: "end" });
  });
  history.sort((a, b) => {
    if (a.time === b.time) {
      //end가 start보다 빠름 따라서 역순
      return -1;
    }
    return a.time - b.time;
  });

  let sum = 0;
  let cnt = 0;

  for (let { kind } of history) {
    if (kind === "start") cnt++;
    else cnt--;
    sum = Math.max(sum, cnt);
  }

  return sum;
}

const lines = ["2016-09-15 01:00:04.002 2.0s", "2016-09-15 01:00:07.000 2s"];

const r = solution(lines);
console.log(r);
