//아래 알고리즘은 틀렸음. 문자열 사이 아무데나 넣을 수 있어야함.
//슬라이딩 윈도우로 밀면서 111이면 110으로 변경해주는 알고리즘
function solution(s) {
  return s.map((v) => {
    const arr = v.split("110");
    const cnt = arr.length - 1;

    //재귀적으로 수행을 해야하는데, 만약 리턴된 값이랑 현재 값이랑 동일하다면 재귀를 멈춰야한다.
  });
}

const s = ["1110", "100111100", "0111111010"];
const r = solution(s);
console.log(r);
