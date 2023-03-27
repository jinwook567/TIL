function getTime(time) {
  let sum = 0;
  const [hour, minute, seconds] = time.split(":");
  sum += +hour * 60 * 60;
  sum += +minute * 60;
  sum += +seconds;
  return sum;
}

function getStrTime(number) {
  let hour = Math.floor(number / 3600);
  number -= hour * 3600;
  let minute = Math.floor(number / 60);
  let seconds = number % 60;

  if (hour < 10) hour = `0${hour}`;
  if (minute < 10) minute = `0${minute}`;
  if (seconds < 10) seconds = `0${seconds}`;
  return `${hour}:${minute}:${seconds}`;
}

//구간합 문제
//가장 빠른 시간을 리턴해라. -> 거꾸로 가면 됨.

function solution(play_time, adv_time, logs) {
  const arr = Array(getTime(play_time) + 1).fill(0);
  logs.forEach((el) => {
    let [start, end] = el.split("-");
    start = getTime(start);
    end = getTime(end);

    arr[start] += 1;
    arr[end + 1] -= 1;
  });

  for (let i = 1; i < arr.length; i++) {
    arr[i] += arr[i - 1];
  }

  //구간합 마지막 요소 제거
  arr.pop();

  adv_time = getTime(adv_time);
  //adv_time이 구간.

  //뒤에서부터 나아가기.

  let sum = 0;

  for (let i = 0; i < adv_time; i++) {
    sum += arr[arr.length - 1 - i];
  }
  let max = sum;
  let time = arr.length - adv_time;
  for (let i = arr.length - 1 - adv_time; i >= 0; i--) {
    sum += arr[i];
    sum -= arr[i + adv_time];
    max = Math.max(max, sum);
    if (getStrTime(i) === "01:30:59" || getStrTime(i) === "01:31:00") {
      console.log({ sum });
    }
    if (max === sum) time = i;
  }
  return getStrTime(time);
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

const start = getTime("00:25:50");
const end = getTime("00:48:29");
const cost = getTime("00:22:39");
console.log({ start, end, cost });
console.log(end - start);
//end-start니까 마지막은 포함 안한다.

const r = solution(play_time, adv_time, logs);
console.log(r);
