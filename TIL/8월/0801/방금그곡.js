function getMinute(time) {
  const [hour, minute] = time.split(":");
  return 24 * +hour + +minute;
}

function getArray(str) {
  let arr = str.split("");
  arr.forEach((v, i) => {
    if (v === "#") {
      arr[i - 1] = arr[i - 1] + "#";
      arr[i] = null;
    }
  });

  return arr.filter((v) => v);
}

function solution(m, musicinfos) {
  musicinfos = musicinfos.map((el, i) => {
    const arr = el.split(",");

    return {
      minute: getMinute(arr[1]) - getMinute(arr[0]),
      name: arr[2],
      melody: arr[3],
      index: i,
    };
  });

  musicinfos.sort((a, b) => {
    if (a.minute === b.minute) {
      return a.index - b.index;
    }
    return b.minute - a.minute;
  });

  for (let { minute, name, melody } of musicinfos) {
    let arr = getArray(melody);
    let m_arr = getArray(m);

    for (let i = 0; i < Math.floor(minute / arr.length); i++) {
      arr = arr.concat(arr);
    }

    arr = arr.concat(arr.slice(0, minute % arr.length));

    for (let i = 0; i < arr.length; i++) {
      if (m === arr.slice(i, i + m_arr.length).join("")) return name;
    }
  }
  return "(None)";
}

const m = "ABCDEFG";
const musicinfos = ["12:00,12:14,HELLO,CDEFGAB", "13:00,13:05,WORLD,ABCDEF"];
const r = solution(m, musicinfos);
console.log(r);

//중간에 루프가 끝나면 시간이 줄 수 있다. 무조건 찾으면 루프 끊어버려야 한다.
