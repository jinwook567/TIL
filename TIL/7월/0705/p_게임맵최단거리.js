//BFS 최단거리 문제, 사실 풀 필요 없었음.
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

const maps = [
  [1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [0, 0, 0, 0, 1],
];

function solution(maps) {
  //1이 갈 수 있는 자리.
  const n = maps.length; //y
  const m = maps[0].length; //x

  const queue = new Queue();
  const visited = Array(n)
    .fill()
    .map(() => Array(m).fill(false));

  const path = Array(n)
    .fill()
    .map(() => Array(m).fill(0));

  queue.enqueue([0, 0]);
  visited[0][0] = true;
  path[0][0] = 1;

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  while (queue.size() > 0) {
    const [y, x] = queue.dequeue();
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= m || ny >= n) continue;
      if (visited[ny][nx] || maps[ny][nx] === 0) continue;
      //방문을 했거나, 0이 아닌 경우
      queue.enqueue([ny, nx]);
      visited[ny][nx] = true;
      path[ny][nx] = path[y][x] + 1;
    }
  }
  return path[n - 1][m - 1];
}

const r = solution(maps);
console.log(r);
