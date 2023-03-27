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

const keyboard = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["*", "0", "#"],
];

const dx = [-1, 0, 1, 0, 1, 1, -1, -1];
const dy = [0, -1, 0, 1, 1, -1, 1, -1];
const weight = [2, 2, 2, 2, 3, 3, 3, 3];

function getWeight(pos, target) {
  console.log(pos, target);
  const [y, x] = pos;
  if (keyboard[y][x] === target) return 1;

  const queue = new Queue();

  for (let i = 0; i < dx.length; i++) {
    const nx = dx[i] + x;
    const ny = dy[i] + y;
    if (nx >= 0 && nx <= 2 && ny >= 0 && ny <= 2) {
      queue.enqueue({ x: nx, y: ny, w: weight[i] });
    }
  }

  while (queue.size() > 0) {
    const { x, y, w } = queue.dequeue();
    if (keyboard[y][x] === target) return w;

    for (let i = 0; i < dx.length; i++) {
      const nx = dx[i] + x;
      const ny = dy[i] + y;
      if (nx >= 0 && nx <= 2 && ny >= 0 && ny <= 2) {
        queue.enqueue({ x: nx, y: ny, w: weight[i] + w });
      }
    }
  }
}

const findPos = (number) => {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      if (keyboard[j][i] === number) return [j, i];
    }
  }
};

function solution(numbers) {
  let answer = 0;
  let left = [1, 0];
  let right = [1, 2];

  for (let number of numbers) {
    const leftWeight = getWeight(left, number);
    const rightWeight = getWeight(right, number);

    console.log("pos", findPos(number), number);
    if (leftWeight < rightWeight) {
      answer += leftWeight;
      left = findPos(number);
    } else {
      answer += rightWeight;
      right = findPos(number);
    }
  }
  return answer;
}

const numbers = "853";
const r = solution(numbers);
console.log(r);
