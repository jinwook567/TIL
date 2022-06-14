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

  length() {
    return this.rear - this.front;
  }
}

function solution(board) {
  //bfs문제이고, queue에는 start, count..
  //visited는 전체로 가지고 있음. visited를 했으면 최소가 아니니까..
  //양 팔이 전부 visited면 가본 것임.
  //회전 하는거 어떻게 구현할지 생각.
  //2개의 축 모두 좌, 우로 회전해봐야함.
  //로봇의 포지션이 가로일 때, 세로일 때 나눠서 하는 수밖에 없음.
  //가로의 경우는 좌, 우로 움직이고 회전.
  //세로의 경우에는 상, 하로 움직이고 회전.
  return bfs(board);
}

function isHorizontal(arr) {
  const [h, w] = arr[0];
  const [nh, nw] = arr[1];
  return h === nh;
}

//돌리는 것은 내 옆 좌표, 반대편 옆 좌표 확인하는 방식.

function bfs(board) {
  const N = board.length;
  const visited = Array(N)
    .fill()
    .map(() => Array(N).fill(false));

  const queue = new Queue();
  queue.enqueue({
    p: [
      [0, 0],
      [0, 1],
    ],
    c: 0,
  });
  console.log(queue);

  //h,w
  const dH_1 = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [0, 0],
    [0, 0],
    [-1, 1], //[-1, 0]
    [1, 1], // [1, 0]
  ];
  const dH_2 = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, -1], //[1, 0]
    [-1, -1], //[-1, 0]
    [0, 0],
    [0, 0],
  ];

  const dV_1 = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, -1], //[0, -1]
    [1, 1], //[0, 1]
    [0, 0],
    [0, 0],
  ];
  const dV_2 = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [0, 0],
    [0, 0],
    [-1, -1], //[0, -1]
    [-1, 1], //[0, 1]
  ];

  //dH -> 0번째 요소와 일치, dV -> 1번째 요소와 일치

  while (queue.length() !== 0) {
    const { p, c } = queue.dequeue();
    const [[h, w], [nh, nw]] = p;

    if ((h === N - 1 && w === N - 1) || (nh === N - 1 && nw === N - 1)) {
      return c;
    }
    // if (visited[h][w] && visited[nh][nw]) continue;

    visited[h][w] = true;
    visited[nh][nw] = true;

    const d1 = isHorizontal(p) ? dH_1 : dV_1;
    const d2 = isHorizontal(p) ? dH_2 : dV_2;

    //여섯번 루프 돌아야함.
    for (let i = 0; i < 8; i++) {
      //   if (h === 0 && nh === 1 && w === 2 && nw === 2) {
      //     console.log("hi");
      //   }
      //큰게 뒤로 들어가야하는데.. 거기서 꼬인건가?
      const n1 = [h + d1[i][0], w + d1[i][1]];
      const n2 = [nh + d2[i][0], nw + d2[i][1]];

      if (n1[0] < 0 || n1[1] < 0 || n1[0] >= N || n1[1] >= N) continue;
      if (n2[0] < 0 || n2[1] < 0 || n2[0] >= N || n2[1] >= N) continue;
      if (board[n1[0]][n1[1]] === 1 || board[n2[0]][n2[1]] === 1) continue;
      if (visited[n1[0]][n1[1]] && visited[n2[0]][n2[1]]) continue;

      if (i >= 4) {
        const c1 = isHorizontal(p) ? [d1[i][0], 0] : [0, d1[i][1]];
        const c2 = isHorizontal(p) ? [d2[i][0], 0] : [0, d2[i][1]];

        const nc1 = [h + c1[0], w + c1[1]];
        const nc2 = [nh + c2[0], nw + c2[1]];

        if (board[nc1[0]][nc1[1]] === 1 || board[nc2[0]][nc2[1]] === 1) continue;

        //회전이 불가능하다면, continue;
        //회전할 수 있는지 체크 해줘야함.
      }

      if (isHorizontal([n1, n2])) {
        n1[1] - n2[1] > 0
          ? queue.enqueue({ p: [n2, n1], c: c + 1 })
          : queue.enqueue({ p: [n1, n2], c: c + 1 });
      } else {
        n1[0] - n2[0] > 0
          ? queue.enqueue({ p: [n2, n1], c: c + 1 })
          : queue.enqueue({ p: [n1, n2], c: c + 1 });
      }
    }
  }
}

const r = solution([
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1],
  [1, 1, 0, 0, 1],
  [0, 0, 0, 0, 0],
]);

console.log(r);
