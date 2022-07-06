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

function dijkstra(n, graph, start) {
  const distance = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
  const visited = Array(n + 1).fill(false);
  distance[0] = 0;
  visited[0] = true;
  visited[start] = 0;
  distance[start] = 0;

  const getEdgesByNode = (node, graph) => {
    return graph.filter((v) => v[0] === node);
  };

  const findMinIndex = (distance, visited) => {
    let min = Number.MAX_SAFE_INTEGER;
    let index = 0;

    for (let i = 1; i < distance.length; i++) {
      if (min > distance[i] && !visited[i]) {
        min = distance[i];
        index = i;
      }
    }
    return index;
  };

  //visited가 없을 때 까지. 혹은 n-1번 반복해도 좋음.
  while (true) {
    const isAllVisited = visited.every((v) => v);
    if (isAllVisited) break;

    const node = findMinIndex(distance, visited);
    visited[node] = true;
    const edges = getEdgesByNode(node, graph);

    for (let e of edges) {
      const [st, end, cost] = e;
      distance[end] = Math.min(distance[end], distance[st] + cost);
    }
  }
  return distance;
}

const r = dijkstra(6, graph, 1);
console.log(r);

// 개선된 다익스트라 알고리즘.
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  swap(aIndex, bIndex) {
    const temp = this.queue[aIndex];
    this.queue[aIndex] = this.queue[bIndex];
    this.queue[bIndex] = temp;
  }

  enqueue(priority, value) {
    const node = { priority, value };
    this.queue.push(node);

    let currentIndex = this.queue.length - 1;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    while (
      parentIndex >= 0 &&
      this.queue[parentIndex].priority < this.queue[currentIndex].priority
    ) {
      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
      parentIndex = Math.floor((currentIndex - 1) / 2);
    }
  }

  dequeue() {
    if (this.queue.length === 0) return undefined;
    if (this.queue.length === 1) return this.queue.pop();

    const root = this.queue[0];
    const end = this.queue.pop();
    this.queue[0] = end;

    let currentIndex = 0;
    let leftIndex = 1;
    let rightIndex = 2;

    while (
      (this.queue[leftIndex] &&
        this.queue[currentIndex].priority < this.queue[leftIndex].priority) ||
      (this.queue[rightIndex] &&
        this.queue[currentIndex].priority < this.queue[rightIndex].priority)
    ) {
      if (
        !this.queue[rightIndex] ||
        this.queue[leftIndex].priority > this.queue[rightIndex].priority
      ) {
        this.swap(currentIndex, leftIndex);
        currentIndex = leftIndex;
      } else {
        this.swap(currentIndex, rightIndex);
        currentIndex = rightIndex;
      }
      leftIndex = currentIndex * 2 + 1;
      rightIndex = currentIndex * 2 + 2;
    }
    return root;
  }

  size() {
    return this.queue.length;
  }
}

function dijkstra2(n, graph, start) {
  const distance = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
  const visited = Array(n + 1).fill(false);
  distance[0] = 0;
  visited[0] = true;
  distance[start] = 0;
  visited[start] = true;

  const getEdgesByNode = (graph, node) => {
    return graph.filter((v) => v[0] === node);
  };

  const priorityQueue = new PriorityQueue();
  priorityQueue.enqueue(0, start);

  while (priorityQueue.size() > 0) {
    const { priority: d, value: node } = priorityQueue.dequeue();
    const edges = getEdgesByNode(graph, node);

    edges.forEach(([st, end, cost]) => {
      if (distance[end] > d + cost) {
        distance[end] = d + cost;
        priorityQueue.enqueue(distance[end], end);
      }
    });
  }
  return distance;
}

const r2 = dijkstra2(6, graph, 1);
console.log({ r2 });
