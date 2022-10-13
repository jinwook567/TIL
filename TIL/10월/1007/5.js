//플로이드 워셜 알고리즘

//심부름 2번 해야함. 순서대로 해야함.
//무방향 그래프 양쪽으로 둘다 갈 수 있음.

//플로이드 워셜로 해결할 수 있는 문제가 아님.
//다익스트라 알고리즘을 사용해야함.

// 1->x, x->y, y->end

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

const graph = Array(n + 1)
  .fill()
  .map((_) => []);
const startNode = +input.shift();
for (let i = 0; i < m; i++) {
  const [start, end, cost] = input.shift().split(" ").map(Number);
  graph[start].push([end, cost]);
}

function dijkstra(n, graph, start, end) {
  const d = Array(n + 1).fill(Infinity);
  d[start] = 0;
  const queue = new PriorityQueue();
  queue.enqueue(0, start);

  while (queue.size() > 0) {
    const { value: node, priority: dist } = queue.dequeue();
    if (-dist > d[node]) continue;

    graph[node].forEach(([arrive, cost]) => {
      d[arrive] = Math.min(d[arrive], d[node] + cost);
      if (d[arrive] === d[node] + cost) queue.enqueue(-d[arrive], arrive);
    });
  }
  return d[end];
}

const dist = dijkstra(n, graph, startNode);
