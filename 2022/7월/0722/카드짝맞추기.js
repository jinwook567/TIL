function getPermutation(arr, n) {
  const result = [];
  if (n === 1) return arr.map((el) => [el]);

  arr.forEach((v, i) => {
    const rest = arr.filter((_, index) => index !== i);
    const permutation = getPermutation(rest, n - 1);
    const attached = permutation.map((el) => [v, ...el]);
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

function command_move(position, board, direction) {
  const n = board.length;
  const [y, x] = position;

  if (direction === "R") {
    for (let i = x + 1; i < n; i++) {
      if (board[y][i] !== 0 || i === n - 1) return [y, i];
    }
  } else if (direction === "L") {
    for (let i = x - 1; i >= 0; i--) {
      if (board[y][i] !== 0 || i === 0) return [y, i];
    }
  } else if (direction === "T") {
    for (let i = y - 1; i >= 0; i--) {
      if (board[i][x] !== 0 || i === 0) return [i, x];
    }
  } else {
    for (let i = y + 1; i < n; i++) {
      if (board[i][x] !== 0 || i === n - 1) return [i, x];
    }
  }

  return [y, x];
}

function bfs(position, board, target) {
  const queue = new Queue();
  const dy = [0, 0, -1, 1];
  const dx = [1, -1, 0, 0];
  const moves = ["R", "T", "B", "L"];
  const n = board.length;
  queue.enqueue({ position, cnt: 0 });
  let min = Infinity;
  let end = position;

  while (queue.size() > 0) {
    const { position, cnt } = queue.dequeue();
    const [y, x] = position;
    if (board[y][x] === target) {
      min = Math.min(min, cnt);
      end = position;
      break;
    }

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];
      if (nx >= n || ny >= n || nx < 0 || ny < 0) continue;
      queue.enqueue({ position: [ny, nx], cnt: cnt + 1 });
    }

    for (let direction of moves) {
      const [ny, nx] = command_move(position, board, direction);
      if (ny === y && nx === x) continue;
      queue.enqueue({ position: [ny, nx], cnt: cnt + 1 });
    }
  }
  return { count: min, end };
}

function solution(board, r, c) {
  const n = board.length;
  let set = new Set();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] !== 0) set.add(board[i][j]);
    }
  }

  set = [...set];
  const permutation = getPermutation(set, set.length);
  //이 순서대로 찾을 것임.
  let answer = Infinity;

  permutation.forEach((permu) => {
    const copyBoard = JSON.parse(JSON.stringify(board));
    let cnt = 0;
    let current = [r, c];
    //빈 지점에서 옮기는 로직.

    permu.forEach((number) => {
      const { end, count } = bfs(current, copyBoard, number);

      //press enter
      cnt += 1;

      cnt += count;
      current = end;
      copyBoard[current[0]][current[1]] = 0;

      const { end: secondEnd, count: secondCount } = bfs(current, copyBoard, number);

      //press enter
      cnt += 1;

      current = secondEnd;
      cnt += secondCount;
      copyBoard[current[0]][current[1]] = 0;
    });
    answer = Math.min(answer, cnt);
  });
  return answer;
}

const board = [
  [0, 0, 0, 0],
  [2, 0, 0, 0],
  [0, 0, 1, 2],
  [0, 0, 1, 0],
];

const [g, c] = [1, 0];
const r = solution(board, g, c);
console.log({ r });
