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
  let answer = [Infinity, Infinity];

  const pathsByNode = Array(n + 1)
    .fill()
    .map((_) => []);

  paths.forEach(([i, j, w]) => {
    pathsByNode[i].push([j, w]);
    pathsByNode[j].push([i, w]);
  });

  pathsByNode.forEach((arr) => arr.sort((a, b) => a[1] - b[1]));

  const d = {};
  gates.forEach((v) => {
    d[v] = Array(n + 1).fill(Infinity);
    d[v][v] = 0;
  });

  const queue = new Queue();

  gates.forEach((g) => {
    pathsByNode[g].forEach(([end, cost]) => {
      queue.enqueue({ visited: [g, end], current: end, intensity: cost, start: g });
    });
  });

  while (queue.size() > 0) {
    const { visited, current, intensity, start } = queue.dequeue();

    if (summits.includes(current)) {
      if (answer[1] > intensity) {
        answer[1] = intensity;
        answer[0] = current;
      }

      if (answer[1] === intensity) {
        answer[0] = Math.min(answer[0], current);
      }
      continue;
    }

    if (intensity > answer[1]) continue;
    if (gates.includes(current)) continue;
    if (d[start][current] < intensity) continue;
    d[start][current] = intensity;

    pathsByNode[current].forEach(([end, cost]) => {
      if (visited.includes(end)) return;
      queue.enqueue({
        visited: [...visited, end],
        current: end,
        intensity: cost > intensity ? cost : intensity,
        start,
      });
    });
  }
  console.log(d);
  return answer;
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
