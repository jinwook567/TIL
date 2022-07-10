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

//BFS 최단거리 뭐였지...?
function solution(n, coordinate) {
  const visited = Array(n)
    .fill()
    .map(() => Array(n).fill(false));

  const queue = new Queue();

  queue.enqueue([0, 0, coordinate[0][0]]);
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, -1, 1];
  let min = Infinity;

  while (queue.size() > 0) {
    console.log(queue);
    const [y, x, c] = queue.dequeue();

    if (y === n - 1 && x === n - 1) {
      return c;
    }
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx < 0 || ny < 0 || nx >= n || ny >= n) continue;
      if (visited[ny][nx]) continue;
      // visited[ny][nx] = true;
      queue.enqueue([ny, nx, c + coordinate[ny][nx]]);
    }
  }
  return min;
}

const r = solution(5, [
  [3, 7, 2, 0, 1],
  [2, 8, 0, 9, 1],
  [1, 2, 1, 8, 1],
  [9, 8, 9, 2, 0],
  [3, 6, 5, 1, 5],
]);

//solution(n, coordinate);
console.log(r);
//BFS뭐지..?
