function solution(N, M, dimension) {
  const positions = getPositions(dimension);
  const cases = combination(positions, 3);
  const answers = [];
  for (let i = 0; i < cases.length; i++) {
    //벽을 세우고.
    const copy = JSON.parse(JSON.stringify(dimension));
    cases[i].forEach(([h, w]) => {
      if (copy[h][w] === 0) copy[h][w] = 1;
    });

    //바이러스를 퍼트리고

    const safeNum = countArea(infection(copy));
    answers.push(safeNum);
    //이차원 배열내에 0의 개수를 파악하면됨.
    //만약 성립을 만족하면 answers 배열에 push를 할 것. 0의 숫자를. 0이 아니라면.
  }
  return Math.max(...answers);
}

function countArea(dimension) {
  let count = 0;
  dimension.forEach((arr) =>
    arr.forEach((v) => {
      if (v === 0) count++;
    })
  );
  return count;
}

const getVirusPosition = (dimension) => {
  const position = [];
  dimension.forEach((arr, h) =>
    arr.forEach((v, w) => {
      if (v === 2) position.push([h, w]);
    })
  );
  return position;
};

function infection(dimension) {
  const positions = getVirusPosition(dimension);

  function infect(dimension, position) {
    const [h, w] = position;

    if (h < 0 || w < 0 || h >= dimension.length || w >= dimension[0].length) return;
    if (dimension[h][w] === 1) return;
    if (dimension[h][w] === "V") return;
    if (dimension[h][w] === 0 || dimension[h][w] === 2) {
      dimension[h][w] = "V";
    }

    infect(dimension, [h + 1, w]);
    infect(dimension, [h - 1, w]);
    infect(dimension, [h, w + 1]);
    infect(dimension, [h, w - 1]);
  }

  const copy = JSON.parse(JSON.stringify(dimension));
  positions.forEach((p) => {
    infect(copy, p);
  });
  return copy;
}

function getPositions(dimension) {
  const result = [];
  dimension.forEach((arr, h) =>
    arr.forEach((v, w) => {
      result.push([h, w]);
    })
  );
  return result;
}

function combination(arr, n) {
  const combiResults = [];
  const combi = (array, n, pick) => {
    if (n === 1) {
      array.forEach((v) => {
        combiResults.push([...pick, v]);
      });
      return;
    }

    array.forEach((v, i) => {
      const rest = array.slice(i + 1);
      combi(rest, n - 1, [...pick, v]);
    });
  };
  combi(arr, n, []);
  return combiResults;
}

const r = solution(4, 6, [
  [0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 2],
  [1, 1, 1, 0, 0, 2],
  [0, 0, 0, 0, 0, 2],
]);

console.log(r);
