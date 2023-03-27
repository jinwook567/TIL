function solution(fearList) {
  fearList.sort((a, b) => b - a);
  let count = 0;

  let len = 0;
  while (fearList.length !== 0) {
    const v = fearList.pop();
    len++;
    if (len === v) {
      len = 0;
      count++;
    }
  }
  console.log(count);
}

solution([2, 3, 1, 2, 2]);
