function solution(sticker) {
  const sortedByScore = sticker
    .map((v, index) => ({ score: v, index }))
    .sort((a, b) => b.score - a.score);

  let sum = 0;
  const visited = sticker.map((v) => false);

  const getSideIndex = (index) => {
    if (index === sticker.length - 1) return [index - 1, 0];
    if (index === 0) return [sticker.length - 1, index + 1];
    return [index - 1, index + 1];
  };

  for (let i = 0; i < sortedByScore.length; i++) {
    const index = sortedByScore[i].index;
    if (visited[index]) continue;

    sum += sortedByScore[i].score;
    const [before, after] = getSideIndex(sortedByScore[i].index);
    visited[before] = true;
    visited[after] = true;
  }
  return sum;
}

const sticker = [14, 6, 5, 11, 3, 9, 2, 10];
const sticker2 = [1, 3, 2, 5, 4];
const r = solution(sticker2);
console.log(r);
