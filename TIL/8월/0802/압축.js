const findIndex = (str, start, index) => {
  let next_i = start;
  for (let i = start + 1; i <= str.length + 1; i++) {
    const next_str = str.slice(start, i);
    next_i = i;

    if (!index.find((v) => v === next_str)) break;
  }
  return next_i;
};

function solution(msg) {
  const index = [""];
  const answer = [];
  for (let i = 65; i <= 90; i++) {
    index.push(String.fromCharCode(i));
  }

  let i = 0;
  while (i < msg.length) {
    const next_i = findIndex(msg, i, index);

    const newIndex = msg.slice(i, next_i);
    const existIndex = msg.slice(i, next_i - 1);
    answer.push(index.findIndex((v) => v === existIndex));
    index.push(newIndex);
    if (i === msg.length - 1) break;
    i = next_i - 1;
  }
  return answer;
}

const msg = "KAKAO";
const r = solution(msg);
console.log(r);
