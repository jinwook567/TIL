function solution(n) {
  //이차원 배열에서 보면 정삼각형 모양이 아니고, 직사각형 모양이다.
  const board = Array(n)
    .fill()
    .map((_, i) => Array(i + 1).fill(0));

  let cnt = 0;
  let currentY = -1;
  let currentX = 0;

  while (n > 0) {
    for (let i = 0; i < n; i++) {
      currentY++;
      cnt++;
      console.log(currentY, currentX);
      board[currentY][currentX] = cnt;
    }

    for (let i = 0; i < n - 1; i++) {
      currentX++;
      cnt++;
      board[currentY][currentX] = cnt;
    }

    for (let i = 0; i < n - 2; i++) {
      currentY--;
      currentX--;
      cnt++;
      board[currentY][currentX] = cnt;
    }
    n -= 3;
  }
  const answer = [];
  board.forEach((arr) => arr.forEach((v) => answer.push(v)));
  return answer;
}

const n = 5;
const r = solution(n);
console.log(r);
