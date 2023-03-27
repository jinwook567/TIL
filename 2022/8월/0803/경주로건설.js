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

function solution(board) {
  const queue = new Queue();
  const dy = [0, -1, 0, 1];
  const dx = [1, 0, -1, 0];
  const n = board.length;
  const visited = Array(n)
    .fill()
    .map((_) =>
      Array(n)
        .fill()
        .map((_) => [])
    );

  visited.forEach((arr) =>
    arr.forEach((v) => {
      v.push(false, false, false, false);
    })
  );

  //0 우, 1 상 2 좌, 3 하
  queue.enqueue({ coordinate: [0, 0], direction: 0, cost: 0 });
  queue.enqueue({ coordinate: [0, 0], direction: 3, cost: 0 });

  while (queue.size() > 0) {
    const { coordinate, direction, cost } = queue.dequeue();
    const [y, x] = coordinate;

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];
      if (ny < 0 || nx < 0 || nx >= n || ny >= n) continue;
      if (board[ny][nx] === 1) continue;

      const ncost = cost + 100 + (direction === i ? 0 : 500);
      if (ny === 1 && nx === 0) {
        console.log(y, x, ncost, ny, nx, visited[ny][nx]);
      }
      //다시 뒤로 돌아가는 상황은 고려하지 않아도 되므로 그냥 좌,우에서 이동할 때도 500원 더해줘도 됨.

      if (!visited[ny][nx][i]) {
        if (board[ny][nx] === 0) {
          board[ny][nx] = ncost;
        } else {
          board[ny][nx] = Math.min(board[ny][nx], ncost);
        }
        visited[ny][nx][i] = true;
        queue.enqueue({ coordinate: [ny, nx], direction: i, cost: ncost });
      }
    }
  }
  //console.log(board);

  return board[n - 1][n - 1];
}

const board = [
  [0, 0, 1, 0],
  [0, 0, 0, 0],
  [0, 1, 0, 1],
  [1, 0, 0, 0],
];

const r = solution(board);
console.log(r);
