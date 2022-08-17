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

  last(v, nv) {
    if (this.queue[this.front][2] === v && this.queue[this.front + 1][2] === nv) {
      return true;
    } else {
      return false;
    }
  }
}

function solution(N, K, X, Y, S, dimension) {
  const queue = new Queue();

  //초기 바이러스 queue 삽입.
  dimension.forEach((arr, h) =>
    arr.forEach((v, w) => {
      if (v !== 0) queue.enqueue([h, w, v]);
    })
  );

  let seconds = 0;

  const visited = Array(dimension.length)
    .fill()
    .map(() => Array(dimension.length));

  while (seconds <= S && queue.length() > 0) {
    const [h, w, v] = queue.dequeue();

    if (h < 0 || w < 0 || h >= dimension.length || w >= dimension[0].length) continue;

    if (visited[h][w]) continue;

    if (dimension[h][w] === 0 || (!visited[h][w] && dimension[h][w] === v)) {
      dimension[h][w] = v;
    } else {
      continue;
    }

    visited[h][w] = true;

    if (queue.last(K, 1)) {
      seconds++;
    }

    queue.enqueue([h + 1, w, v]);
    queue.enqueue([h - 1, w, v]);
    queue.enqueue([h, w + 1, v]);
    queue.enqueue([h, w - 1, v]);
  }
  console.log(dimension);
  return dimension[X - 1][Y - 1];
}

const r = solution(3, 3, 3, 2, 2, [
  [1, 0, 2],
  [0, 0, 0],
  [3, 0, 0],
]);

console.log(r);
