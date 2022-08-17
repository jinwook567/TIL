function solution(sizes) {
  //나는 바꾸는 과정을 계속 반복하는.. 아주 이상한 방식으로 문제를 풀려고 했다.
  //알고리즘 문제를 계속 풀다보니 스스로 머리를 가두는 느낌이다.
}

function solution(sizes) {
  //사실 솔루션은 굉장히 간단하다.
  //명함을 같은 방향으로 놓으면 되는거다. 세로가 긴 명함이면 가로로 길게 바꿔주면 된다. (가로 기준이라면)
  const rotated = sizes.map(([w, h]) => (w > h ? [w, h] : [h, w]));
  //가로 방향으로.
  let maxW = 0;
  let maxH = 0;
  rotated.forEach(([w, h]) => {
    if (w > maxW) maxW = w;
    if (h > maxH) maxH = h;
  });
  return maxW * maxH;
}
