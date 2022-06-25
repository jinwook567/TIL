function solution(example) {
  //LT, LB, TL, TR, RT, RB, BL, BR
  const dy = [-1, 1, -2, -2, -1, 1, 2, 2];
  const dx = [-2, -2, -1, 1, 2, 2, -1, 1];

  const axis = "abcdefgh";

  const x = axis.indexOf(example.charAt(0)) + 1;
  const y = Number(example.charAt(1));

  const position = [y, x];
  let count = 0;

  for (let i = 0; i < 8; i++) {
    const ny = position[0] + dy[i];
    const nx = position[1] + dx[i];

    if (ny < 1 || nx < 1 || nx >= 8 || ny >= 8) continue;
    count++;
  }
  console.log(count);
}

solution("c2");
