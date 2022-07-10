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

function solution(n, coordinate) {
  const distance = {};
  const visited = {};
  const graph = [];

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, -1, 1];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      distance[`${i}${j}`] = Infinity;
      visited[`${i}${j}`] = false;

      for (let k = 0; k < 4; k++) {
        const nx = i + dx[k];
        const ny = j + dy[k];

        if (nx < 0 || ny < 0 || nx >= n || ny >= n) continue;
        graph.push([`${i}${j}`, `${nx}${ny}`, -coordinate[i][j]]);
      }
    }
  }

  const priorityQueue = new PriorityQueue();
  priorityQueue.enqueue(0, "00");
  distance["00"] = 0;

  while (priorityQueue.size() > 0) {
    const { priority: cost, value: start } = priorityQueue.dequeue();
    const edges = graph.filter((v) => v[0] === start);

    edges.forEach(([start, end, cost]) => {
      if (distance[end] > distance[start] - cost) {
        distance[end] = distance[start] - cost;
        priorityQueue.enqueue(distance[end], end);
      }
    });
  }

  console.log(distance);

  return distance[`${n - 1}${n - 1}`] + coordinate[n - 1][n - 1];
}

const coordinate2 = [
  [3, 7, 2, 0, 1],
  [2, 8, 0, 9, 1],
  [1, 2, 1, 8, 1],
  [9, 8, 9, 2, 0],
  [3, 6, 5, 1, 5],
];

const coordinate = [
  [5, 5, 4],
  [3, 9, 1],
  [3, 2, 7],
];

const r = solution(5, coordinate2);
console.log(r);
