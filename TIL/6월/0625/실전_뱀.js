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

  get() {
    return this.queue.slice(this.front);
  }
}

function solution(N, apples, changes) {
  //머리가 갔던 경로를 넣어주면 간편하게 꼬리의 위치를 알 수 있다.
  const steps = {
    R: [0, 1],
    L: [0, -1],
    T: [-1, 0],
    B: [1, 0],
  };

  const directions = ["L", "T", "R", "B"];
  let dIndex = 2;

  let changeTime = 0;
  let moves = 0;
  let position = [0, 0];
  const queue = new Queue();
  queue.enqueue(position);

  while (true) {
    const direction = directions[dIndex];
    const ny = position[0] + steps[direction][0];
    const nx = position[1] + steps[direction][1];

    const arr = queue.get();
    const isMyBody = arr.find((v) => v[0] === ny && v[1] === nx);

    //종료조건
    if (ny < 0 || nx < 0 || nx >= N || ny >= N || isMyBody) {
      return moves + 1;
    }

    position = [ny, nx];
    queue.enqueue([ny, nx]);

    const appleIndex = apples.findIndex((v) => v[0] - 1 === ny && v[1] - 1 === nx);
    //사과 먹은거 뺴줘야함..

    if (appleIndex === -1) {
      queue.dequeue();
    } else {
      apples[appleIndex] = [N + 2, N + 2];
    }

    moves++;
    if (changeTime < changes.length) {
      if (moves === changes[changeTime][0]) {
        dIndex = changes[changeTime][1] === "L" ? (dIndex - 1) % 4 : (dIndex + 1) % 4;
        changeTime++;
      }
    }
    //종료 조건, 벽 또는 자기 자신에 부딪히면
  }
}

const apples = [
  [3, 4],
  [2, 5],
  [5, 3],
];

const changes = [
  [3, "D"],
  [15, "L"],
  [17, "D"],
];

const apples2 = [
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
];
const changes2 = [
  [8, "D"],
  [10, "D"],
  [11, "D"],
  [13, "L"],
];

const apples3 = [
  [1, 5],
  [1, 3],
  [1, 2],
  [1, 6],
  [1, 7],
];

const apples5 = [
  [2, 5],
  [2, 4],
];

const changes5 = [
  [4, "D"],
  [5, "D"],
  [6, "D"],
  [7, "D"],
  [8, "D"],
  [9, "D"],
];
// 출력:
// 10
// 정답:
// 14

//const r = solution(6, apples, changes);
const r2 = solution(5, apples5, changes5);
console.log({ r2 });
