function solution(w, h) {
  //단순하게 반대로 자른다고 생각.
  let sum = 0;
  for (let i = 0; i < w; i++) {
    const height = (h * i) / w;
    //height 아래 만큼 넣어줄 수 있음.
    sum += Math.floor(height);
  }
  return sum * 2;
}

const w = 8;
const h = 12;
const r = solution(w, h);
console.log(r);
