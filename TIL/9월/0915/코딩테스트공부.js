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

function solution(alp, cop, problems) {
  let answer = Infinity;

  problems.push([0, 0, 1, 0, 1]);
  problems.push([0, 0, 0, 1, 1]);

  const t_alp = Math.max(...problems.map((v) => v[0]));
  const t_cop = Math.max(...problems.map((v) => v[1]));

  //이미 갔던 곳이기 떄문에 갈 필요가 없다고..
  const d = Array(151)
    .fill()
    .map((_) => Array(151).fill(Infinity));

  const queue = new Queue();
  queue.enqueue({ alp, cop, cost: 0 });

  while (queue.size() > 0) {
    const { alp, cop, cost } = queue.dequeue();
    if (alp >= t_alp && cop >= t_cop) {
      answer = Math.min(answer, cost);
      continue;
    }

    if (cost >= d[alp][cop]) continue;
    d[alp][cop] = cost;

    if (cost > answer) continue;

    problems.forEach(([alp_req, cop_req, alp_rwd, cop_rwd, p_cost]) => {
      if (alp >= alp_req && cop >= cop_req) {
        if (alp >= t_alp && cop_rwd === 0) return;
        if (cop >= t_cop && alp_rwd === 0) return;
        queue.enqueue({
          alp: alp + alp_rwd > t_alp ? t_alp : alp + alp_rwd,
          cop: cop + cop_rwd > t_cop ? t_cop : cop + cop_rwd,
          cost: cost + p_cost,
        });
      }
    });
  }

  return answer;
}

const alp = 10;
const cop = 10;
const problems = [
  [10, 15, 2, 1, 2],
  [20, 20, 3, 3, 4],
];
const r = solution(alp, cop, problems);
console.log(r);
