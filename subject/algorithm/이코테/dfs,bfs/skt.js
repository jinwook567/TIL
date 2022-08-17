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
    //if (this.front === this.rear) return;
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return value;
  }

  length() {
    return this.rear - this.front;
  }
}

function copyArr(arr) {
  const newArr = JSON.parse(JSON.stringify(arr));
  return newArr;
}

function solution(grid, k) {
  const answers = [];

  const h = grid.length;
  const w = grid[0].length;
  const visited = Array(h)
    .fill()
    .map(() => Array(w).fill(false));

  function bfs(k, grid, start, sleep, visited, canWalk) {
    const queue = new Queue();
    const n = grid.length;
    const m = grid[0].length;
    const [h, w] = start;
    queue.enqueue([h, w, canWalk]);

    const dy = [1, -1, 0, 0];
    const dx = [0, 0, 1, -1];

    while (queue.length() !== 0) {
      const [h, w, canWalk] = queue.dequeue();

      if (h === n - 1 && w === m - 1) {
        if (sleep === 2) console.log(visited);
        answers.push(sleep);
        return;
      }

      if (grid[h][w] === "F") {
        if (!(start[0] === h && start[1] === w)) {
          bfs(k, grid, [h, w], sleep + 1, copyArr(visited), k);
          //bfs(k, grid, [h, w], sleep, copyArr(visited), canWalk);
        }
      }

      if (visited[h][w]) continue;
      visited[h][w] = true;

      for (let k = 0; k < 4; k++) {
        const ny = h + dy[k];
        const nx = w + dx[k];
        if (ny < 0 || nx < 0 || nx >= m || ny >= n) continue;
        if (grid[ny][nx] === "#") continue;
        if (canWalk === 0) continue;
        queue.enqueue([ny, nx, canWalk - 1]);
      }
    }
  }
  const _grid = grid.map((str) => str.split(""));
  bfs(k, _grid, [0, 0], 0, visited, k);
  console.log({ answers });
  return Math.min(...answers);
}
//canWalk를 queue마다 관리로 해줘야함.

const grid1 = ["..FF", "###F", "###."];

const grid = [
  ".F.FFFFF.F",
  ".########.",
  ".########F",
  "...######F",
  "##.######F",
  "...######F",
  ".########F",
  ".########.",
  ".#...####F",
  "...#......",
];

// const r = solution(grid1, 4);
// console.log(r);
const r2 = solution(grid, 6);
console.log(r2);
