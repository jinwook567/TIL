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

const getCanVisitNodes = (visited, edges) => {
  const canVisit = new Set();
  visited.forEach((v) => {
    const nodes = edges.filter((el) => el[0] === v);
    nodes.forEach(([start, end]) => {
      if (!visited.includes(end)) canVisit.add(end);
    });
  });
  return [...canVisit];
};

const getSheepCount = (visited, info) => {
  const sheepCount = visited.reduce((acc, cur) => acc + (info[cur] === 0 ? 1 : 0), 0);
  const wolfCount = visited.length - sheepCount;
  return sheepCount > wolfCount ? sheepCount : 0;
};

function solution(info, edges) {
  let answer = 0;

  const queue = new Queue();
  queue.enqueue({ visited: [0], sheep: 1, wolf: 0 });

  while (queue.size() > 0) {
    const { visited, sheep, wolf } = queue.dequeue();
    const count = sheep > wolf ? sheep : 0;
    answer = Math.max(answer, count);
    if (answer === 5 && count === 5) {
      console.log(visited, sheep);
    }

    const canVisitNodes = getCanVisitNodes(visited, edges);
    canVisitNodes.forEach((v) => {
      queue.enqueue({
        visited: [...visited, v],
        sheep: sheep + (info[v] === 0 ? 1 : 0),
        wolf: wolf + info[v],
      });
    });
  }
  return answer;
}

const info = [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1];
const edges = [
  [0, 1],
  [1, 2],
  [1, 4],
  [0, 8],
  [8, 7],
  [9, 10],
  [9, 11],
  [4, 3],
  [6, 5],
  [4, 6],
  [8, 9],
];
const r = solution(info, edges);
console.log(r);
