const arr = [
  [0, 0, 1, 1, 0],
  [0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
];

function freeze(dimension, position) {
  const aH = dimension.length;
  const aW = dimension[0].length;
  const [h, w] = position;
  //dimension[h][w] = 1;
  if (h < 0 || w < 0 || h >= aH || w >= aW) return;
  if (dimension[h][w] === 1) return;

  dimension[h][w] = 1;

  freeze(dimension, [h - 1, w]);
  freeze(dimension, [h + 1, w]);
  freeze(dimension, [h, w + 1]);
  freeze(dimension, [h, w - 1]);
}

function solution(dimension) {
  let count = 0;
  dimension.forEach((arr, h) =>
    arr.forEach((v, w) => {
      if (v === 0) {
        count++;
        console.log(dimension);
        freeze(dimension, [h, w]);
        //얼음찾기 로직 start
      }
    })
  );

  return count;
}

const answer = solution(arr);
