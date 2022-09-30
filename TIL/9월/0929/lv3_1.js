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

function solution(board) {
  const len = board.length - 1;
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  const visited = Array(board.length)
    .fill()
    .map((_) => Array(board.length).fill(false));

  const isVisited = (p1, p2) => {
    const [p1_y, p1_x] = p1;
    const [p2_y, p2_x] = p2;
    if (visited[p1_y][p1_x] && visited[p2_y][p2_x]) return true;
    return false;
  };

  const isValidate = (p1, p2) => {
    const [p1_y, p1_x] = p1;
    const [p2_y, p2_x] = p2;

    const isInArea = (p) => {
      const [y, x] = p;
      if (y <= len && x <= len && y >= 0 && x >= 0) return true;
      else false;
    };

    if (isInArea(p1) && isInArea(p2)) {
      if (board[p1_y][p1_x] !== 1 && board[p2_y][p2_x] !== 1) return true;
    }
    return false;
  };

  const isHorizontal = (p1, p2) => {
    const [p1_y] = p1;
    const [p2_y] = p2;
    return p1_y === p2_y;
  };

  const sortPositions = (p1, p2) => {
    const [p1_y, p1_x] = p1;
    const [p2_y, p2_x] = p2;
    if (isHorizontal(p1, p2)) {
      if (p1_x > p2_x) return [p1, p2];
      else return [p2, p1];
    } else {
      if (p1_y > p2_y) return [p2, p1];
      else return [p1, p2];
    }
  };

  //sort 배열 앞쪽에 있는 것을 먼저 수행.
  const h_dx = [
    [0, 1],
    [0, 1],
    [0, -1],
    [0, -1],
  ];
  const h_dy = [
    [1, 0],
    [-1, 0],
    [1, 0],
    [-1, 0],
  ];

  const v_dx = [
    [1, 0],
    [-1, 0],
    [1, 0],
    [-1, 0],
  ];
  const v_dy = [
    [0, 1],
    [0, 1],
    [0, -1],
    [0, -1],
  ];

  const queue = new Queue();
  queue.enqueue({ p1: [0, 0], p2: [0, 1], cnt: 0 });

  while (true) {
    const { p1, p2, cnt } = queue.dequeue();

    const [p1_y, p1_x] = p1;
    const [p2_y, p2_x] = p2;
    if ((p1_y === len && p1_x === len) || (p2_y === len && p2_x === len)) return cnt;

    for (let i = 0; i < 4; i++) {
      const np1_y = p1_y + dy[i];
      const np2_y = p2_y + dy[i];
      const np1_x = p1_x + dx[i];
      const np2_x = p2_x + dx[i];

      if (isValidate([np1_y, np1_x], [np2_y, np2_x])) {
        if (!isVisited([np1_y, np1_x], [np2_y, np2_x])) {
          queue.enqueue({ p1: [np1_y, np1_x], p2: [np2_y, np2_x], cnt: cnt + 1 });
          visited[np1_y][np1_x] = true;
          visited[np2_y][np2_x] = true;
        }
      }
    }

    const [sp1, sp2] = sortPositions(p1, p2);

    const rdy = isHorizontal(sp1, sp2) ? h_dy : v_dy;
    const rdx = isHorizontal(sp1, sp2) ? h_dx : v_dx;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 2; j++) {
        if (i <= 1) {
          const n_sp1_y = sp1[0] + rdy[i][j];
          const n_sp1_x = sp1[1] + rdx[i][j];
          if (isValidate([n_sp1_y, n_sp1_x], sp2)) {
            if (!isVisited([n_sp1_y, n_sp1_x], sp2)) {
              queue.enqueue({ p1: [n_sp1_y, n_sp1_x], p2: sp2, cnt: cnt + 1 });
              visited[n_sp1_y][n_sp1_x] = true;
              visited[sp2[0]][sp2[1]] = true;
            }
          }
        } else {
          const n_sp2_y = sp2[0] + rdy[i][j];
          const n_sp2_x = sp2[1] + rdy[i][j];
          if (isValidate(sp1, [n_sp2_y, n_sp2_x])) {
            if (!isVisited(sp1, [n_sp2_y, n_sp2_x])) {
              visited[sp1[0]][sp1[1]] = true;
              visited[n_sp2_y][n_sp2_x] = true;
              queue.enqueue({ p1: sp1, p2: [n_sp2_y, n_sp2_x], cnt: cnt + 1 });
            }
          }
        }
      }
    }
  }
}

const board = [
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1],
  [1, 1, 0, 0, 1],
  [0, 0, 0, 0, 0],
];
const r = solution(board);
console.log(r);
