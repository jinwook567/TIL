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

function solution(n, roads, sources, destination) {
  const graph = Array(n + 1)
    .fill()
    .map((_) => []);

  roads.forEach(([start, end]) => {
    graph[start].push(end);
    graph[end].push(start);
  });

  const distance = Array(n + 1).fill(Infinity);
  const queue = new Queue();
  queue.enqueue(destination);

  distance[destination] = 0;

  while (queue.length > 0) {
    const node = queue.dequeue();
    graph[node].forEach((end) => {
      distance[end] = Math.min(distance[end], distance[node] + 1);
      if (distance[end] === distance[node] + 1) {
        queue.enqueue(end);
      }
    });
  }

  return sources.map((v) => {
    return distance[v] === Infinity ? -1 : distance[v];
  });
}
