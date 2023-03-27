function convert(str) {
  let sum = 0;
  const [hour, minute] = str.split(":");
  sum += +hour * 60;
  sum += +minute;
  return sum;
}

function solution(fees, records) {
  const [defaultMinute, defaultFee, overMinute, overFee] = fees;

  records = records.map((v) => v.split(" "));

  const result = [];
  //{car, fee}

  for (let i = 0; i < records.length; i++) {
    const [time, car, inOut] = records[i];
    const isExist = result.find((v) => v.car === car);
    if (isExist) continue;

    const data = records.filter((v) => v[1] === car).map((v) => [convert(v[0]), v[1], v[2]]);

    if (data.length % 2 !== 0) {
      const last = data[data.length - 1];
      data.push([convert("23:59"), last[1], "OUT"]);
    }
    //만약 개수가 홀수라면.. 마지막꺼에 23:59 기준으로 추가해주기.

    let sum = 0;
    let totalMinute = 0;

    for (let i = 0; i < data.length; i++) {
      //입차 출차 계산해주기.
      if (i % 2 !== 0) {
        const minute = data[i][0] - data[i - 1][0];
        totalMinute += minute;
      }
    }

    if (totalMinute > defaultMinute) {
      sum += defaultFee + Math.ceil((totalMinute - defaultMinute) / overMinute) * overFee;
    } else {
      sum += defaultFee;
    }

    result.push({ car, fee: sum });
  }

  return result.sort((a, b) => Number(a.car) - Number(b.car)).map((v) => v.fee);
}

const fees = [180, 5000, 10, 600];
const records = [
  "05:34 5961 IN",
  "06:00 0000 IN",
  "06:34 0000 OUT",
  "07:59 5961 OUT",
  "07:59 0148 IN",
  "18:59 0000 IN",
  "19:09 0148 OUT",
  "22:59 5961 IN",
  "23:00 5961 OUT",
];

const r = solution(fees, records);
console.log(r);
