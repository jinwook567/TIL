function solution(n) {
  function hanoi(start, end, other, N) {
    hanoi(start, other, end, N - 1);
  }
}
