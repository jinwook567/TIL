const n = 7;
const edges = [
  [1, 2],
  [1, 5],
  [2, 3],
  [2, 6],
  [3, 4],
  [4, 7],
  [5, 6],
  [6, 4],
];

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

function solution() {
  const indegree = Array(n + 1).fill(0);
  for (let [start, end] of edges) {
    indegree[end] += 1;
  }

  const queue = new Queue();

  queue.enqueue(indegree.findIndex((v, i) => v === 0 && i > 0));

  while (queue.size() > 0) {
    const node = queue.dequeue();
    console.log(node);
    edges
      .filter((v) => v[0] === node)
      .forEach(([_, end]) => {
        indegree[end] -= 1;
        if (indegree[end] === 0) queue.enqueue(end);
      });
  }
}
solution();
