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

function solution(n, paths, gates, summits) {
  const answer = [];

  const pathsByNode = Array(n + 1)
    .fill()
    .map((_) => []);

  paths.forEach(([i, j, w]) => {
    pathsByNode[i].push([j, w]);
    pathsByNode[j].push([i, w]);
  });

  const d = Array(n + 1).fill(Infinity);

  const queue = new Queue();
  gates.forEach((v) => {
    d[v] = -1; //왜 -1이지?
  });

  while (queue.size() > 0) {
    const node = queue.dequeue();

    if (gates.includes(node)) continue;
    if (summits.includes(node)) continue;

    pathsByNode[node].forEach(([end, intensity]) => {
      const maxIntensity = Math.max(d[end], intensity);
      if (d[end] > maxIntensity) {
        d[end] = maxIntensity;
        queue.enqueue(end);
      }
    });
  }

  return summits
    .map((node) => {
      return { node, intensity: d[node] };
    })
    .sort((a, b) => {
      if (a.intensity === b.intensity) {
        return a.node - b.node;
      }

      return a.intensity - b.intensity;
    })[0];
}

const n = 7;
const paths = [
  [1, 2, 5],
  [1, 4, 1],
  [2, 3, 1],
  [2, 6, 7],
  [4, 5, 1],
  [5, 6, 1],
  [6, 7, 1],
];
const gates = [3, 7];
const summits = [1, 5];
const r = solution(n, paths, gates, summits);
console.log(r);
