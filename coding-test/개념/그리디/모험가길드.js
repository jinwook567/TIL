function solution() {
  const guild = [2, 3, 1, 2, 2];
  guild.sort((x, y) => x - y);
  let answer = 0;
  let max = 0;
  let count = 0;

  for (let i = 0; i < guild.length; i++) {
    if (guild[i] > max) max = guild[i];
    count++;

    if (max === count) {
      answer++;
      max = 0;
      count = 0;
    }
  }

  console.log(answer);
}

//왜 그리디라고 생각했을까?

solution();
