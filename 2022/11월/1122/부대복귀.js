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

function solution(n, roads, sources, destination) {
  const distance = Array(n + 1).fill(1000001);
  const visited = Array(n + 1).fill(false);

  const graph = Array(n + 1)
    .fill()
    .map((_) => []);

  roads.forEach(([start, end]) => {
    graph[start].push(end);
    graph[end].push(start);
  });

  const priorityQueue = new PriorityQueue();

  distance[destination] = 0;
  priorityQueue.enqueue(0, destination);

  while (priorityQueue.size() > 0) {
    const { priority: dist, value: node } = priorityQueue.dequeue();
    if (d[node] > -dist) continue;

    graph[node].forEach((end) => {
      distance[end] = Math.min(distance[end], distance[node] + 1);
      if (distance[end] === distance[node] + 1) {
        priorityQueue.enqueue(-distance[end], end);
      }
    });
  }
  return sources.map((v) => {
    return distance[v] === 1000001 ? -1 : distance[v];
  });
}
