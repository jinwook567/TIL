function solution(genres, plays) {
  const sumByGenre = {};
  const playByGenre = {};

  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    const play = plays[i];

    if (!sumByGenre[genre]) sumByGenre[genre] = play;
    else sumByGenre[genre] += play;

    if (!playByGenre[genre]) playByGenre[genre] = [{ number: i, play }];
    else playByGenre[genre].push({ number: i, play });
  }

  const order = Object.entries(sumByGenre)
    .sort((a, b) => b[1] - a[1])
    .map((el) => el[0]);

  const answer = [];
  order.forEach((genre) => {
    playByGenre[genre].sort((a, b) => {
      if (b.play === a.play) return a.number - b.number;
      return b.play - a.play;
    });

    //최대 2개까지.
    answer.push(...playByGenre[genre].map((el) => el.number).slice(0, 2));
  });
  return answer;
}

const genres = ["classic", "pop", "classic", "classic", "pop"];
const plays = [500, 600, 150, 800, 2500];
const r = solution(genres, plays);
console.log(r);
