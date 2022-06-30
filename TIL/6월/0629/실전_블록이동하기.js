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
  const N = board.length;
  //움직일 수 있는 방향
  //상,하,좌,우, 왼쪽 피벗 -90도 90도, 오른쪽 피벗 -90도 90도

  //북, 동, 남, 서
  const ndx = [0, 1, 0, -1];
  const ndy = [-1, 0, 1, 0];

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  //가로일 때...
  //왼쪽 피벗, 90, 방향 1
  const rx1 = [0, -1];
  const ry1 = [1, 0];

  //왼쪽 피벗, -90, 방향 -1
  const rx2 = [0, -1];
  const ry2 = [-1, 0];

  //오른쪽 피벗 -90 방향 1
  const lx2 = [0, 1];
  const ly2 = [-1, 0];

  //오른쪽 피벗 90, 방향 -1
  const lx1 = [0, 1];
  const ly1 = [1, 0];

  const rotate = [
    [rx1, ry1],
    [rx2, ry2],
    [lx1, ly1],
    [lx2, ly2],
  ];

  //세로일 떄..
  //위쪽 피벗, 왼쪽으로 회전 1
  const tx1 = [-1, 0];
  const ty1 = [0, -1];

  //위쪽 피벗, 오른쪽으로 회전 -1
  const tx2 = [1, 0];
  const ty2 = [0, -1];

  //아래쪽 피벗, 오른쪽 회전 1
  const bx1 = [1, 0];
  const by1 = [0, 1];

  //아래쪽 피벗, 왼쪽 회전 -1
  const bx2 = [-1, 0];
  const by2 = [0, 1];

  const rotate2 = [
    [tx1, ty1],
    [tx2, ty2],
    [bx1, by1],
    [bx2, by2],
  ];
  //짝수면 -1, 홀수면 1
  //1까지는 opposite이 움직이고, 1 이상부터는 y,x가 움직이고

  //전부 움직여야 되는 경로를 나타내고, 짝수 위치만 큐에 삽입.
  const queue = new Queue();
  queue.enqueue([0, 0, 1, 0]);
  const visited = [];
  const route = Array(N)
    .fill()
    .map(() => Array(N).fill(Infinity));
  //y,x, direction
  while (queue.size() > 0) {
    const [y, x, direction, time] = queue.dequeue();

    //종료조건

    const oy = y + ndy[direction];
    const ox = x + ndx[direction];

    if ((y === N - 1 && x === N - 1) || (oy === N - 1 && ox === N - 1)) {
      console.log(route);
      return time;
    }

    //상, 하, 좌, 우 움직임.
    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];
      const noy = oy + dy[i];
      const nox = ox + dx[i];
      //console.log(ny, nx, noy, nox);

      if (ny < 0 || noy < 0 || nx < 0 || nox < 0 || ny >= N || nx >= N || noy >= N || nox >= N)
        continue;
      if (board[ny][nx] === 1 || board[noy][nox] === 1) continue;

      //visited 처리 해줘야함.
      const isVisited = visited.find((v) => v[0] === ny && v[1] === nx && v[2] === direction);
      if (isVisited) continue;

      visited.push([ny, nx, direction]);
      route[noy][nox] = Math.min(route[noy][nox], time + 1);
      route[ny][nx] = Math.min(route[ny][nx], time + 1);
      queue.enqueue([ny, nx, direction, time + 1]);
    }

    for (let i = 0; i < 4; i++) {
      const [rx, ry] = direction % 2 === 0 ? rotate2[i] : rotate[i];
      //지금 내가 만든 것은 x,y가 무조건 ox,oy보다 작아야한다가 기준. (down, right)

      //rx도 루프 돌고 ry도 루프 돌고.
      for (let j = 0; j < 2; j++) {
        let nx;
        let ny;
        if (i <= 1) {
          nx = x + rx[j];
          ny = y + ry[j];
        } else {
          nx = ox + rx[j];
          ny = oy + ry[j];
        }
        if (ny < 0 || nx < 0 || ny >= N || nx >= N) break;
        if (board[ny][nx] === 1) break;

        //0이면 4로 가야하는데,,
        //(4-direction) % 4

        if (j === 1) {
          const nDirection =
            i % 2 !== 0 ? (direction - 1 < 0 ? 3 : direction - 1) : (direction + 1) % 4;
          if (i <= 1) {
            //디렉션이 오른쪽이면 y,x 디렉션이 왼쪽이면 oy, ox, 세로일 때 디렉션이 바텀이면 y,x 디렉션이 탑이면 oy,ox
            const targetX = direction === 1 ? x : direction === 2 ? x : direction === 3 ? ox : ox;
            const targetY = direction === 1 ? y : direction === 2 ? y : direction === 3 ? oy : oy;
            const isVisited = visited.find(
              (v) => v[0] === targetY && v[1] === targetX && v[2] === nDirection
            );
            if (!isVisited) {
              visited.push([targetY, targetX, nDirection]);
              queue.enqueue([targetY, targetX, nDirection, time + 1]);
              route[targetY][targetX] = Math.min(route[targetY][targetX], time + 1);
            }
          } else {
            //디렉션이 왼쪽이면 y,x 디렉션이 top이면 y,x
            const targetX = direction === 3 ? x : direction === 0 ? x : direction === 1 ? ox : ox;
            const targetY = direction === 3 ? y : direction === 0 ? y : direction === 1 ? oy : oy;
            const isVisited = visited.find(
              (v) => v[0] === targetY && v[1] === targetX && v[2] === nDirection
            );
            if (!isVisited) {
              visited.push([targetY, targetX, nDirection]);
              queue.enqueue([targetY, targetX, nDirection, time + 1]);
              route[targetY][targetX] = Math.min(route[targetY][targetX], time + 1);
            }
          }
        }
      }
    }
  }
}
//세로 일 때.. 가로 세로 나눠서 연산 해줘야함..

const board = [
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1],
  [1, 1, 0, 0, 1],
  [0, 0, 0, 0, 0],
];

const r = solution(board);
console.log(r);
