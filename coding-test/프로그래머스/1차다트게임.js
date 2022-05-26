//리팩토링필요.
//정규식을 활용해서 간단하게 풀이.
function solution(dartResult) {
  var answer = 0;
  const cnt = [];
  const arr = [];
  //마지막에 cnt 내부 결과값을 전부 더한 다음에 return 해버림.
  //10을 어떻게 처리해야할까?
  //1D,2S,# 이런식으로 배열로 나누고싶음.
  //그냥 D,S,T 이렇게 나눠도 관계없지않나.
  //지금 모든 문제가 10때문에 발생함. 하나씩 넘어가면서 하기에는,,
  //그러면 만약에 2단계를 봤을 때 또 숫자면 그것은 10이다로 판명하는 로직을 짜면 더 간단하지 않을까?

  for (let dart of dartResult) {
    if (Number.isInteger(Number(dart))) {
      if (dart === "0" && arr[arr.length - 1] === 1) {
        arr[arr.length - 1] = 10;
      } else {
        arr.push(Number(dart));
      }
    } else {
      arr.push(dart);
    }
  }

  const multiple = ["S", "D", "T"];

  arr.forEach((el) => {
    if (Number.isInteger(el)) {
      cnt.push(el);
    } else {
      if (el === "*" || el === "#") {
        cnt[cnt.length - 1] = cnt[cnt.length - 1] * (el === "*" ? 2 : -1);
        if (cnt.length >= 2 && el === "*") {
          cnt[cnt.length - 2] = cnt[cnt.length - 2] * 2;
        }
      } else {
        const index = multiple.indexOf(el);
        cnt[cnt.length - 1] = cnt[cnt.length - 1] ** (index + 1);
      }
    }
  });

  return cnt.reduce((acc, cur) => acc + cur, 0);
}
