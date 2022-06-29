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

const example = [
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 4],
];

function solution(N, M, K, X) {
  //최단 거리를 가진 1차원 배열
  const queue = new Queue();
  const distance = Array(N + 1).fill(0);
  const edges = Array(N + 1)
    .fill()
    .map((_) => []);

  example.forEach((el) => {
    edges[el[0]].push(el[1]);
  });

  distance[X] = 0;

  edges[X].forEach((el) => {
    queue.enqueue(el);
    distance[el] = distance[X] + 1;
  });

  while (queue.size() > 0) {
    const node = queue.dequeue();

    edges[node].forEach((el) => {
      if (distance[el] === 0) {
        queue.enqueue(el);
        distance[el] = distance[node] + 1;
      }
    });
  }

  let cnt = 0;
  for (let i = 0; i < N + 1; i++) {
    if (distance[i] === K) {
      console.log(i);
      cnt++;
    }

    if (i === N) {
      if (cnt === 0) console.log(-1);
    }
  }
}

const r = solution(4, 4, 2, 1);
