const graph = [[], [2, 3, 8], [1, 7], [1, 4, 5], [3, 5], [3, 4], [7], [2, 6, 8], [1, 7]];
//0은 없는 것 처리.
//1,2,3,4,5,6,7,8 노드 연결 상태
const visited = Array(9).fill(false);

function dfs(graph, node, visited) {
  visited[node] = true;
  console.log(node);
  graph[node].forEach((v) => {
    if (!visited[v]) {
      dfs(graph, v, visited);
    }
  });
}
dfs(graph, 1, visited);

const visited2 = Array(9).fill(false);

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

  getLength() {
    return this.rear - this.front;
  }
}

function bfs(graph, initialNode, visited) {
  const queue = new Queue();
  queue.enqueue(initialNode);
  visited[initialNode] = true;

  while (queue.getLength() !== 0) {
    const node = queue.dequeue();
    console.log(node);
    graph[node].forEach((v) => {
      if (!visited[v]) {
        queue.enqueue(v);
        visited[v] = true;
      }
    });
  }
}

bfs(graph, 1, visited2);
