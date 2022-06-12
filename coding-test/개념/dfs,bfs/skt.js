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

function solution(grid, k) {
  const answers = [];

  const h = grid.length;
  const w = grid[0].length;
  const visited = Array(h)
    .fill()
    .map(() => Array(w).fill(false));

  function bfs(k, grid, start, acc, sleep, visited, canWalk) {
    const queue = new Queue();
    const n = grid.length;
    const m = grid[0].length;
    const [h, w] = start;
    queue.enqueue([h, w, acc]);

    while (canWalk >= 0 && queue.length() !== 0) {
      const [h, w, count] = queue.dequeue();
      if (h < 0 || w < 0 || h >= n || w >= m) continue;

      if (h === n - 1 && w === m - 1) {
        answers.push(sleep);
        return;
      }
      if (grid[h][w] === "#") continue;

      if (grid[h][w] === "F") {
        if (!(h === start[0] && w === start[1])) {
          bfs(k, grid, [h, w], count, sleep + 1, JSON.parse(JSON.stringify(visited)), k);
          bfs(k, grid, [h, w], count, sleep, JSON.parse(JSON.stringify(visited)), canWalk);
          return;
        }
      }

      if (canWalk === k) {
        console.log(h, w, grid[h][w]);
        console.log(visited[h][w]);
      }

      if (visited[h][w]) continue;
      visited[h][w] = true;

      //node를 처음 방문할 때만 queue를 삽입.
      queue.enqueue([h + 1, w, count + 1]);
      queue.enqueue([h - 1, w, count + 1]);
      queue.enqueue([h, w + 1, count + 1]);
      queue.enqueue([h, w - 1, count + 1]);
      canWalk--;
    }
  }
  const _grid = grid.map((str) => str.split(""));
  bfs(k, _grid, [0, 0], 0, 0, visited, k);
  console.log({ answers });
  return Math.min(...answers);
}

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
