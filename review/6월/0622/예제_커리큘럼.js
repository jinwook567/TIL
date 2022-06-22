class Queue {
  constructor() {
    this.rear = 0;
    this.front = 0;
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

function solution(N, graph) {
  const indegree = Array(N + 1).fill(0);
  const time = Array(N + 1).fill(0);

  const data = [];
  graph.forEach((arr, i) => {
    const node = i + 1;
    const cost = arr[0];
    const rest = arr.slice(1);
    time[node] = cost;

    rest.forEach((v) => {
      data.push([v, node]);
      indegree[node]++;
    });
  });
  //1,4이 파트를 없애버려야함.

  const queue = new Queue();

  //초기 큐 넣어주기.
  for (let i = 1; i <= N; i++) {
    if (indegree[i] === 0) {
      queue.enqueue({ node: i, acc: 0 });
    }
  }

  //같은 레벨의 큐에 있으면 동시에 진행할 수 있다. = 같은 레벨에서 맥스값만 찾아서 더하면됨.

  while (queue.size() > 0) {
    const { node, acc } = queue.dequeue();
    time[node] = Math.max(time[node], time[node] + acc);

    const filter = data.filter(([start, end]) => start === node);
    filter.forEach(([start, end]) => {
      indegree[end] -= 1;
      if (indegree[end] === 0) queue.enqueue({ node: end, acc: time[node] });
    });
  }
  return time;
}

const graph = [[10], [10, 1], [4, 1], [4, 3, 1], [3, 3]];

const r = solution(5, graph);
console.log(r);
