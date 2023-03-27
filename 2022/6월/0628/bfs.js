const graph = [[], [2, 3, 8], [1, 7], [1, 4, 5], [3, 5], [3, 4], [7], [2, 6, 8], [1, 7]];
const visited = Array(9).fill(false);

class Queue {
  constructor() {
    this.rear = 0;
    this.front = 0;
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

function bfs(graph, visited, start) {
  const queue = new Queue();
  queue.enqueue(start);
  visited[start] = true;

  while (queue.size() > 0) {
    const node = queue.dequeue();
    console.log(node);

    for (let v of graph[node]) {
      if (!visited[v]) {
        queue.enqueue(v);
        visited[v] = true;
      }
    }
  }
}

bfs(graph, visited, 1);
