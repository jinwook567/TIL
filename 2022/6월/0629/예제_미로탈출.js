const coordinate = [
  [1, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
];

//BFS
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

function solution(N, M, coordinate) {
  const queue = new Queue();

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, 1, -1];
  queue.enqueue([0, 0]);

  while (queue.size() > 0) {
    const position = queue.dequeue();
    const [y, x] = position;

    for (let i = 0; i < 4; i++) {
      const nx = dx[i] + x;
      const ny = dy[i] + y;

      if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
      if (coordinate[ny][nx] !== 1) continue;
      //큐에 들어간 이상 방문처리 해줘야 하는 것임.
      coordinate[ny][nx] = coordinate[y][x] + 1;
      queue.enqueue([ny, nx]);
    }
  }

  return coordinate[N - 1][M - 1];
}

const r = solution(5, 6, coordinate);
console.log(r);
