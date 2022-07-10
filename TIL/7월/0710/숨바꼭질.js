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

const graph = [
  [3, 6],
  [4, 3],
  [3, 2],
  [1, 3],
  [1, 2],
  [2, 4],
  [5, 2],
];

function solution(n, graph) {
  const data = [];
  graph.forEach(([start, end]) => {
    data.push([start, end, 1]);
    data.push([end, start, 1]);
  });

  const distance = Array(n + 1).fill(Infinity);

  const priorityQueue = new PriorityQueue();
  priorityQueue.enqueue(0, 1);
  distance[1] = 0;

  while (priorityQueue.size() > 0) {
    const { priority: dist, value: node } = priorityQueue.dequeue();
    data
      .filter((v) => v[0] === node)
      .forEach(([start, end, cost]) => {
        if (distance[start] < -dist) return;
        //이미 처리된 노드라면 무시.
        if (distance[end] > distance[start] + cost) {
          distance[end] = distance[start] + cost;
          priorityQueue.enqueue(-distance[end], end);
        }
      });
  }
  console.log(distance);
}

const n = 6;
const r = solution(n, graph);
console.log(r);
