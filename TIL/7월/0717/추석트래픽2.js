function ms(start) {
  let result = 0;
  const [hour, minute, seconds] = start.split(":");
  const [s, ms] = seconds.split(".");

  //console.log(hour, minute, seconds, s, ms);
  result += +hour * 60 * 60 * 1000;
  result += +minute * 60 * 1000;
  result += +s * 1000;
  result += +ms;
  return result;
}

function check(standard, records) {
  const start = standard;
  const end = start + 1000;

  //start가 초의 시작점보다 크고 end 지점 보다 작을 때.
  //end 지점이 초의 시작점 보다 크고, start가 초의 시작점보다 작을 때.
  //start가 초의 시작점 보다 작고, end가 다음 초의 마지막보다 클 때.

  let sum = 0;
  sum += records.filter((v) => v.start > start && v.start < end).length;
  sum += records.filter((v) => v.end > start && v.end < end).length;
  sum += records.filter((v) => v.start < start && v.end > end).length;
  return sum;
}

function solution(lines) {
  const records = [];
  lines.forEach((line) => {
    let [_, end, time] = line.split(" ");
    time = +time.slice(0, time.length - 1) * 1000;
    end = ms(end);
    records.push({ start: end - time + 1, end, time });
  });

  let max = 0;

  records.forEach((rc) => {
    //start 계산
    //end 계산
    max = Math.max(max, check(rc.start, records), check(rc.end - 1, records));
  });
  return max;
}

const lines1 = ["2016-09-15 01:00:04.001 2.0s", "2016-09-15 01:00:07.000 2s"];
//end에 대해서 포함하지 않는 것 맞음.

//하 시발

const lines2 = [
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

const r = solution(lines1);
console.log({ r });
//만약에 lines에서
//모든 시작점과 끝점에 대해서 루프를 돌아준다고 하면
//2000, 2000 * 999 = ok
//시간 복잡도는 괜찮다. 처리 시간 동안 루프를 돌면서 더해준다면..?
//객체의 개수가
//999*3*1000

//밀리 세컨드를 환산해.
//그 숫자보다 크고 뭐보다 작다의 크기가 몇개냐 이런식으로..
