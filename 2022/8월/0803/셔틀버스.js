function timeToNumber(time) {
  const [hour, minute] = time.split(":");
  return +hour * 60 + +minute;
}

function numberToTime(number) {
  let hour = Math.floor(number / 60);
  let minute = number % 60;

  if (hour < 10) hour = `0${hour}`;
  if (minute < 10) minute = `0${minute}`;

  return `${hour}:${minute}`;
}

function solution(n, t, m, timetable) {
  //분기를 나눈다. 만일 버스에 여유가 있을 경우, 버스에 여유가 없을 경우.
  timetable = timetable.map((v) => timeToNumber(v)).sort((a, b) => b - a);
  //그냥 없애나가면서 자리가 있으면 ,없으면 으로 가자.
  let currentTime = timeToNumber("09:00");

  for (let i = 0; i < n; i++) {
    //m명 만큼 탑승할 수 있음. timetable pop
    let cnt = m;
    let last = timetable[timetable.length - 1];
    let llast;

    while (cnt > 0 && timetable.length >= 1 && last <= currentTime) {
      cnt--;
      llast = timetable.pop();
      last = timetable[timetable.length - 1];
    }

    currentTime += t;

    if (i === n - 1) {
      if (cnt === 0) {
        //마지막 버스일 때 자리가 안 남는다면
        return numberToTime(llast - 1);
      } else {
        return numberToTime(currentTime - t);
      }
      //마지막 버스일 때 자리가 남는다면
    }
  }
}

const n = 2;
const t = 10;
const m = 2;
const timetable = ["09:10", "09:09", "08:00"];
const r = solution(n, t, m, timetable);
console.log(r);
