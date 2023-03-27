function check(dimension) {
  let num = dimension[0][0];
  return dimension.every((arr) => arr.every((v) => v === num));
}

function divide(dimension) {
  const n = dimension.length;

  const [d1, d2, d3, d4] = [[], [], [], []];

  //top_left
  for (let i = 0; i < n / 2; i++) {
    const arr = [];
    for (let j = 0; j < n / 2; j++) {
      arr.push(dimension[i][j]);
    }
    d1.push(arr);
  }

  //top_right
  for (let i = 0; i < n / 2; i++) {
    const arr = [];
    for (let j = n / 2; j < n; j++) {
      arr.push(dimension[i][j]);
    }
    d2.push(arr);
  }

  //bottom_left
  for (let i = n / 2; i < n; i++) {
    const arr = [];
    for (let j = 0; j < n / 2; j++) {
      arr.push(dimension[i][j]);
    }
    d3.push(arr);
  }

  //bottom_right
  for (let i = n / 2; i < n; i++) {
    const arr = [];
    for (let j = n / 2; j < n; j++) {
      arr.push(dimension[i][j]);
    }
    d4.push(arr);
  }

  return [d1, d2, d3, d4];
}

function solution(arr) {
  let count_0 = 0;
  let count_1 = 0;
  function recursive(dimension) {
    if (check(dimension)) {
      if (dimension[0][0] === 0) count_0 += 1;
      else count_1 += 1;
      return;
    }

    const [d1, d2, d3, d4] = divide(dimension);
    recursive(d1);
    recursive(d2);
    recursive(d3);
    recursive(d4);
  }

  recursive(arr);
  return [count_0, count_1];
}
const arr = [
  [1, 1, 0, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 1],
  [1, 1, 1, 1],
];
const r = solution(arr);
console.log(r);
