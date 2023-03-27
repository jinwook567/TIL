let fs = require("fs");
//let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let input = fs.readFileSync("./sample.txt").toString().trim().split("\n");

const [N, K] = input.shift().split(" ").map(Number);
const coordinate = [];
for (let i = 0; i < N; i++) {
  coordinate.push(input.shift().split(" ").map(Number));
}

const [S, X, Y] = input.shift().split(" ").map(Number);

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

function solution(N, K, coordinate, S, X, Y) {
  const queue = new Queue();

  const first = [];
  coordinate.forEach((arr, y) =>
    arr.forEach((v, x) => {
      if (v !== 0) first.push([v, y, x, 0]);
    })
  );

  first.sort((a, b) => a[0] - b[0]);

  first.forEach((el) => {
    queue.enqueue(el);
  });

  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, 1, -1];

  while (queue.size() > 0) {
    const [virus, y, x, time] = queue.dequeue();

    if (time === S) break;

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];
      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;

      if (coordinate[ny][nx] === 0) {
        coordinate[ny][nx] = virus;
        queue.enqueue([virus, ny, nx, time + 1]);
      }
    }
  }

  console.log(coordinate[X - 1][Y - 1]);
}

solution(N, K, coordinate, S, X, Y);

//기본적인 자료구조를 제공한다는 점이.. 전략적으로 생각했을 떄 무엇이 더 좋을까?
