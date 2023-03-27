let fs = require("fs");
let input = fs.readFileSync("./s.txt").toString().trim().split("\n");
const n = +input.shift();

const table = Array(n + 1).fill(0);
const startNodes = Array(n + 1).fill(true);
const graph = Array(n + 1)
  .fill()
  .map((_) => []);

for (let i = 1; i <= n; i++) {
  const info = input.shift().split(" ").map(Number);
  table[i] = info.shift();
  info.pop();
  info.forEach((v) => graph[v].push(i));
  if (info.length !== 0) startNodes[i] = false;
}

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
  const answer = Array(n + 1).fill(0);
  const firstNodes = startNodes.reduce((acc, cur, i) => (cur && i !== 0 ? [...acc, i] : acc), []);
  const queue = new Queue();

  firstNodes.forEach((v) => {
    queue.enqueue({ node: v, acc: 0 });
  });

  while (queue.size() > 0) {
    const { node, acc } = queue.dequeue();
    answer[node] = Math.max(answer[node], acc + table[node]);
    graph[node].forEach((v) => queue.enqueue({ node: v, acc: answer[node] }));
  }
}

const r = solution();
console.log(r);
