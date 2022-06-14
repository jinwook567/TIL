class Queue {
  constructor() {
    this.front = 0;
    this.rear = 0;
    this.queue = [];
  }

  enqueue(data) {
    this.queue[this.rear++] = data;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return value;
  }

  length() {
    return this.rear - this.front;
  }
}

function bfs(coordinate, start) {
  const queue = new Queue();
  const dy = [1, -1, 0, 0];
  const dx = [0, 0, 1, -1];
  //북,남,동,서
  const [h, w] = start;
  const N = coordinate.length;

  for (let i = 0; i < 4; i++) {
    queue.enqueue([h, w, i]);
  }

  while (queue.length() !== 0) {
    const [h, w, d] = queue.dequeue();

    if (h < 0 || w < 0 || h >= N || w >= N) continue;
    if (coordinate[h][w] === "O") continue;
    if (coordinate[h][w] === "S") return false;
    const ny = h + dy[d];
    const nx = w + dx[d];
    queue.enqueue([ny, nx, d]);
  }
  return true;
}

function combination(arr, n) {
  const result = [];
  if (n === 1) return arr.map((v) => [v]);

  arr.forEach((v, i) => {
    const rest = arr.slice(i + 1);
    const combi = combination(rest, n - 1);
    const attached = combi.map((c) => [v, ...c]);
    result.push(...attached);
  });
  return result;
}

function solution(N, coordinate) {
  const blankPositions = [];
  const teacherPositions = [];
  coordinate.forEach((arr, h) =>
    arr.forEach((v, w) => {
      if (v === "X") blankPositions.push([h, w]);
      if (v === "T") teacherPositions.push([h, w]);
    })
  );

  const combi = combination(blankPositions, 3);

  const setObstacles = (coordinate, obstacles) => {
    const newCoordinate = JSON.parse(JSON.stringify(coordinate));
    obstacles.forEach(([h, w]) => {
      newCoordinate[h][w] = "O";
    });
    return newCoordinate;
  };

  for (let i = 0; i < combi.length; i++) {
    const newCoordinate = setObstacles(coordinate, combi[i]);
    const results = [];
    for (let position of teacherPositions) {
      const result = bfs(newCoordinate, position);
      results.push(result);
    }
    if (results.every((r) => r)) {
      console.log(newCoordinate);
      return "YES";
    }
  }

  return "NO";
}

const coordinate = [
  ["X", "S", "X", "X", "T"],
  ["T", "X", "S", "X", "X"],
  ["X", "X", "X", "X", "X"],
  ["X", "T", "X", "X", "X"],
  ["X", "X", "T", "X", "X"],
];

const coordinate2 = [
  ["S", "S", "S", "T"],
  ["X", "X", "X", "X"],
  ["X", "X", "X", "X"],
  ["T", "T", "T", "X"],
];

const r = solution(5, coordinate);
const r2 = solution(4, coordinate2);
console.log(r);
console.log(r2);
