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

const getCanVisitNodes = (visited, edges) => {
  const canVisit = new Set();
  visited.forEach((v) => {
    const nodes = edges.filter((el) => el[0] === v);
    nodes.forEach(([start, end]) => {
      if (!visited.includes(end)) canVisit.add(end);
    });
  });
  return [...canVisit];
};

function solution(info, edges) {
  //d는 해당 노드에서 최대로 가질 수 있는 양의 수.
  //(부모 노드의 최대 양의 개수 + (양이라면 +1, 늑대라면 검증해서 결과 넣기.))
  //저장해놓은 테이블에 늑대의 개수도 들어가야만함. 들어가지 않는다면 개수를 알 수 없음.

  const d_sheep = Array(info.length).fill(0);
  const d_wolf = Array(info.length).fill(0);

  d_sheep[0] = 1;
  //d_sheep이 최댓값이라면, 해당되는 자식 노드를 넣어준다.
  const queue = new Queue();

  edges
    .filter((el) => el[0] === 0)
    .forEach(([start, end]) => {
      queue.enqueue({ before: 0, current: end, visited: [0] });
    });

  while (queue.size() > 0) {
    const { before, current, visited } = queue.dequeue();

    const compare_sheep_cnt = d_sheep[before] + (info[current] === 0 ? 1 : 0);
    const compare_wolf_cnt = d_wolf[before] + info[current];

    const sheep_cnt = compare_sheep_cnt > compare_wolf_cnt ? compare_sheep_cnt : 0;

    if (sheep_cnt > d_sheep[current]) {
      d_sheep[current] = sheep_cnt;
      d_wolf[current] = compare_wolf_cnt;
      const nodes = getCanVisitNodes(visited, edges);
      console.log(nodes);
      nodes.forEach((node) => {
        queue.enqueue({ before: current, current: node, visited: [...visited, node] });
      });
    }
  }
  console.log(d_sheep, d_wolf);
  //return d_sheep;
}

const info = [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1];
const edges = [
  [0, 1],
  [1, 2],
  [1, 4],
  [0, 8],
  [8, 7],
  [9, 10],
  [9, 11],
  [4, 3],
  [6, 5],
  [4, 6],
  [8, 9],
];
const r = solution(info, edges);
console.log(r);
