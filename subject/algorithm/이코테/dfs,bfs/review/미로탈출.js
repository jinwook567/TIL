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

//안의 number를 바꾸는 테크닉.
function solution(N, M, dimension) {
  //bfs
  //queue
  const queue = new Queue();
  queue.enqueue([0, 0, 1]);
  //[h, w, count]
  while (true) {
    const value = queue.dequeue();
    const [h, w, count] = value;

    if (h < 0 || w < 0 || h >= N || w >= M) continue;
    if (h === N - 1 && w === M - 1) return count;
    if (dimension[h][w] === 0) continue;

    queue.enqueue([h + 1, w, count + 1]);
    queue.enqueue([h - 1, w, count + 1]);
    queue.enqueue([h, w + 1, count + 1]);
    queue.enqueue([h, w - 1, count + 1]);
  }
}

const r = solution(5, 6, [
  [1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1],
]);
console.log(r);
