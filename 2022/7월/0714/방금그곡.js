function changeTime(time) {
  let count = 0;
  const [hour, minute] = time.split(":");
  count += +hour * 60;
  count += +minute;
  return count;
}

function compare(arr1, arr2) {
  return arr1.every((v, i) => arr2[i] === v);
}

function makeArr(str) {
  const arr = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "#") continue;
    if (str[i + 1] !== "#") {
      arr.push(str[i]);
    } else {
      arr.push(str[i] + str[i + 1]);
    }
  }
  return arr;
}

function solution(m, musicinfos) {
  const result = [];
  const m_arr = makeArr(m);
  musicinfos.forEach((info) => {
    const [start, end, name, code] = info.split(",");

    const time = changeTime(end) - changeTime(start);
    const code_arr = makeArr(code);
    const codes = [];
    //time만큼 반복하고
    for (let i = 0; i < Math.floor(time / code_arr.length); i++) {
      codes.push(...code_arr);
    }
    codes.push(...code_arr.slice(0, time % code_arr.length));

    for (let i = 0; i + m_arr.length <= codes.length; i++) {
      //slice가 end 이전까지 뽑으니까 등호가 들어가야한다.
      if (compare(m_arr, codes.slice(i, i + m_arr.length))) result.push({ time, name });
    }
  });

  if (result.length === 0) return "(None)";
  result.sort((a, b) => b.time - a.time);
  return result[0].name;
}

//#C#C

//둘다 샵이 들어갈 경우 -> 어차피 샵의 길이만큼 검증하기 때문에 상관없음.
//m만 샵이 들어갈 경우 -> 이 경우는 그냥 틀린 경우임.
//music만 샵이 들어갈 경우 -> 이 경우는 왼쪽에 샵이 없어야함.
//#에 대해서 배열로 처리해줘야겠다..

const m = "ABC";
const musicinfos = ["12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"];

const r = solution(m, musicinfos);
console.log(r);
