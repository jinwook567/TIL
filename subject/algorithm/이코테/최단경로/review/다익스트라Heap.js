class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(value, priority) {
    const node = new Node(value, priority);
    this.queue.push(node);
    let childIndex = this.queue.length - 1;
    let parentIndex = Math.floor((childIndex - 1) / 2);

    while (parentIndex >= 0) {
      if (this.queue[childIndex].priority > this.queue[parentIndex].priority) {
        const temp = this.queue[parentIndex];
        this.queue[parentIndex] = this.queue[childIndex];
        this.queue[childIndex] = temp;
        childIndex = parentIndex;
        parentIndex = Math.floor((childIndex - 1) / 2);
      } else {
        break;
      }
    }
  }

  dequeue() {
    const max = this.queue[0];
    const end = this.queue.pop();
    if (this.queue.length !== 0) {
      this.queue[0] = end;
    }
    let parentIndex = 0;
    let childIndex = parentIndex * 2 + 1;
    let swap = false;

    while (this.queue[childIndex]) {
      //왼쪽 비교
      if (this.queue[childIndex].priority > this.queue[parentIndex].priority) {
        const temp = this.queue[parentIndex];
        this.queue[parentIndex] = this.queue[childIndex];
        this.queue[childIndex] = temp;
        swap = true;
      }

      //오른쪽 비교
      childIndex++;
      if (
        this.queue[childIndex] &&
        this.queue[childIndex].priority > this.queue[parentIndex].priority
      ) {
        const temp = this.queue[parentIndex];
        this.queue[parentIndex] = this.queue[childIndex];
        this.queue[childIndex] = temp;
        swap = true;
      } else {
        childIndex--;
      }

      if (!swap) break;
      parentIndex = childIndex;
      childIndex = parentIndex * 2 + 1;
    }
    return max;
  }
}

function dijkstra(n, graph, start) {
  const visited = Array(n + 1).fill(false);
  visited[0] = true;
  const distance = Array(n + 1).fill(Infinity);
  distance[start] = 0;

  const getNodes = (graph, start) => {
    return graph.filter(([s, e, d]) => s === start);
  };

  const priorityQueue = new PriorityQueue();
  priorityQueue.enqueue(start, 0);

  while (priorityQueue.queue.length !== 0) {
    const { value: node, priority } = priorityQueue.dequeue();
    visited[node] = true;

    const nodes = getNodes(graph, node);
    console.log(priorityQueue);

    nodes.forEach(([s, e, d]) => {
      if (distance[e] > priority + d) {
        distance[e] = priority + d;
        priorityQueue.enqueue(e, priority + d);
      }
    });
  }
  console.log(distance);
}

const graph = [
  [1, 2, 2],
  [1, 3, 5],
  [1, 4, 1],
  [2, 3, 3],
  [2, 4, 2],
  [3, 2, 3],
  [3, 6, 5],
  [4, 3, 3],
  [4, 5, 1],
  [5, 3, 1],
  [5, 6, 2],
];
dijkstra(6, graph, 1);
