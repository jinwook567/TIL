class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  swap(aIndex, bIndex) {
    const temp = this.queue[aIndex];
    this.queue[aIndex] = this.queue[bIndex];
    this.queue[bIndex] = temp;
  }

  enqueue(priority, value) {
    const node = { priority, value };
    this.queue.push(node);

    let currentIndex = this.queue.length - 1;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    while (
      parentIndex >= 0 &&
      this.queue[parentIndex].priority < this.queue[currentIndex].priority
    ) {
      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
      parentIndex = Math.floor((currentIndex - 1) / 2);
    }
  }

  dequeue() {
    if (this.queue.length === 0) return undefined;
    if (this.queue.length === 1) return this.queue.pop();

    const root = this.queue[0];
    const end = this.queue.pop();
    this.queue[0] = end;

    let currentIndex = 0;
    let leftIndex = 1;
    let rightIndex = 2;

    while (
      (this.queue[leftIndex] &&
        this.queue[currentIndex].priority < this.queue[leftIndex].priority) ||
      (this.queue[rightIndex] &&
        this.queue[currentIndex].priority < this.queue[rightIndex].priority)
    ) {
      if (
        !this.queue[rightIndex] ||
        this.queue[leftIndex].priority > this.queue[rightIndex].priority
      ) {
        this.swap(currentIndex, leftIndex);
        currentIndex = leftIndex;
      } else {
        this.swap(currentIndex, rightIndex);
        currentIndex = rightIndex;
      }
      leftIndex = currentIndex * 2 + 1;
      rightIndex = currentIndex * 2 + 2;
    }
    return root;
  }

  size() {
    return this.queue.length;
  }
}

//해당 값을 업데이트 하는 방식으로 진행한다.
//그리고 내가 갔던 곳은 다시 가면 안된다. 근데 왔던 곳에 대해서 다른 큐는 갈 수 있다.
//이렇게 하면 DFS랑 다를게 뭐야?
//하나씩 증가하면서 간다는 것..?

//씨발.. priority Queue로 뽑아야한다. 가장 최단거리만을 acc로 넣어주면서 해야하니까..

function getDirection(before, current) {
  const [y, x] = before;
  const [ny, nx] = current;

  if (y !== ny) {
    return y > ny ? "T" : "B";
  } else {
    return x > nx ? "L" : "R";
  }
}

function solution(board) {
  //bfs로 수행하는데, bfs로 최단거리 찾는게 왜 생각이 안날까...? 매우 곤란하네.
  //큐로 넣어서 관리.
  const queue = new PriorityQueue();
  const visited = Array(board.length)
    .fill()
    .map(() => Array(board.length).fill(false));

  visited[0][0] = true;
  if (board[0][1] !== 1) {
    queue.enqueue(-100, { coordinate: [0, 1], direction: "R", cost: 100, path: [[0, 1]] });
    visited[0][1] = true;
  }

  if (board[1][0] !== 1) {
    queue.enqueue(-100, { coordinate: [1, 0], direction: "B", cost: 100, path: [[1, 0]] });
    visited[1][0] = true;
  }

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, 1, -1];
  let min = Infinity;
  const n = board.length;

  while (queue.size() > 0) {
    const { priority, value } = queue.dequeue();

    const { coordinate, direction, cost, path } = value;

    if (coordinate[0] === n - 1 && coordinate[1] === n - 1) {
      min = Math.min(min, cost);
      console.log(path);
      continue;
    }

    for (let i = 0; i < 4; i++) {
      const ny = coordinate[0] + dy[i];
      const nx = coordinate[1] + dx[i];
      if (ny < 0 || nx < 0 || nx >= n || ny >= n) continue;
      if (visited[ny][nx]) continue;
      if (board[ny][nx] === 1) continue;

      const nDirection = getDirection(coordinate, [ny, nx]);
      visited[ny][nx] = true;
      if (nDirection !== direction) {
        console.log(ny, nx);
      }
      queue.enqueue(direction === nDirection ? cost - 100 : cost - 100 - 500, {
        coordinate: [ny, nx],
        direction: nDirection,
        cost: direction === nDirection ? cost + 100 : cost + 100 + 500,
        path: [...path, [ny, nx]],
      });
    }
  }
  return min;
}
const board = [
  [0, 1, 1, 0],
  [0, 0, 0, 0],
  [0, 1, 0, 1],
  [1, 0, 0, 0],
];

const r = solution(board);
console.log(r);
