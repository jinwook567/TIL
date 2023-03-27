//위상정렬하면 indegree..!
let fs = require("fs");
let input = fs.readFileSync("./s.txt").toString().trim().split("\n");
const n = +input.shift();
const table = Array(n + 1).fill(0);
const indegree = Array(n + 1).fill(0);
const graph = Array(n + 1)
  .fill()
  .map((_) => []);

for (let i = 1; i <= n; i++) {
  const info = input.shift().split(" ").map(Number);
  table[i] = info.shift();
  info.pop();
  info.forEach((v) => {
    graph[v].push(i);
    indegree[i] += 1;
  });
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
  const firstNodes = indegree.reduce(
    (acc, cur, i) => (cur === 0 && i !== 0 ? [...acc, i] : acc),
    []
  );
  const queue = new Queue();
  firstNodes.forEach((node) => {
    queue.enqueue(node);
  });

  while (queue.size() > 0) {
    const node = queue.dequeue();
    console.log(node);

    graph[node].forEach((v) => {
      indegree[v] -= 1;
      if (indegree[v] === 0) {
        queue.enqueue(v);
      }
    });
  }
}

solution();
