//다익스트라 알고리즘..
function getNode(coordinate, n) {
  const [y, x] = coordinate;
  return n * y + x;
}

function getCoordinate(node, n) {
  const y = Math.floor(node / n);
  const x = node % n;
  return [y, x];
}

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
  const n = board.length;
  const distance = Array(n * n).fill(Infinity);
  const visited = Array(n * n).fill(false);
  const direction = Array(n * n)
    .fill()
    .map((_) => new Set());
  direction[0].add("S");

  //T,B,R,L

  const dx = [0, 0, -1, 1];
  const dy = [1, -1, 0, 0];

  distance[0] = 0;

  function findMinium(distance, visited) {
    let min = Infinity;
    let minIndex = 0;

    for (let i = 0; i < n * n; i++) {
      if (!visited[i]) {
        min = Math.min(distance[i], min);
        if (min === distance[i]) minIndex = i;
      }
    }
    return minIndex;
  }

  while (!visited.every((v) => v)) {
    const node = findMinium(distance, visited);
    visited[node] = true;
    //갈 수 없으면 방문 처리 해줘야함.
    const [y, x] = getCoordinate(node, n);
    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];
      const next_node = getNode([ny, nx], n);
      if (ny < 0 || nx < 0 || nx >= n || ny >= n) continue;
      if (visited[next_node]) continue;
      if (board[ny][nx] === 1) {
        visited[next_node] = true;
        continue;
      }
      const nextDirection = getDirection([y, x], [ny, nx]);

      for (let d of direction[node]) {
        const cost = distance[node] + (d === nextDirection || d === "S" ? 100 : 100 + 500);
        distance[next_node] = Math.min(distance[next_node], cost);
        if (distance[next_node] === cost) {
          direction[next_node].add(nextDirection);
        }
      }
    }
  }
  return distance[n * n - 1];
}
const board = [
  [0, 0, 1, 0],
  [0, 0, 0, 0],
  [0, 1, 0, 1],
  [1, 0, 0, 0],
];

const r = solution(board);
console.log(r);
