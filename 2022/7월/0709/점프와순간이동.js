//그 다음에 곱하기 2가 넘어가기 전까지 계속 간다. 그리고 나머지는 그냥 스텝으로 이동해주면 된다.
function solution(n) {
  let k = 1;
  let start = 1;
  let p = 7;

  while (n % 2 === 0) {
    n = n / 2;
  }

  while (n % 5 === 0) {
    console.log("hi");
    n = n / 5;
  }

  //5의 4번.
  console.log(n);

  return n - p + 1;
}

solution(5000);
