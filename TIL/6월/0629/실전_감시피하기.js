let fs = require("fs");
//let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let input = fs.readFileSync("./sample.txt").toString().trim().split("\n");

const coordinate = [];

const N = +input.shift();
for (let i = 0; i < N; i++) {
  coordinate.push(input.shift().split(" "));
}

function getCombination(arr, n) {
  const result = [];
  if (n === 1) return arr.map((el) => [el]);

  arr.forEach((v, i) => {
    const rest = arr.slice(i + 1);
    const combination = getCombination(rest, n - 1);
    const attached = combination.map((el) => [v, ...el]);
    result.push(...attached);
  });
  return result;
}

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

function solution(N, coordinate) {
  const empty = [];
  const teachers = [];
  coordinate.forEach((arr, y) =>
    arr.forEach((v, x) => {
      if (v === "X") empty.push([y, x]);
      if (v === "T") teachers.push([y, x]);
    })
  );

  const combination = getCombination(empty, 3);

  const dy = [0, 0, -1, 1];
  const dx = [1, -1, 0, 0];

  //중간에 true가 한번이라도 나오면 return true
  for (let i = 0; i < combination.length; i++) {
    const walls = combination[i];
    const newCoordinate = JSON.parse(JSON.stringify(coordinate));
    walls.forEach(([y, x]) => {
      newCoordinate[y][x] = "O";
    });

    let blind = true;
    for (let j = 0; j < teachers.length; j++) {
      if (!blind) break;
      const [y, x] = teachers[j];
      const queue = new Queue();
      queue.enqueue([y, x, 0]);
      queue.enqueue([y, x, 1]);
      queue.enqueue([y, x, 2]);
      queue.enqueue([y, x, 3]);

      while (queue.size() > 0) {
        const [y, x, direction] = queue.dequeue();

        const ny = dy[direction] + y;
        const nx = dx[direction] + x;

        if (ny < 0 || nx < 0 || nx >= N || ny >= N) continue;
        if (newCoordinate[ny][nx] === "O") continue;
        if (newCoordinate[ny][nx] === "S") {
          blind = false;
          break;
        }
        queue.enqueue([ny, nx, direction]);
      }
    }
    //모든 선생에 대해서 다 통과가 된다면..
    if (blind) {
      return "YES";
    }
  }

  return "NO";
}

const r = solution(N, coordinate);
console.log(r);
