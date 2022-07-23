function convert(time) {
  let sum = 0;
  const [hour, minute, seconds] = time.split(":");
  sum += +hour * 60 * 60;
  sum += +minute * 60;
  sum += +seconds;
  return sum;
}

function back(time) {
  let rest = time;
  let hour = Math.floor(rest / 3600);
  if (hour < 10) hour = `0${hour}`;
  rest = rest % 3600;

  let minute = Math.floor(rest / 60);
  if (minute < 10) minute = `0${minute}`;

  rest = rest % 60;

  let seconds = rest;
  if (seconds < 10) seconds = `0${seconds}`;

  return `${hour}:${minute}:${seconds}`;
}

function solution(play_time, adv_time, logs) {
  play_time = convert(play_time);
  adv_time = convert(adv_time);
  logs = logs.map((el) => el.split("-").map((v) => convert(v)));

  const table = Array(play_time).fill(0);

  logs.forEach((el) => {
    const start = el[0];
    const end = el[1];
    //시작 시간이 같거나 크고, end보다는 작을 때
    table[start] += 1;
    table[end] -= 1;
  });

  //현재 시간별 시청자들이 보고 있는 숫자.
  for (let i = 1; i <= play_time; i++) {
    table[i] += table[i - 1];
  }
  //누적합을 다시 구해줘야함. 구간별로 최댓값을 알아야하기 때문에.
  for (let i = 1; i <= play_time; i++) {
    table[i] += table[i - 1];
  }

  let max = table[adv_time - 1];
  let index = 0;

  for (let i = adv_time - 1; i < play_time; i++) {
    if (max < table[i] - table[i - adv_time]) {
      max = table[i] - table[i - adv_time];
      index = i - adv_time + 1;
    }
  }

  return back(index);
}

const play_time = "02:03:55";
const adv_time = "00:14:15";
const logs = [
  "01:20:15-01:45:14",
  "00:40:31-01:00:00",
  "00:25:50-00:48:29",
  "01:30:59-01:53:29",
  "01:37:44-02:02:30",
];
const r = solution(play_time, adv_time, logs);
console.log(r);
