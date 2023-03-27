function seconds(start) {
  let result = 0;
  const [hour, minute, seconds] = start.split(":");
  const [s, ms] = seconds.split(".");

  //console.log(hour, minute, seconds, s, ms);
  result += +hour * 60 * 60;
  result += +minute * 60;
  result += +s;
  //console.log(result);
  return { s: result, ms: +ms };
}

function getInfo(line) {
  const [_, start, time] = line.split(" ");
  const { s, ms } = seconds(start);

  const loopTime = Math.floor(+time.slice(0, time.length - 1) - ms);
  return { s, loopTime };
}

function solution(lines) {
  const d = Array(86400).fill(0);
  for (const line of lines) {
    const { s, loopTime } = getInfo(line);
    for (let i = 0; i <= loopTime; i++) {
      d[s + i] += 1;
    }
  }
  return d.reduce((acc, cur) => Math.max(acc, cur), 0);
}

const lines = ["2016-09-15 00:00:00.000 3s"];
const lines2 = ["2016-09-15 01:00:04.002 2.0s", "2016-09-15 01:00:07.000 2s"];
const r = solution(lines2);
console.log({ r });

//천만 밖에 안되네..
//하지만 여기서 또 1초인 999에 대해서 루프를 돌 수 없다.
//끝점에 대한 정보도 알아야하는데,,
//999를 줄일 수 있는 방법에 대해서.. 모든 시그널 시작 시간을 정확히 초에 맞춰서 떙기면 안되는가? 똑같이 그 떄 부터 똑같이 1초 기준이라고 하면 2개니까.. 땡겨버려서 초 단위로 움직이면서..
//구간을 구해야하는데,
//loop 만들어놓고,
