function getCombination(array, n) {
  const combinationResults = [];

  const combination = (arr, n, pick) => {
    if (n === 1) {
      arr.forEach((k) => combinationResults.push([...pick, k]));
      return;
    }

    arr.forEach((k, i, origin) => {
      const rest = origin.slice(i + 1);
      combination(rest, n - 1, [...pick, k]);
    });

    //현재의 모든 함수에서 다음 과정을 반복하라..
  };
  combination(array, n, []);
  return combinationResults;
}

function solution(N, M, city) {
  //조합을 만드는 수 밖에 없음.
  function getCoordinate(city, kind) {
    const results = [];
    city.forEach((_, i) =>
      city[i].forEach((_, j) => {
        if (city[i][j] === kind) results.push([i, j]);
      })
    );
    return results;
  }
  //forEach return 쓰면 멈춘다.

  const chicken = getCoordinate(city, 2);
  const house = getCoordinate(city, 1);

  const chickenCombi = getCombination(chicken, M);

  const getChickenDistance = (house, chicken) => {
    const [hx, hy] = house;
    return Math.min(...chicken.map(([x, y]) => Math.abs(hx - x) + Math.abs(hy - y)));
  };

  return Math.min(
    ...chickenCombi.map((chicken) =>
      house.map((h) => getChickenDistance(h, chicken)).reduce((acc, cur) => acc + cur, 0)
    )
  );
}

const cityExample = [
  [0, 0, 1, 0, 0],
  [0, 0, 2, 0, 1],
  [0, 1, 2, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 2],
];

const cityExample2 = [
  [0, 2, 0, 1, 0],
  [1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [2, 0, 0, 1, 1],
  [2, 2, 0, 1, 2],
];

const cityExample3 = [
  [1, 2, 0, 0, 0],
  [1, 2, 0, 0, 0],
  [1, 2, 0, 0, 0],
  [1, 2, 0, 0, 0],
  [1, 2, 0, 0, 0],
];

console.log(solution(5, 1, cityExample3));
