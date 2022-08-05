function solution(dirs) {
  const set = new Set();

  const dy = [1, -1, 0, 0];
  const dx = [0, 0, -1, 1];
  const dir = ["D", "U", "L", "R"];
  let y = 0;
  let x = 0;

  [...dirs].forEach((v) => {
    const i = dir.findIndex((el) => el === v);
    const ny = y + dy[i];
    const nx = x + dx[i];
    if (ny < -5 || nx < -5 || nx > 5 || ny > 5) return;

    set.add(`${y}${x}${ny}${nx}`);
    set.add(`${ny}${nx}${y}${x}`);
    y = ny;
    x = nx;
  });

  return set.size / 2;
}

const dirs = "ULURRDLLU";
const r = solution(dirs);
console.log(r);
