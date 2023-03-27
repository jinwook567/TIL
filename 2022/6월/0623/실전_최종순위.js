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
    if (this.front >= this.rear) return;
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return value;
  }

  size() {
    return this.rear - this.front;
  }
}

//배열의 위치를 변경하고 다시 큐에 추가?

//정답을 본 이후.

//방향이 있는 그래프를 만들 때는 2차원 배열을 이용하면 된다.

function solution2(n, lastYear, changes) {
  const indegree = Array(n + 1).fill(0);
  const edges = [];

  for (let i = 0; i < lastYear.length; i++) {
    for (let j = i + 1; j < lastYear.length; j++) {
      indegree[lastYear[j]] += 1;
      edges.push([lastYear[i], lastYear[j]]);
    }
  }

  const queue = new Queue();

  for (let i = 1; i <= n; i++) {
    if (indegree[i] === 0) queue.enqueue(i);
  }

  //switch를 하게되면, edges에서 출발과 도착을 변경시켜주자.
  changes.forEach((c) => {
    const [a, b] = c;
    const index = edges.findIndex((v) => v[1] === a && v[0] === b);
    edges[index] = [a, b];
    indegree[a] -= 1;
    //a가 앞으로 가는거니까 빠진다.
    indegree[b] += 1;
    //b가 뒤로 가는거니까 더해준다.
  });

  //사이클이 발생하면..
  let count = 0;
  let results = [];

  while (queue.size() > 0) {
    //만일 큐가 없다면..왜 사이클이지..?
    if (queue.size() >= 2) return "?";
    const node = queue.dequeue();
    count++;
    results.push(node);
    const startNodes = edges.filter((a) => a[0] === node);
    startNodes.forEach((a) => {
      const end = a[1];
      indegree[end] -= 1;
      if (indegree[end] === 0) queue.enqueue(end);
    });
    if (count !== n && queue.size() === 0) {
      return "IMPOSSIBLE";
    }
  }

  return results;
  //순서가 있다, 그래프이다. -> 위상 정렬..
}

const n = 5;
const lastYear = [5, 4, 3, 2, 1];
const changes = [
  [2, 4],
  [3, 4],
];

const n2 = 3;
const lastYear2 = [2, 3, 1];
const changes2 = [];

const n3 = 4;
const lastYear3 = [1, 2, 3, 4];
const changes3 = [
  [1, 2],
  [3, 4],
  [2, 3],
];

const r2 = solution2(n, lastYear, changes);
const r3 = solution2(n2, lastYear2, changes2);
const r4 = solution2(n3, lastYear3, changes3);
console.log({ r2, r3, r4 });
