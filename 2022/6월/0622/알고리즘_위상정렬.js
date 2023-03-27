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
    if (this.front >= this.rear) return;
    const value = this.queue[this.front++];
    return value;
  }

  size() {
    return this.rear - this.front;
  }
}

function topologicalSort(V, E, graph) {
  const results = [];
  const indegree = Array(V + 1).fill(0);

  const queue = new Queue();

  for (let [start, end] of graph) {
    indegree[end] += 1;
  }

  function enqueueZero() {
    for (let i = 1; i <= V; i++) {
      if (indegree[i] === 0) queue.enqueue(i);
    }
  }

  enqueueZero();

  while (queue.size() > 0) {
    const dequeued = queue.dequeue();
    results.push(dequeued);

    //1로 시작되는 모든 것들을 한번 간다고 생각한다. 1을 빼준다.
    const filtered = graph.filter(([start, end]) => start === dequeued);
    filtered.forEach(([start, end]) => {
      indegree[end] -= 1;

      if (indegree[end] === 0) queue.enqueue(end);
    });
  }
  return results;
}

const graph = [
  [1, 2],
  [1, 5],
  [2, 3],
  [2, 6],
  [3, 4],
  [4, 7],
  [5, 6],
  [6, 4],
];

const r = topologicalSort(7, 8, graph);
console.log(r);
