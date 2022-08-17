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

const graph = [
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 4],
];

function solution(N, M, K, X, graph) {
  const visited = Array(N + 1).fill(false);
  const queue = new Queue();
  //[node, count]
  queue.enqueue([X, 0]);
  const answer = [];

  while (queue.length() !== 0) {
    const [node, count] = queue.dequeue();
    if (count < K) {
      visited[node] = true;
    }
    if (count === K && !visited[node]) {
      answer.push(node);
      continue;
    }
    const ways = graph.filter((v) => v[0] === node);
    ways.forEach(([start, end]) => {
      queue.enqueue([end, count + 1]);
    });
  }

  return answer.length === 0 ? -1 : answer;
}

const r = solution(4, 4, 2, 1, graph);
const r2 = solution(4, 4, 1, 1, [
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 4],
]);
console.log(r);
console.log(r2);
