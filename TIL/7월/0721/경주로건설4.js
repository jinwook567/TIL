//어떻게 보면 dfs와 동일한 풀이임..
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

  size() {
    return this.rear - this.front;
  }
}

function getDirection(before, current) {
  const [y, x] = before;
  const [ny, nx] = current;

  if (y !== ny) {
    return y > ny ? "T" : "B";
  } else {
    return x > nx ? "L" : "R";
  }
}

function solution(board) {
  const queue = new Queue();
  const visited = Array(board.length)
    .fill()
    .map(() => Array(board.length).fill(false));
  const distance = Array(board.length)
    .fill()
    .map(() => Array(board.length).fill(Infinity));

  visited[0][0] = true;
  queue.enqueue({ coordinate: [0, 0], direction: "S", cost: 0, path: [[0, 0]] });

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, 1, -1];

  const n = board.length;

  while (queue.size() > 0) {
    const { coordinate, direction, cost, path } = queue.dequeue();
    console.log(coordinate);

    const [y, x] = coordinate;
    distance[y][x] = Math.min(distance[y][x], cost);
    if (coordinate[0] === n - 1 && coordinate[1] === n - 1) {
      continue;
    }

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];
      if (ny < 0 || nx < 0 || nx >= n || ny >= n) continue;
      if (board[ny][nx] === 1) continue;
      const nDirection = getDirection(coordinate, [ny, nx]);
      const nCost = direction === nDirection || direction === "S" ? cost + 100 : cost + 100 + 500;
      if (visited[ny][nx] && distance[ny][nx] <= cost) continue;

      visited[ny][nx] = true;
      distance[ny][nx] = nCost;

      queue.enqueue({
        coordinate: [ny, nx],
        direction: nDirection,
        cost: nCost,
        path: [...path, [ny, nx]],
      });
    }
  }

  return distance[n - 1][n - 1];
}
const board = [
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0],
];

const r = solution(board);
console.log(r);
