function move(N, start, to) {
  console.log(`${N}번 원반을 ${start}에서 ${to}로 옮김`);
}

function hanoi(N, start, to, via) {
  if (N === 1) {
    move(1, start, to);
  } else {
    hanoi(N - 1, start, via, to);
    move(N, start, to);
    hanoi(N - 1, via, to, start);
  }
}

hanoi(3, "A", "C", "B");
