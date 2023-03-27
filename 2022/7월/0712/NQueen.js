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

function check(board, p) {
  const n = board.length;
  const [y, x] = p;
  const queue = new Queue();
  const dx = [1, -1, 0, 0, 1, -1, -1, 1];
  const dy = [0, 0, -1, 1, 1, -1, 1, -1];

  for (let i = 0; i < 8; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (ny >= n || nx >= n || ny < 0 || nx < 0) continue;
    if (board[ny][nx] === 1) return false;

    queue.enqueue([
      [ny, nx],
      [dy[i], dx[i]],
    ]);
  }

  while (queue.size() > 0) {
    const [p, m] = queue.dequeue();
    const [y, x] = p;
    const ny = y + m[0];
    const nx = x + m[1];
    if (ny >= n || nx >= n || ny < 0 || nx < 0) continue;
    if (board[ny][nx] === 1) return false;

    queue.enqueue([[ny, nx], m]);
  }
  return true;
}

function solution(n) {
  const coordinate = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      coordinate.push([i, j]);
    }
  }

  let cnt = 0;

  //자신의 방향을 큐에 넣어주고, 큐는 그 방향대로만 진행한다.

  const combination = getCombination(coordinate, 4);

  for (let queens of combination) {
    //queens 좌표 평면에 삽입.
    const board = Array(n)
      .fill()
      .map(() => Array(n).fill(0));

    queens.forEach(([y, x]) => {
      board[y][x] = 1;
    });

    const isPossible = queens.every((p) => check(board, p));
    if (isPossible) {
      cnt++;
    }
  }
  return cnt;
}

function solution(n) {
  //같은 행은 무시할 수 있다. 왜냐면 퀸이 같은 행으로 갈 수 있으니까.
  //promising func, dfs func
  const result = [];
  function promising(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i === j) continue;
        if (arr[i] === arr[j]) return false;
        if (Math.abs((i - j) / (arr[i] - arr[j])) === 1) return false;
      }
    }
    return true;
  }

  function dfs(arr) {
    if (promising(arr)) {
      if (arr.length === n) {
        result.push(arr);
        return;
      }
      for (let i = 0; i < n; i++) {
        dfs([...arr, i]);
      }
    }
  }
  dfs([]);
  return result;
}
const r = solution(4);
console.log({ r });
